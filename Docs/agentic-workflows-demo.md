# Agentic Workflows Demo

## Overview
Agentic workflows in GitHub Actions allow developers to use natural language instructions in Markdown to automate tasks. These workflows leverage AI agents to interpret and execute tasks based on repository context, enhancing flexibility and reducing the need for rigid scripting.

### Key Features:
- **Natural Language Instructions**: Define tasks in Markdown.
- **AI-Powered Execution**: Uses AI engines like GitHub Copilot, OpenAI Codex, or Claude by Anthropic.
- **Secure and Controlled**: Implements strict security measures to prevent unauthorized actions.

## Real-Time Use Cases

### 1. Daily Repository Status Report
**Scenario**: Automate the creation of a daily status report summarizing repository activity.

**Workflow Example**:
```yaml
---
on:
  schedule:
    - cron: "0 0 * * *" # Daily at midnight
  workflow_dispatch:

permissions:
  contents: read
  issues: read
  pull-requests: read

engine:
  id: copilot
  model: gpt-5.2-codex

safe-outputs:
  create-issue:
    title-prefix: "[Daily Status] "
    labels: [report]
    expires: 7
---

# Daily Status Report

You are a repository analyst. Your task is to create a daily status report issue that summarizes recent issue and pull request activity, highlighting any important information for maintainers.

## Goal
- Summarize issues opened in the last 24 hours.
- Highlight PRs and issues open for over a week.
- Recommend priorities and actionable next steps.
```

### 2. Automated Issue Triage
**Scenario**: Automatically categorize and prioritize new issues based on their content.

**Workflow Example**:
```yaml
---
on:
  issues:
    types: [opened]

permissions:
  issues: write

engine:
  id: copilot
  model: gpt-5.2-codex

safe-outputs:
  label-issue:
    labels: ["bug", "enhancement", "question"]
---

# Issue Triage

You are an issue triage bot. Categorize new issues based on their content and assign appropriate labels. Provide a brief summary of the issue and suggest next steps.
```

### 3. Pull Request Review Automation
**Scenario**: Automate the review of pull requests to ensure coding standards and guidelines are followed.

**Workflow Example**:
```yaml
---
on:
  pull_request:
    types: [opened, synchronize]

permissions:
  pull-requests: write

engine:
  id: copilot
  model: gpt-5.2-codex

safe-outputs:
  review-pr:
    comments: true
---

# Pull Request Review

You are a code reviewer. Analyze the changes in the pull request, ensure they adhere to coding standards, and provide constructive feedback. Highlight any potential issues or improvements.
```

## Security Model
Agentic workflows are designed with a robust security architecture:
1. **Pre-activation Checks**: Validates workflow definitions and permissions.
2. **Input Sanitization**: Cleans incoming data to prevent malicious inputs.
3. **Threat Detection**: Analyzes artifacts for security risks before execution.
4. **Scoped Write Permissions**: Ensures minimal permissions for each action.

## Getting Started
1. Install the `gh aw` CLI extension.
2. Create a Markdown workflow file in `.github/workflows/`.
3. Compile the workflow using `gh aw compile`.
4. Push the compiled `.lock.yml` file to your repository.
5. Trigger the workflow manually or on a schedule.

## Conclusion
Agentic workflows simplify complex automation tasks while maintaining high security standards. By leveraging AI, developers can focus on higher-value activities, leaving repetitive tasks to intelligent agents.