# GitHub MCP in VS Code: 60-Minute Guided Workshop

## Goal

By the end of this exercise, participants will:

- Install and start the GitHub MCP server in VS Code
- Verify that GitHub MCP tools are available in Copilot Chat Agent mode
- Connect those tools to a public or private repository they already have access to
- Use prompt-driven flows to inspect repos, issues, pull requests, and workflows

## Audience Assumptions

- VS Code is already installed
- GitHub Copilot is licensed and signed in
- Participants already have access to at least one GitHub repository
- If using Copilot Business or Enterprise, the org policy for MCP must be enabled

## Timebox

- 0-10 min: Install and start the server
- 10-20 min: Verify connection and discover tools
- 20-45 min: Run guided prompts in Agent mode
- 45-60 min: Try one read flow and one write flow on a repo

## Part 1: Install GitHub MCP Server

### Preferred path: install from the MCP gallery

1. Open VS Code.
2. Open Extensions using `Shift+Command+X`.
3. In the search box, type `@mcp github`.
4. Open the official GitHub MCP Server result.
5. Select **Install**.
6. When VS Code asks whether you trust the server, approve it.

### Verify the server is registered

1. Open Command Palette using `Shift+Command+P`.
2. Run `MCP: List Servers`.
3. Confirm that `github` appears and shows as available or running.

## Part 2: Manual Setup Fallback

Use this only if you want to configure the server directly in the workspace.

1. Open Command Palette.
2. Run `MCP: Open Workspace Folder Configuration`.
3. In `.vscode/mcp.json`, add this configuration:

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

4. Save the file.
5. Start the server from the inline `Start` action in the editor, or run `MCP: List Servers` and start it from there.

This path uses GitHub-hosted remote MCP with OAuth in supported VS Code builds.

## Part 3: Open Agent Mode and Inspect Tools

1. Open Copilot Chat.
2. Change the chat mode to **Agent**.
3. In the chat input, select the tools icon.
4. Confirm the GitHub MCP server is listed.
5. Optionally disable unrelated tools so the model focuses on GitHub actions only.

### Quick verification prompt

Paste this into Agent mode:

```text
List the GitHub MCP tools currently available in this VS Code session and group them by repository, issues, pull requests, actions, and code search capabilities.
```

Expected result: Copilot should inspect the connected GitHub MCP server and summarize the available tool groups.

## Part 4: Connect Your Work to a Repository

Use a repository participants can already access.

### Discovery prompt

```text
Using GitHub MCP tools, inspect the repository <owner>/<repo> and give me a short overview of its default branch, top-level purpose, open pull requests, and the next 3 areas worth exploring.
```

### Repo structure prompt

```text
Using GitHub MCP tools, show me the important folders and files in <owner>/<repo> and explain where application code, tests, workflow files, and documentation live.
```

### Recent activity prompt

```text
Using GitHub MCP tools, summarize the last 10 commits on the default branch of <owner>/<repo> and highlight any risky or high-churn areas.
```

## Part 5: Guided Tool Exercises

Run these in order.

### Exercise A: Repository discovery

```text
Use GitHub MCP tools to list the main branches in <owner>/<repo>, identify the default branch, and summarize what changed most recently.
```

### Exercise B: Issues triage

```text
Use GitHub MCP tools to list the highest priority open issues in <owner>/<repo>. Group them into bugs, enhancements, and documentation work. Recommend one good first issue.
```

### Exercise C: Pull request review prep

```text
Use GitHub MCP tools to inspect the 3 most recent open pull requests in <owner>/<repo>. For each one, summarize purpose, current status, and review risk.
```

### Exercise D: Workflow health

```text
Use GitHub MCP tools to check recent GitHub Actions runs for <owner>/<repo>. Tell me whether the pipeline is healthy and identify the latest failed run, if any.
```

## Part 6: Optional Write Actions

Use these only in a repository where writes are safe.

### Create an issue

```text
Use GitHub MCP tools to create a new issue in <owner>/<repo> titled "GitHub MCP workshop test issue" with a short body saying this was created during a VS Code MCP workshop.
```

### Create a branch

```text
Use GitHub MCP tools to create a branch named chore/github-mcp-workshop-demo from the default branch in <owner>/<repo>.
```

### Open a draft pull request

```text
Use GitHub MCP tools to open a draft pull request from chore/github-mcp-workshop-demo into the default branch of <owner>/<repo> with a short summary placeholder.
```

## Part 7: Use MCP Resources and Prompts

### Add MCP resources to chat context

1. In Copilot Chat, select **Add Context**.
2. Select **MCP Resources**.
3. Choose a GitHub resource if available.
4. Ask a focused question against that context.

Example prompt:

```text
Using the attached GitHub MCP resource, summarize the main purpose of this repository and identify the most relevant files for a new contributor.
```

### Try MCP-provided slash prompts

In the chat input, type `/` and look for GitHub MCP prompt entries. If exposed by the server, they appear in the format:

```text
/github.<prompt-name>
```

## Troubleshooting

- If `github` does not appear in `MCP: List Servers`, restart VS Code and check trust approval.
- If the server is listed but tools do not appear in chat, switch the chat mode to **Agent**.
- If private repositories are not accessible, confirm that your GitHub sign-in or token has access.
- If your company uses Copilot Business or Enterprise, confirm that MCP usage is allowed by policy.
- If a server fails to start, open `MCP: List Servers`, select the server, and view output logs.

## Suggested 60-Minute Delivery Flow

1. Install the GitHub MCP server and verify it in VS Code.
2. Open Agent mode and inspect available GitHub tools.
3. Run one repository discovery prompt.
4. Run one issue or PR prompt.
5. Run one workflow prompt.
6. If allowed, perform one safe write action such as creating a test issue.

## Workshop Outcome Check

Participants are done when they can:

- See `github` in `MCP: List Servers`
- Use Agent mode with GitHub MCP tools enabled
- Retrieve repo information through prompts
- Complete at least one GitHub task through MCP without leaving VS Code