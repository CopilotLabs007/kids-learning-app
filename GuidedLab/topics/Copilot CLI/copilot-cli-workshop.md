# GitHub Copilot CLI Workshop

## Goal

This workshop is a guided demo for junior engineers who are new to GitHub Copilot CLI.

By the end of the session, participants should be able to:

- Install and authenticate GitHub Copilot CLI
- Start an interactive Copilot session in the terminal
- Use the most important slash commands confidently
- Understand when to use ask mode, plan mode, autopilot, and cloud delegation
- Use Copilot CLI with local files, Git workflows, and GitHub-native MCP capabilities
- Run safe programmatic prompts from the command line

## Suggested Duration

- 10 min: setup and sign-in
- 10 min: first prompts and basic commands
- 15 min: plan mode, sessions, and context management
- 10 min: agents, skills, MCP, and delegation
- 10 min: programmatic mode, permissions, and Q&A

## Audience Assumptions

- VS Code is installed
- Terminal basics are familiar
- GitHub Copilot access is enabled for the user or organization
- Git is installed
- Participants are working inside a trusted repository directory

## Important Note About Installation

GitHub Copilot CLI has evolved quickly. Older content may still reference `@github/copilot-cli`.

For this workshop, use the newer install commands from GitHub's current documentation and feature page:

```bash
brew install copilot-cli
```

Or:

```bash
npm install -g @github/copilot
```

Then verify:

```bash
copilot --version
```

## Part 1: Setup and Authentication

### Install the CLI

Choose one installation path.

#### Option A: Homebrew

```bash
brew install copilot-cli
```

#### Option B: npm

```bash
npm install -g @github/copilot
```

### Authenticate

```bash
copilot auth login
```

This opens a browser so you can sign in and authorize the CLI.

### Verify the CLI is available

```bash
copilot --version
copilot -h
```

## Part 2: Start the Interactive Session

Launch Copilot CLI from the repository root:

```bash
copilot
```

Use this moment to explain that Copilot CLI has two broad styles of use:

- Interactive mode: persistent conversation in the terminal
- Programmatic mode: one prompt, one result, then exit

### First commands to show

Inside the interactive session, run:

```text
/help
/usage
/context
/session
```

### Talk track

- `/help` shows the current command surface, which changes over time as the product evolves
- `/usage` helps users understand consumption and activity
- `/context` shows how much of the context window is currently being used
- `/session` shows information about the running session

## Part 3: Your First Useful Prompts

Start with simple, low-risk prompts in the current repository.

### Prompt 1: Repo onboarding

```text
Tell me about the layout of this project and identify the most important folders for a new contributor.
```

### Prompt 2: Focus on one area

```text
Explain how the views and public folders work together in this repository.
```

### Prompt 3: Attach file context

```text
@README.md summarize this file for a junior engineer.
```

You can also reference files directly in prompts.

Example:

```text
@GuidedLab/topics/copilot-cli.md rewrite this into a shorter beginner-friendly quick start.
```

### Teaching point

Copilot CLI works better when the prompt includes:

- the scope
- the desired output
- constraints
- the target audience

## Part 4: Models

Show how to switch models during the session.

```text
/model
```

### Demo script

1. Open the model picker with `/model`
2. Choose a faster day-to-day model for routine work
3. Explain that larger models are useful for deep reasoning, architecture, or difficult debugging

### Talking points

- Model choice changes speed, reasoning depth, and premium request cost
- Teams can compare outputs from different models on the same task
- If configured, custom model providers can also appear in the list

## Part 5: Plan Mode and Ask Mode

This is one of the most important parts of the workshop.

Explain that Copilot CLI can either:

- answer or act directly in normal mode
- create a structured plan before writing code

### Switch modes

Press `Shift+Tab` to toggle modes in the interactive interface.

You can also invoke plan mode directly:

```text
/plan Add a guided quiz page for fruits that follows the same structure as the existing topic pages.
```

### What to point out

- Copilot may ask clarifying questions
- It creates a structured plan before implementation
- This is better for multi-file work, refactors, and new features
- It reduces bad assumptions before code is written

### Follow-up prompt

```text
Review the plan and tighten it for a junior-friendly implementation with minimal file changes.
```

### Good explanation for juniors

Use ask mode for quick questions and small fixes.

Use plan mode for:

- new features
- multi-file changes
- uncertain requirements
- refactors with several touchpoints

