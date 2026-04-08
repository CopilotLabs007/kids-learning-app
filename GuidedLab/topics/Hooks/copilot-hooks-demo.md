# Agent Hooks in VS Code (Preview)

> **Official Docs:** https://code.visualstudio.com/docs/copilot/customization/hooks  
> **Status:** Preview — configuration format may change in future releases

---

## 🪝 What is a "Hook"? — The Real-World Analogy

Before diving into Copilot, let's understand what a **hook** means in the real world.

### 🎣 Real-World Hook — A Fish Hook

```
          User casts line
               │
               ▼
    ════════════════════════════  ← river (flow of events)
               │
           🪝 HOOK                ← waits at a specific point
               │
         catches fish             ← captures the event when it passes
```

A fish hook:
- Sits at a **specific location** in the river
- **Waits** for the right moment
- **Catches** what passes through
- Can **change the outcome** once something is caught

> 💡 A hook is something that sits at a specific point in a flow, waits for an event, and then intercepts it.

---

### Option A: Airport Security

```
  Passengers            Gate / Flight
  arriving  ──────────► departs
       │
     ┌──────┴──────────┐
     │  SECURITY CHECK  │  ← Hook
     │  (TSA / X-Ray)   │
     └──────────────────┘
       │
    ┌───────┴────────┐
    ▼                ▼
      ✅ Clear         🛑 Blocked
     (board plane)    (confiscated)
```

This analogy helps explain hooks as **checkpoints in a workflow**:
- Every action must pass through a **defined checkpoint**
- The checkpoint can **allow**, **block**, or **require extra review**
- It enforces policy consistently, not based on memory or suggestion

> 💡 In Copilot, hooks work like security checkpoints in the agent workflow: actions pass through them, and the hook decides whether they proceed.

---

### ⚙️ Copilot Agent Hook — Same Idea, Digital World

Now apply the same concept to a Copilot agent session:

```
    User types prompt
          │
          ▼
    ┌─────────────┐
    │  🤖 Copilot  │  — agent does its work (edits files, runs commands)
    │   Agent     │
    └──────┬──────┘
           │  (flow of agent actions)
           │
    ════════════════════════════════════════  ← stream of tool calls
           │               │              │
        🪝 Hook 1       🪝 Hook 2      🪝 Hook 3
     (before edit)    (after edit)   (session end)
           │               │              │
     blocks bad        runs linter    logs audit
      commands         auto-fix         trail
```

> A **Copilot Hook** is a script YOU define that intercepts specific agent actions at fixed lifecycle points — giving you guaranteed, deterministic control over what the agent does.

---

### 🔑 The Core Difference

| | Instructions / Prompts | **Hooks** |
|---|---|---|
| Like | A sticky note asking the agent to "please format files" | A gate that **forces** formatting to happen |
| Outcome | The AI *tries* to follow — probabilistic | Your script **always** runs — deterministic |
| Layer | AI prompt context | Tool execution layer (code) |

```
  Without Hooks                    With Hooks
  ────────────                     ──────────
  
  User ──► Agent ──► Edit File     User ──► Agent ──► 🪝 PreToolUse Hook
                       ↓                                    ↓  (check: safe?)
                  (done, maybe                     Edit File
                   missed lint)                         ↓
                                               🪝 PostToolUse Hook
                                                    ↓  (run ESLint, tests)
                                               ✅ Done with quality gates
```

---

Hooks enable you to execute **custom shell commands at key lifecycle points** during agent sessions. Unlike instructions or custom prompts that guide AI behavior, hooks execute your code with **guaranteed, deterministic outcomes**.

---

## Why Use Hooks?

| Challenge Without Hooks | What Hooks Solve |
|---|---|
| Agent edits bypass linters/formatters | `PostToolUse` hook auto-runs Prettier/ESLint after every file edit |
| Dangerous commands like `rm -rf` can execute | `PreToolUse` hook blocks destructive operations before they run |
| No record of what AI changed | `PostToolUse` hook logs every invocation for audit/compliance |
| Agent lacks project-specific runtime context | `SessionStart` hook injects environment details (branch, Node version, etc.) |
| Every tool call requires manual approval | `PreToolUse` hook auto-approves safe ops, blocks sensitive ones |

---

## Hook Lifecycle Events

VS Code supports **8 hook events** that fire at specific points during an agent session.

