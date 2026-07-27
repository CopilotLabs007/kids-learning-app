# Copilot Hooks: Simple Demo

## What Is a Hook?

A Copilot hook is a script that runs automatically at a specific point in an agent session. It lets a team apply checks consistently instead of relying on the agent to remember every project rule.

For example, a hook can run ESLint after Copilot edits a JavaScript file.

## Demo Goal

In this workspace, the hook at `.github/hooks/run-eslint-after-edit.js` checks JavaScript and TypeScript files after an edit. If ESLint finds a problem, it returns the result to Copilot so the issue can be fixed before the task is complete.

## How the Demo Flows

```text
You ask Copilot to update app.js
            |
            v
Copilot edits the file
            |
            v
PostToolUse hook runs automatically
            |
            v
The hook calls: npx eslint app.js
            |
            +--> No issues: Copilot receives a passed message
            |
            +--> Issues found: Copilot receives the ESLint output
```

## The Important Configuration

Hooks are configured in a JSON file under `.github/hooks/`. A simplified `PostToolUse` configuration looks like this:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "node .github/hooks/run-eslint-after-edit.js"
      }
    ]
  }
}
```

`PostToolUse` means the script runs after a Copilot tool finishes. The script receives details about the tool call, identifies edited lintable files, and invokes ESLint only for those files.

## Try It

1. Ask Copilot to make a small change in `app.js` or `public/js/main.js`.
2. Let Copilot apply the edit.
3. Review the hook result in the chat output.
4. If ESLint reports an issue, ask Copilot to correct it and apply the fix.

## Why It Matters

Instructions tell an agent what a team expects. Hooks enforce an automated check at a known point in the workflow. Together, they make routine quality checks repeatable for every agent edit.

For the complete lifecycle event reference, see [hook-lifecycle-events.md](hook-lifecycle-events.md). For a deeper walkthrough, see [copilot-hooks-demo.md](copilot-hooks-demo.md).