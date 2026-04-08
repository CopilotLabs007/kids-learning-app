# MCP Server with Jira Atlassian — Hands-On Workshop

**Duration:** 90 minutes | **Format:** Instructor-led, hands-on | **Last Updated:** April 8, 2026

---

## Agenda (90 min)

```
 0:00  Phase 1 — What is MCP + Setup ............  15 min
 0:15  Phase 2 — Jira: Create, Read, Update .....  20 min
 0:35  Phase 3 — Jira: Search, Transition, Link .  20 min
 0:55  Phase 4 — Confluence: Pages & Search .....  15 min
 1:10  Phase 5 — End-to-End Workflow ............  15 min
 1:25  Wrap-up & Q&A ............................   5 min
```

---

## Pre-Workshop Setup (Complete Before the Session)

### Participant Checklist

| # | Requirement | Done? |
|---|---|---|
| 1 | VS Code 1.99+ with **GitHub Copilot** extension (active subscription) | ☐ |
| 2 | Node.js 18+ installed (`node --version` to verify) | ☐ |
| 3 | Atlassian Cloud account ([free signup](https://www.atlassian.com/try/cloud/signup)) | ☐ |
| 4 | A Jira project created (we use key `MCPW` in examples — substitute yours) | ☐ |
| 5 | API token generated: [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens) | ☐ |
| 6 | `.vscode/mcp.json` created in workspace (see below) | ☐ |

### MCP Server Configuration

Create `.vscode/mcp.json` in your workspace root **before** the session:

```json
{
  "servers": {
    "atlassian": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-atlassian"],
      "env": {
        "ATLASSIAN_SITE_URL": "https://YOUR-SITE.atlassian.net",
        "ATLASSIAN_USER_EMAIL": "your.email@example.com",
        "ATLASSIAN_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

> Replace the three `env` values. Never commit tokens to source control.

### Facilitator Pre-Setup

- [ ] Create Jira project `MCPW` with 8–10 sample issues (see [Appendix A](#appendix-a--sample-issues-to-pre-create))
- [ ] Create Confluence space `MCPW`
- [ ] Dry-run all 5 phases end-to-end
- [ ] Have a known-good `mcp.json` file ready to share as fallback

---

## Phase 1 — What is MCP + Setup (15 min)

### What is MCP?

**Model Context Protocol** is an open standard that lets AI assistants call external tools via a unified protocol. With the Atlassian MCP server, Copilot can interact with Jira and Confluence directly.

```
 You (natural language)  →  Copilot  →  MCP Server  →  Atlassian REST API
                         ←           ←              ←  (Jira / Confluence)
```

**30+ tools** are exposed across three categories:

| Category | Tools (key ones) |
|---|---|
| **Jira** | `createJiraIssue`, `getJiraIssue`, `editJiraIssue`, `searchJiraIssuesUsingJql`, `transitionJiraIssue`, `addCommentToJiraIssue`, `addWorklogToJiraIssue`, `createIssueLink` |
| **Confluence** | `createConfluencePage`, `updateConfluencePage`, `getConfluencePage`, `searchConfluenceUsingCql`, `createConfluenceFooterComment` |
| **Cross-Product** | `searchAtlassian` (Rovo), `atlassianUserInfo`, `fetchAtlassian` |

### Verify Connection

Open Copilot Chat (`Ctrl+Shift+I`) — run each prompt. **All must pass before proceeding.**

#### 🧪 1.1 — Check identity
```
What is my Atlassian user info?
```
✅ Returns your display name, email, account ID

#### 🧪 1.2 — List projects
```
List all my visible Jira projects
```
✅ Returns at least one project

#### 🧪 1.3 — List spaces
```
Show me all Confluence spaces I can access
```
✅ Returns at least one space

> **Stuck?** Check Output panel → MCP for errors. Verify `mcp.json` env values. Re-generate API token if needed.

### ✅ Checkpoint — Do NOT proceed until all 3 verifications pass.

---

## Phase 2 — Jira: Create, Read, Update (20 min)

> Goal: Master the Jira CRUD loop — create issues, inspect them, modify them, comment.

### Create Issues

#### 🧪 2.1 — Create a task
```
Create a Jira task in project MCPW with summary "Set up development environment"
and description "Install Node.js, VS Code, and required extensions."
```
**Tool**: `atl_createJiraIssue` — Record the key: ___________

#### 🧪 2.2 — Create a bug with priority
```
Create a bug in MCPW with summary "Login page returns 500 error"
with description "Server error on valid credentials." Set priority to High.
```
Record the key: ___________

#### 🧪 2.3 — Create a story with acceptance criteria
```
Create a user story in MCPW with summary "As a user, I want to reset my password via email"
and description "AC: 1) Forgot Password link on login 2) Reset email sent 3) Link expires in 24h 4) User sets new password"
```
Record the key: ___________

### Read & Update

#### 🧪 2.4 — Get issue details
```
Get the details of issue MCPW-1
```
**Tool**: `atl_getJiraIssue`

#### 🧪 2.5 — Update fields
```
Update MCPW-1: change summary to "Set up dev environment and tooling" and set priority to Medium
```
**Tool**: `atl_editJiraIssue`

### Comment & Log Work

#### 🧪 2.6 — Add a comment
```
Add a comment to MCPW-2: "Root cause: null email values bypass validation. Fix in PR #42."
```
**Tool**: `atl_addCommentToJiraIssue`

#### 🧪 2.7 — Log work
```
Log 1 hour on MCPW-1 with comment "Initial setup complete"
```
**Tool**: `atl_addWorklogToJiraIssue` — Time formats: `30m`, `1h`, `1d` (8h), `1w` (5d)

### ✅ Checkpoint

- [ ] Created 3 issues (task, bug, story)
- [ ] Retrieved and updated issue fields
- [ ] Added a comment and logged work

---

## Phase 3 — Jira: Search, Transition, Link (20 min)

> Goal: Find issues with JQL, move them through workflow states, and link related issues.

### Search with JQL

Copilot translates your natural language into JQL automatically. Observe the generated JQL.

#### 🧪 3.1 — Find open issues
```
Find all open issues in project MCPW
```
**Generated JQL**: `project = MCPW AND status != Done`

#### 🧪 3.2 — Filter by type and priority
```
Show me all bugs in MCPW with High or Critical priority
```
**Generated JQL**: `project = MCPW AND issuetype = Bug AND priority in (High, Critical)`

#### 🧪 3.3 — My issues
```
Show me all issues assigned to me in MCPW
```
**Generated JQL**: `project = MCPW AND assignee = currentUser()`

#### 🧪 3.4 — Text search
```
Search for issues in MCPW containing "login"
```
**Generated JQL**: `project = MCPW AND text ~ "login"`

### Workflow Transitions

#### 🧪 3.5 — Check transitions and move
```
What transitions are available for MCPW-1? Then move it to "In Progress"
```
**Tools**: `atl_getTransitionsForJiraIssue` → `atl_transitionJiraIssue`

#### 🧪 3.6 — Transition + comment (multi-tool chain)
```
Move MCPW-2 to "In Progress" and add comment "Starting investigation"
```
> Copilot chains `atl_transitionJiraIssue` + `atl_addCommentToJiraIssue`

### Issue Links

#### 🧪 3.7 — Create a blocking link
```
Create a link: MCPW-1 blocks MCPW-3
```
**Tool**: `atl_createIssueLink`

#### 🧪 3.8 — Triage workflow (multi-step)
```
Find all unassigned bugs in MCPW, pick the highest priority one,
assign it to me, move it to "In Progress", and comment "Triaged"
```
> Observe Copilot chaining: search → edit → transition → comment

### ✅ Checkpoint

- [ ] Ran at least 3 JQL searches
- [ ] Transitioned an issue through 2 states
- [ ] Created an issue link
- [ ] Executed a multi-step prompt

---

## Phase 4 — Confluence: Pages & Search (15 min)

> Goal: Create and search Confluence documentation through Copilot.

### Create Pages

#### 🧪 4.1 — Create a page
```
Create a Confluence page in space MCPW titled "Sprint Planning Notes"
with body: "## Sprint Goal\nDeliver authentication module\n\n## Team\n- Alice\n- Bob\n- Carol\n\n## Decisions\n(to be filled)"
```
**Tool**: `atl_createConfluencePage`

#### 🧪 4.2 — Create a child page
```
Create a page titled "Sprint 1 Retrospective" as a child of "Sprint Planning Notes" in space MCPW
with body: "## What went well\n- Fast setup\n\n## What to improve\n- Test coverage"
```

### Update & Comment

#### 🧪 4.3 — Update page content
```
Update "Sprint Planning Notes" in MCPW — add a section:
"## Action Items\n- Alice: API contracts by Wednesday\n- Bob: DB schema review"
```
**Tool**: `atl_updateConfluencePage`

#### 🧪 4.4 — Add a comment
```
Add a footer comment to "Sprint Planning Notes": "Plan approved by team."
```
**Tool**: `atl_createConfluenceFooterComment`

### Search

#### 🧪 4.5 — Search Confluence
```
Search Confluence for pages about "sprint" in space MCPW
```
**Tool**: `atl_searchConfluenceUsingCql` — **Generated CQL**: `space.key = MCPW AND text ~ "sprint"`

### ✅ Checkpoint

- [ ] Created 2 pages (parent + child)
- [ ] Updated page content and added a comment
- [ ] Searched Confluence with CQL

---

## Phase 5 — End-to-End Workflow (15 min)

> Goal: Chain Jira + Confluence in a single realistic scenario. **This is the grand finale.**

### Scenario: Bug Lifecycle — Discovery to Closure

Run each step sequentially. Replace `[BUG-KEY]` with the actual key from Step 1.

#### Step 1 — Report
```
Create a Critical bug in MCPW:
Summary: "Payment fails for international currencies"
Description: "500 errors for EUR/GBP/JPY payments. USD works. Started after v2.3 deploy."
```
Record key: ___________

#### Step 2 — Investigate
```
Add comment to [BUG-KEY]:
"Root cause: migration script filters exchange rates to USD only.
Fix: restore rates + patch migration. ETA: 2 hours."
```

#### Step 3 — Start work
```
Move [BUG-KEY] to "In Progress" and log 30m with comment "Investigation complete"
```

#### Step 4 — Document (cross-product)
```
Create a Confluence page in MCPW titled "Postmortem: Payment Failure"
with: "## Incident\n- Date: 2026-04-08\n- Severity: Critical\n- Impact: Intl payments\n\n## Root Cause\nMigration script filtered to USD only.\n\n## Fix\nRestored rates, patched script, added validation.\n\n## Actions\n- Add pre-deploy data checks\n- Add row-count monitoring alert"
```

#### Step 5 — Close
```
Comment on [BUG-KEY]: "Fix deployed. Postmortem in Confluence." Then move it to "Done" and log 2h.
```

> **Debrief**: You just ran 5 steps across 8+ MCP tool calls — bug report, investigation, status change, documentation, closure — without leaving VS Code.

### Bonus (if time permits): Standup Prep
```
Prepare my standup from MCPW: what's In Progress for me, what did I close in the last 24h, any blockers? Format as Yesterday / Today / Blockers.
```

### ✅ Checkpoint

- [ ] Completed the full bug lifecycle (5 steps)
- [ ] Combined Jira + Confluence in a single workflow

---

## Wrap-Up (5 min)

### What You Learned

| Phase | Skill |
|---|---|
| 1 | MCP concepts + server setup |
| 2 | Jira CRUD: create, read, update, comment, worklog |
| 3 | JQL search, transitions, issue links, multi-step prompts |
| 4 | Confluence pages, comments, CQL search |
| 5 | End-to-end cross-product workflow |

### Key Takeaway

> The power of MCP is **chaining multiple tools** into workflows. A single prompt can orchestrate search → triage → update → document across Jira and Confluence — replacing minutes of context-switching.

---

## Appendix A — Sample Issues to Pre-Create

Facilitator: create these in `MCPW` before the session so search exercises return results.

| # | Type | Summary | Priority | Status |
|---|---|---|---|---|
| 1 | Bug | Login page returns 500 error | High | To Do |
| 2 | Bug | Dashboard charts not loading | Medium | To Do |
| 3 | Story | User profile page redesign | Medium | To Do |
| 4 | Task | Update API documentation | Low | In Progress |
| 5 | Story | Password reset via email | High | To Do |
| 6 | Bug | Session timeout too short | Critical | To Do |
| 7 | Task | Set up CI/CD pipeline | Medium | Done |
| 8 | Story | Two-factor authentication | High | To Do |

---

## Appendix B — Tool Quick Reference

### Jira

| Prompt Pattern | Tool |
|---|---|
| "Create a [type] in [project]..." | `atl_createJiraIssue` |
| "Get details of [KEY]" | `atl_getJiraIssue` |
| "Update [KEY]..." | `atl_editJiraIssue` |
| "Comment on [KEY]" | `atl_addCommentToJiraIssue` |
| "Log [time] on [KEY]" | `atl_addWorklogToJiraIssue` |
| "Find issues where..." | `atl_searchJiraIssuesUsingJql` |
| "Move [KEY] to [status]" | `atl_transitionJiraIssue` |
| "Link [A] blocks [B]" | `atl_createIssueLink` |
| "List my projects" | `atl_getVisibleJiraProjects` |
| "Look up user [name]" | `atl_lookupJiraAccountId` |

### Confluence

| Prompt Pattern | Tool |
|---|---|
| "Create page in [space]..." | `atl_createConfluencePage` |
| "Update page [title]..." | `atl_updateConfluencePage` |
| "Get page [title]" | `atl_getConfluencePage` |
| "Comment on page [title]" | `atl_createConfluenceFooterComment` |
| "Search Confluence for..." | `atl_searchConfluenceUsingCql` |
| "List spaces" | `atl_getConfluenceSpaces` |

### Cross-Product

| Prompt Pattern | Tool |
|---|---|
| "Search Atlassian for..." | `atl_searchAtlassian` |
| "My Atlassian user info" | `atl_atlassianUserInfo` |

---

## Appendix C — JQL & CQL Cheat Sheet

### JQL

```sql
project = MCPW AND status != Done                         -- open issues
project = MCPW AND issuetype = Bug ORDER BY priority DESC  -- bugs by priority
project = MCPW AND assignee = currentUser()                -- my issues
project = MCPW AND assignee = EMPTY                        -- unassigned
project = MCPW AND created >= -7d                          -- last 7 days
project = MCPW AND text ~ "login"                          -- text search
priority in (High, Critical) AND resolution = Unresolved   -- urgent unresolved
```

**Operators**: `=`, `!=`, `in`, `not in`, `~` (contains), `is EMPTY`, `>=`, `<=`, `CHANGED`

### CQL

```sql
text ~ "keyword"                                 -- text search
space.key = MCPW AND text ~ "sprint"             -- space-scoped
title ~ "API"                                    -- title search
lastModified >= now("-7d")                        -- recently modified
```

### Worklog Time Formats

`30m` | `1h` | `1h 30m` | `1d` (8h) | `1w` (5d)

---

## Appendix D — Troubleshooting

| Problem | Fix |
|---|---|
| Server not starting | `node --version` (need 18+). Check Output → MCP for errors. |
| 401 Unauthorized | Verify email + re-generate API token. No extra whitespace. |
| 403 Forbidden | Check project/space permissions. |
| Wrong site URL | Must be `https://SITE.atlassian.net` — no trailing slash. |
| Copilot ignores MCP tools | Prefix with "Using Jira MCP tools...". Verify Agent mode. Restart chat. |
| JQL returns nothing | Simplify to `project = MCPW`. Verify issues exist. |
| Confluence update fails | Version conflict — retry (MCP fetches latest). |
| Slow responses | Atlassian rate limiting — wait 30s. Narrow filters. |