The full explanation, beginner-friendly diagrams, and event reference have been moved to [hook-lifecycle-events.md](/Users/pvreddy/JohnDeere-Labs/kids-learning-app/GuidedLab/topics/Hooks/hook-lifecycle-events.md).

Use that file when you want to explain:
- what a lifecycle event means
- when each hook event fires
- how the full agent session flows from start to stop

---

## Hook File Location

### 📁 Where VS Code Looks for Hook Files

```
your-project/
├── .github/
│   └── hooks/
│       ├── quality-gates.json    ← 🪝 Workspace hooks (highest priority)
│       └── audit.json            ← 🪝 Loaded automatically
├── .claude/
│   └── settings.json             ← 🪝 Claude Code compatibility
├── app.js
├── package.json
└── views/
```

VS Code searches for hook config files in these locations (default):

```
.github/hooks/*.json          ← Workspace-level hooks (recommended)
.claude/settings.json         ← Claude Code compatibility
~/.copilot/hooks              ← User-level hooks
```

> Workspace hooks take precedence over user hooks for the same event type.

---

## Configuration Format

Create `.github/hooks/your-hook.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/validate-tool.sh",
        "timeout": 15
      }
    ],
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
      }
    ]
  }
}
```

### Hook Command Properties

| Property | Type | Description |
|---|---|---|
| `type` | string | Must be `"command"` |
| `command` | string | Default command (cross-platform) |
| `windows` | string | Windows-specific override |
| `linux` | string | Linux-specific override |
| `osx` | string | macOS-specific override |
| `cwd` | string | Working directory (relative to repo root) |
| `env` | object | Additional environment variables |
| `timeout` | number | Timeout in seconds (default: 30) |

---

## Real-World Demo — kids-learning-app

### 🎯 Scenario

Copilot agent adds a new `/animals` route to `app.js`. 

```
  WITHOUT Hooks                        WITH Hooks
  ─────────────                        ──────────

  👤 "Add /animals route"              👤 "Add /animals route"
         │                                    │
         ▼                                    ▼
  🤖 Agent edits app.js                🪝 SessionStart
         │                              │  → inject branch/node context
         ▼                              ▼
  💾 File saved                        🪝 PreToolUse
         │                              │  → check: is this edit safe?
         ▼                              │  → ALLOW ✅
  ❌ No lint check                      ▼
  ❌ No test run                   🤖 Agent edits app.js
  ❌ No security scan                   │
  ❌ No audit trail                     ▼
                                   🪝 PostToolUse
                                   │  → run ESLint --fix ✨
                                   │  → run npm test 🧪
                                   │  → log to audit.log 📋
                                   ▼
                                   ✅ High-quality, validated edit
```

### Step 1 — Create the hook file

**`.github/hooks/quality-gates.json`**

```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "node -e \"console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: 'kids-learning-app | Branch: ' + require('child_process').execSync('git rev-parse --abbrev-ref HEAD').toString().trim() + ' | Node: ' + process.version } }))\"" 
      }
    ],
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx eslint --fix \"$TOOL_INPUT_FILE_PATH\" 2>/dev/null || true",
        "osx": "npx eslint --fix \"$TOOL_INPUT_FILE_PATH\" 2>/dev/null || true",
        "windows": "npx eslint --fix \"%TOOL_INPUT_FILE_PATH%\" 2>nul",
        "timeout": 30
      }
    ],
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/block-dangerous-commands.sh"
      }
    ]
  }
}
```

### Step 2 — Block dangerous terminal commands

**`scripts/block-dangerous-commands.sh`**

```bash
#!/bin/bash
# Read tool input from stdin
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Block destructive commands
if echo "$COMMAND" | grep -qE '(rm\s+-rf|DROP\s+TABLE|DELETE\s+FROM|format\s+c:)'; then
  echo '{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": "Destructive command blocked by security policy"}}'
  exit 0
fi

# Allow everything else
echo '{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "allow"}}'
```

```bash
chmod +x scripts/block-dangerous-commands.sh
```

### Step 3 — Audit log on session end

**`.github/hooks/audit.json`**

```json
{
  "hooks": {
    "Stop": [
      {
        "type": "command",
        "command": "echo \"[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Session ended: $SESSION_ID\" >> .github/hooks/audit.log"
      }
    ]
  }
}
```

---

## Hook Input / Output

### 🔄 How Hook Communication Works

