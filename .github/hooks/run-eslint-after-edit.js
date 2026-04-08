#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const EDIT_TOOL_NAMES = new Set([
  'editFiles',
  'create_file',
  'replace_string_in_file',
  'apply_patch',
  'insert_edit_into_file'
]);

const LINTABLE_EXTENSIONS = new Set(['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx']);

function readPayload() {
  const raw = fs.readFileSync(0, 'utf8').trim();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function toAbsolutePath(workspaceCwd, candidatePath) {
  if (!candidatePath || typeof candidatePath !== 'string') {
    return null;
  }

  return path.isAbsolute(candidatePath)
    ? candidatePath
    : path.join(workspaceCwd || process.cwd(), candidatePath);
}

function collectPaths(toolInput, workspaceCwd) {
  const candidates = new Set();

  if (!toolInput || typeof toolInput !== 'object') {
    return [];
  }

  const maybeAdd = (value) => {
    const absolutePath = toAbsolutePath(workspaceCwd, value);
    if (absolutePath) {
      candidates.add(absolutePath);
    }
  };

  maybeAdd(toolInput.filePath);
  maybeAdd(toolInput.targetFile);
  maybeAdd(toolInput.path);

  if (Array.isArray(toolInput.files)) {
    for (const entry of toolInput.files) {
      if (typeof entry === 'string') {
        maybeAdd(entry);
        continue;
      }

      if (entry && typeof entry === 'object') {
        maybeAdd(entry.filePath);
        maybeAdd(entry.path);
        maybeAdd(entry.targetFile);
      }
    }
  }

  return [...candidates];
}

function buildResponse(systemMessage, additionalContext) {
  const response = { continue: true };

  if (systemMessage) {
    response.systemMessage = systemMessage;
  }

  if (additionalContext) {
    response.hookSpecificOutput = {
      hookEventName: 'PostToolUse',
      additionalContext
    };
  }

  return response;
}

function main() {
  const payload = readPayload();
  const workspaceCwd = payload.cwd || process.cwd();

  if (!EDIT_TOOL_NAMES.has(payload.tool_name)) {
    process.stdout.write(JSON.stringify(buildResponse()));
    return;
  }

  const editedFiles = collectPaths(payload.tool_input, workspaceCwd).filter((filePath) =>
    LINTABLE_EXTENSIONS.has(path.extname(filePath).toLowerCase())
  );

  if (editedFiles.length === 0) {
    process.stdout.write(JSON.stringify(buildResponse()));
    return;
  }

  const eslintExecutable = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const eslintResult = spawnSync(eslintExecutable, ['eslint', ...editedFiles], {
    cwd: workspaceCwd,
    encoding: 'utf8'
  });

  if (eslintResult.error) {
    process.stdout.write(
      JSON.stringify(
        buildResponse(
          'ESLint hook skipped: ESLint or npx is not available in this workspace.',
          eslintResult.error.message
        )
      )
    );
    return;
  }

  if (eslintResult.status === 0) {
    process.stdout.write(
      JSON.stringify(buildResponse(`ESLint passed for ${editedFiles.length} edited file(s).`))
    );
    return;
  }

  const lintOutput = [eslintResult.stdout, eslintResult.stderr].filter(Boolean).join('\n').trim();
  process.stdout.write(
    JSON.stringify(
      buildResponse(
        'ESLint found issues in the edited files.',
        lintOutput || 'ESLint exited with a non-zero status code.'
      )
    )
  );
}

main();