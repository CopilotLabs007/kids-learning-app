# Hook Lifecycle Events in VS Code

> **Official Docs:** https://code.visualstudio.com/docs/copilot/customization/hooks#_hook-lifecycle-events  
> **Related File:** `copilot-hooks-demo.md`

## What is a Lifecycle Event?

A **lifecycle event** is simply a **named moment in the life of an agent session**.

Think of an agent session like a journey:
- it **starts**
- the user **submits a prompt**
- the agent **uses tools**
- the agent may **spawn subagents**
- the session eventually **ends**

Each important moment in that journey is a **lifecycle event**.

> 💡 A hook does not run randomly. It runs only when the agent reaches one of these predefined lifecycle events.

## Simple View: Agent Session Timeline

```
Session starts
  │
  ▼
[SessionStart]
  │
  ▼
User sends prompt
  │
  ▼
[UserPromptSubmit]
  │
  ▼
Agent is about to use a tool
  │
  ▼
[PreToolUse]
  │
  ▼
Tool completes
  │
  ▼
[PostToolUse]
  │
  ▼
Session ends
  │
  ▼
[Stop]
```

## Another Way to Think About It

```
Agent session = a movie

Important scenes in the movie:
- opening scene          → SessionStart
- user gives instruction → UserPromptSubmit
- before action scene    → PreToolUse
- after action scene     → PostToolUse
- final scene            → Stop
```

So when we say:

> "Hooks run at lifecycle events"

we mean:

> "Hooks run at specific, predefined stages of the agent session."

## Visual: The Full Agent Lifecycle with Hook Points

```
╔══════════════════════════════════════════════════════════════════════╗
║                    COPILOT AGENT SESSION                             ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║   👤 User opens chat                                                 ║
║          │                                                           ║
║          ▼                                                           ║
║   🪝 ── SessionStart ──────────────────────────────────────────────  ║
║          │  (inject project context, validate env, log start)       ║
║          ▼                                                           ║
║   👤 User types: "Add a new /animals route to app.js"               ║
║          │                                                           ║
║          ▼                                                           ║
║   🪝 ── UserPromptSubmit ──────────────────────────────────────────  ║
║          │  (audit the request, inject system context)              ║
║          ▼                                                           ║
║   🤖 Agent plans: edit app.js, run npm test...                       ║
║          │                                                           ║
║          ▼                                                           ║
║   🪝 ── PreToolUse ────────────────────────────────────────────────  ║
║          │  (before EACH tool call → block? allow? ask?)            ║
║          ▼                                                           ║
║   🔧 Tool Runs (editFiles / runInTerminal / readFile)               ║
║          │                                                           ║
║          ▼                                                           ║
║   🪝 ── PostToolUse ───────────────────────────────────────────────  ║
║          │  (after EACH tool → run linter, log, trigger tests)      ║
║          ▼                                                           ║
║   [if context gets too large → compaction happens]                  ║
║          │                                                           ║
║          ▼                                                           ║
║   🪝 ── PreCompact ────────────────────────────────────────────────  ║
║          │  (save important state before context is trimmed)        ║
║          ▼                                                           ║
║   [if a subagent is spawned → Plan agent, Research agent, etc.]     ║
║          │                                                           ║
║          ▼                                                           ║
║   🪝 ── SubagentStart ─────────────────────────────────────────────  ║
║   🪝 ── SubagentStop ──────────────────────────────────────────────  ║
║          │                                                           ║
║          ▼                                                           ║
║   ✅ Agent finishes task                                             ║
║          │                                                           ║
║          ▼                                                           ║
║   🪝 ── Stop ──────────────────────────────────────────────────────  ║
║          │  (generate report, send notification, cleanup)           ║
║          ▼                                                           ║
║   Session ends                                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

## Hook Events — Quick Reference

| Event | When It Fires | Common Uses |
|---|---|---|
| `SessionStart` | User submits the first prompt of a new session | Initialize resources, validate project state |
| `UserPromptSubmit` | User submits a prompt | Audit requests, inject system context |
| `PreToolUse` | **Before** agent invokes any tool | Block dangerous operations, require approval, modify input |
| `PostToolUse` | **After** tool completes successfully | Run formatters, log results, trigger follow-up actions |
| `PreCompact` | Before conversation context is compacted | Export important context, save state |
| `SubagentStart` | Subagent is spawned | Track nested agent usage |
| `SubagentStop` | Subagent completes | Aggregate results, cleanup |
| `Stop` | Agent session ends | Generate reports, send notifications, cleanup |