```
         VS Code Agent
              │
              │  (tool is about to run)
              │
              ▼
   ┌──────────────────────┐
   │   🪝 Your Hook Script │
   │                      │
   │  stdin ──► receives  │  ← JSON from VS Code
   │            JSON data │
   │                      │
   │  processes it...     │
   │                      │
   │  stdout ──► returns  │  → JSON decision back to VS Code
   │             JSON     │
   └──────────────────────┘
              │
              ▼
         VS Code acts on the
         hook's decision
         (allow / deny / warn)
```

### Input (received via stdin)

Every hook receives a JSON object:

```json
{
  "timestamp": "2026-04-08T10:30:00.000Z",
  "cwd": "/path/to/workspace",
  "sessionId": "session-identifier",
  "hookEventName": "PreToolUse",
  "transcript_path": "/path/to/transcript.json",
  "tool_name": "editFiles",
  "tool_input": { "files": ["src/main.js"] }
}
```

### Output (returned via stdout)

```json
{
  "continue": true,
  "stopReason": "Security policy violation",
  "systemMessage": "Warning: lint errors detected"
}
```

### Exit Codes

```
  Hook script exits with:

  ┌─────────────────────────────────────────────────────┐
  │  Exit 0  → ✅ Success     parse stdout as JSON       │
  │  Exit 2  → 🛑 BLOCK       stop the tool, tell model  │
  │  Exit 1  → ⚠️  Warning    show warning, continue     │
  └─────────────────────────────────────────────────────┘
```

| Code | Meaning |
|---|---|
| `0` | Success — parse stdout as JSON |
| `2` | **Blocking error** — stop processing, show error to model |
| Other | Non-blocking warning — show to user, continue processing |

---

## PreToolUse — Detailed

Fires **before** the agent invokes any tool. Most powerful hook for control.

### 🚦 PreToolUse is Like a Traffic Light for Agent Tools

```
  Agent wants to run a tool
           │
           ▼
   ┌───────────────────┐
   │  🪝 PreToolUse    │
   │     Hook          │
   └────────┬──────────┘
            │
     ┌──────┴──────┐
     │   evaluate  │
     └──────┬──────┘
            │
    ┌───────┼────────┐
    ▼       ▼        ▼
  "allow"  "ask"   "deny"
    │        │        │
    ▼        ▼        ▼
  ✅ Run   ⏸️ Ask   🛑 Block
  tool     user     tool
```

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Production files are read-only",
    "updatedInput": { "files": ["src/safe.ts"] },
    "additionalContext": "User has read-only access to production files"
  }
}
```

**`permissionDecision` values:** `"allow"` | `"deny"` | `"ask"`  
**Priority:** `deny` > `ask` > `allow` (most restrictive wins when multiple hooks run)

---

## PostToolUse — Detailed

Fires **after** a tool completes. Use for formatting, testing, logging.

### 🏭 PostToolUse is Like a Quality Control Station on an Assembly Line

```
  Raw Part           Finished Part
  enters  ─────────► leaves
                │
         ┌──────┴───────┐
         │  🔍 Quality   │
         │   Control    │  ← PostToolUse Hook
         │  (QC Station)│
         └──────┬───────┘
                │
        ┌───────┴───────┐
        ▼               ▼
    ✅ Pass          ❌ Fail
    (continue)     (send back /
                    block agent)
```

Applied to Copilot:

```
  Agent edits app.js ──► 🪝 PostToolUse Hook
                              │
                         runs ESLint
                              │
                    ┌─────────┴──────────┐
                    ▼                    ▼
              No errors ✅          Errors found ❌
              continue              tell agent to fix
```

```json
{
  "decision": "block",
  "reason": "Lint errors found — please fix before continuing",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "ESLint found 3 errors in the edited file"
  }
}
```

---

## Agent-Scoped Hooks (Preview)

Define hooks directly in a custom agent's `.agent.md` frontmatter. These hooks **only run when that agent is active**.

```markdown
---
name: "Strict Formatter"
description: "Agent that auto-formats code after every edit"
hooks:
  PostToolUse:
    - type: command
      command: "./scripts/format-changed-files.sh"
---