## Part 6: Session Management and Infinite Sessions

Copilot CLI supports long-running sessions and automatic compaction.

Show these commands:

```text
/session
/session plan
/session files
/session checkpoints
/context
/compact
/new
/resume
```

### What to explain

- `/session plan` shows the current plan if one exists
- `/session files` shows temporary artifacts created during the session
- `/session checkpoints` shows compaction checkpoints
- `/compact` manually compresses context when needed
- `/new` starts a clean session for unrelated work
- `/resume` returns to previous work without losing momentum

### Good demo line

```text
/resume
```

Then explain that this is useful when a task spans hours or days.

## Part 7: Agents, Skills, and Instructions

This section helps juniors understand why Copilot behaves differently across repositories.

### Show the agent menu

```text
/agent
```

### Show skills if available

```text
/skills
```

### Explain the layering

- Repository instructions guide behavior for this codebase
- Agents specialize Copilot for certain kinds of work
- Skills package reusable instructions, tools, and patterns

### Demo prompt

```text
Explain which repository instructions or skills are likely affecting how you respond in this project.
```

## Part 8: MCP and GitHub-Native Workflows

GitHub Copilot CLI can use MCP servers, including GitHub-native workflows.

### Discover configured MCP servers

```text
/mcp
```

### Add an MCP server

```text
/mcp add
```

### Demo ideas

If GitHub MCP is configured:

```text
Use the GitHub MCP server to list my open pull requests.
```

```text
Use the GitHub MCP server to find good first issues for a junior team member.
```

```text
Use the GitHub MCP server to summarize the latest failed workflow run in this repository.
```

### Key message

MCP turns Copilot CLI from a local coding assistant into a broader agent that can work across systems and services.

## Part 9: Fleet, Autopilot, and Delegation

This is the section that usually gets the most attention in a live demo.

### Parallelize with fleet

```text
/fleet Compare two possible implementation approaches for improving the workshop docs and recommend the safer one.
```

Explain that `/fleet` can break work into parallel subtasks or compare approaches across multiple subagents.

### Delegate cloud work

```text
/delegate Update the README with a short section about Copilot CLI usage in this repository.
```

### Review differences

```text
/diff
```

### Open work in the IDE

```text
/ide
```

### Talk track

- `/fleet` is useful when a task can be decomposed
- autopilot is useful when you want the CLI to carry a task further without constant step-by-step input
- `/delegate` is useful for asynchronous or longer-running cloud work
- `/diff` helps users review what changed before accepting the result
- `/ide` helps move from terminal flow into editor flow

## Part 10: Programmatic Mode

Now show the non-interactive mode.

### Simple example

```bash
copilot -p "Summarize the purpose of this repository in 5 bullet points"
```

### Safe tool allow example

```bash
copilot -p "Show me the last 5 commits and summarize them" --allow-tool='shell(git)'
```

### Example with write access and caution

```bash
copilot -p "Draft a beginner-friendly README update for this repository" --allow-tool='write'
```

### Important safety explanation

Avoid teaching juniors to start with `--allow-all-tools`.

Instead, explain these in order:

- `--allow-tool='shell(git)'`
- `--allow-tool='write'`
- `--deny-tool='shell(rm)'`
- `--deny-tool='shell(git push)'`

### Good security example

```bash
copilot --allow-all-tools --deny-tool='shell(rm)' --deny-tool='shell(git push)'
```

Use this only as an explanation of policy controls, not as a default workshop command.

## Part 11: Permissions and Trusted Directories

This part matters because Copilot CLI can read files, write files, and run shell commands.

### Explain clearly

- Start Copilot CLI only from directories you trust
- Review suggested commands carefully
- Be careful with long-running sessions that gain broad tool approvals
- Use allowlists and deny rules when automating tasks
- Never treat AI tool execution as risk-free just because it feels conversational

### Demo prompt

```text
Before making any changes, explain what tools you would need and why.
```

That prompt teaches responsible usage and makes the tool chain visible to new users.

## Part 12: Quality-of-Life Commands

Show these quickly near the end:

```text
/changelog
/experimental show
/feedback
/clear
/reset-allowed-tools
```

### Why they matter