You are a code editing agent. After making changes, files are automatically formatted.
```

> Enable with setting: `chat.useCustomAgentHooks: true`

---

## Configure Hooks via UI

Three ways to open the hook configurator:

1. Type `/hooks` in the chat input → press Enter
2. `⇧⌘P` → **Chat: Configure Hooks**
3. Chat view ⚙️ icon → **Hooks**

### Generate a Hook with AI

Type `/create-hook` in chat and describe what you want:
> `/create-hook run ESLint after every file edit`

The agent asks clarifying questions and generates the hook config file.

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Hook not executing | Verify file is in `.github/hooks/` with `.json` extension; check `"type": "command"` |
| Permission denied | Run `chmod +x script.sh` on hook scripts |
| Timeout errors | Increase `"timeout"` value or optimize the script (default: 30s) |
| JSON parse errors | Ensure stdout is valid JSON; use `jq` to construct output |

**View hook output:** Output panel → **GitHub Copilot Chat Hooks** channel

---

## Security Considerations

> ⚠️ Hooks execute shell commands with the **same permissions as VS Code**. Review carefully before enabling hooks from untrusted sources.

- Review all hook scripts before enabling them in shared repositories
- Never hardcode secrets — use environment variables or secure credential storage
- Validate and sanitize all agent input to prevent injection attacks
- Use `chat.tools.edits.autoApprove` to prevent the agent from editing hook scripts during a run

---

## Key Differences from Instructions/Prompts

### 🧠 Instructions = Asking Nicely vs 🪝 Hooks = Enforcing Rules

```
   INSTRUCTIONS / PROMPTS              HOOKS
   ──────────────────────────          ──────────────────────────

   👤 "Please always run ESLint        🪝 PostToolUse hook runs
       after editing files"                ESLint automatically

   🤖 "Sure! I'll try to..."           💻 ESLint ALWAYS runs
       (might forget, might skip,          (no exceptions,
        might interpret differently)        no AI interpretation)

   📝 Lives in .instructions.md        📁 Lives in .github/hooks/*.json
   🎲 Probabilistic outcome            ✅ Deterministic outcome
   🗣️ Guides AI behavior               ⚙️ Executes your code
```

| | Instructions / Prompts | **Hooks** |
|---|---|---|
| **Layer** | AI prompt context | Tool execution layer (code) |
| **Outcome** | Probabilistic (AI interprets) | Deterministic (code always runs) |
| **Use case** | Guide AI behavior | Enforce, automate, audit |
| **Example** | "Always use ESLint" | Runs ESLint after every edit, guaranteed |
| **Override** | AI can ignore/forget | Cannot be bypassed |

---

## 🗺️ Complete Picture — All 8 Hooks in kids-learning-app

```
kids-learning-app/
       │
       │   👤 User: "Add a shapes quiz to the app"
       │
       ▼
🪝 SessionStart
   └── injects: "Node v20 | Branch: main | App: kids-learning-app"
       │
       ▼
🪝 UserPromptSubmit
   └── logs the request to audit trail
       │
       ▼
       [Agent reads views/shapes.ejs]
       │
       ▼
🪝 PreToolUse (readFile)
   └── ALLOW ✅ — reading is always safe
       │
       ▼
       [Agent edits app.js — adds /shapes route]
       │
       ▼
🪝 PreToolUse (editFiles)
   └── checks: is it a config/sensitive file? → ALLOW ✅
       │
       ▼
       [File saved]
       │
       ▼
🪝 PostToolUse (editFiles)
   └── runs ESLint --fix on app.js ✨
   └── logs: "app.js edited at 10:30:00Z"
       │
       ▼
       [Agent runs: npm test]
       │
       ▼
🪝 PreToolUse (runInTerminal)
   └── checks: is npm test safe? → ALLOW ✅
   └── checks: is rm -rf safe?  → DENY 🛑
       │
       ▼
       [Tests pass ✅]
       │
       ▼
🪝 Stop
   └── writes to audit.log: "Session complete, 2 files changed"
   └── sends OS notification: "Task finished!"
       │
       ▼
   ✅ High-quality shapes quiz added — automatically validated
```

---

## Related Resources

- [Custom Agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
- [Agent Tools](https://code.visualstudio.com/docs/copilot/agents/agent-tools)
- [Subagents](https://code.visualstudio.com/docs/copilot/agents/subagents)
- [Security Considerations](https://code.visualstudio.com/docs/copilot/security)
- [Official Hooks Docs](https://code.visualstudio.com/docs/copilot/customization/hooks)