- `/changelog` helps you stay current as the CLI evolves
- `/experimental show` surfaces preview capabilities
- `/feedback` is the direct path for bugs and feature ideas
- `/clear` is useful when the current conversation is no longer relevant
- `/reset-allowed-tools` removes session-level approvals you no longer want to keep

## Part 13: Suggested Live Demo Flow

Use this exact sequence if you want a reliable 45 to 60 minute session.

### Demo flow

1. Install and verify the CLI
2. Run `copilot auth login`
3. Start `copilot`
4. Show `/help`, `/context`, `/session`
5. Ask a repo onboarding question
6. Reference a file with `@README.md`
7. Show `/model`
8. Run one `/plan` prompt
9. Show `/session plan` and `/resume`
10. Show `/agent` and `/skills`
11. Show `/mcp` and one GitHub MCP prompt
12. Show `/fleet`
13. Explain `/delegate`, `/diff`, and `/ide`
14. Exit interactive mode and run one `copilot -p` example
15. Close with permission and trusted-directory guidance

## Part 14: Ready-to-Use Demo Prompts

### Beginner prompts

```text
Tell me what this repository does and which files I should read first.
```

```text
Explain this codebase like I joined the team today.
```

```text
Find the main entry point of this application and explain how requests move through it.
```

### Planning prompts

```text
/plan Add a new learning topic page for fruits using the same conventions as the existing pages.
```

```text
/plan Improve the workshop markdown files so juniors can follow them without trainer support.
```

### Git and review prompts

```text
Summarize the last 10 commits and point out anything that a reviewer should inspect closely.
```

```text
Review the uncommitted changes in this repo and call out bugs, risk, and missing tests.
```

### MCP prompts

```text
Use the GitHub MCP server to list issues assigned to me.
```

```text
Use the GitHub MCP server to find good first issues in this repository.
```

### Documentation prompts

```text
Rewrite this markdown file so a junior engineer can run the demo without asking for help.
```

```text
Turn the current notes into a 60-minute workshop agenda with steps, prompts, and expected outcomes.
```

## Part 15: Common Questions to Expect from Juniors

### What is the difference between Copilot in VS Code and Copilot CLI?

VS Code is best when you want rich editor context, inline edits, debugging, and visual diffing.

Copilot CLI is best when you want:

- terminal-native workflows
- Git-heavy tasks
- automation-friendly prompts
- fast repo exploration
- shell-based iteration

### When should I use plan mode?

Use it for larger tasks where you want Copilot to clarify scope before writing code.

### Is it safe to let Copilot run tools automatically?

Only with care. Prefer scoped permissions and trusted directories.

### Can it work with GitHub issues and pull requests?

Yes. That is one of the strongest parts of Copilot CLI, especially when MCP and delegation are configured.

## Part 16: Troubleshooting

- If `copilot` is not found, re-open the terminal or check the install path
- If auth fails, sign out and retry `copilot auth login`
- If slash commands do not match the workshop, run `/help` because the command set changes over time
- If MCP tools are missing, verify the server is configured and available
- If the CLI asks for trust confirmation, do not skip the explanation of trusted directories
- If model choices differ, explain that availability depends on plan and organization policy

## Part 17: Trainer Tips

- Keep the first 10 minutes low risk and high confidence
- Show one real prompt that reads the current repo before attempting any write task
- Narrate why a prompt is good, not just what it does
- When Copilot asks for permission, pause and explain the choice
- Prefer one strong end-to-end example over many shallow examples
- Use `/help` live instead of memorizing every slash command

## Quick Reference

```text
copilot
copilot --version
copilot auth login
copilot -h
copilot help commands
copilot -p "Summarize this repository"

/help
/usage
/context
/session
/session plan
/session files
/session checkpoints
/compact
/new
/resume
/model
/plan
/agent
/skills
/mcp
/mcp add
/fleet
/delegate
/diff
/ide
/changelog
/experimental show
/feedback
/clear
/reset-allowed-tools
```

## Workshop Close

Participants are successful if they can:

- launch Copilot CLI from a trusted repository
- ask a useful question about the codebase
- switch or inspect models
- create a plan for a non-trivial task
- understand how sessions and context work
- explain the difference between agents, skills, MCP, and delegation
- run at least one programmatic prompt safely

## Further Reading

- Feature page: https://github.com/features/copilot/cli
- GitHub Docs: About Copilot CLI
- GitHub Docs: Copilot CLI best practices
- GitHub Docs: Copilot CLI command reference