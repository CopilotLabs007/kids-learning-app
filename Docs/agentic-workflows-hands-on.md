# Hands-On: GitHub Agentic Workflows Quick Start

## Overview
This hands-on guide walks you through setting up an automated daily status workflow in your GitHub repository using Agentic Workflows. By the end of this guide, you will have a functional workflow that generates daily repository status reports.

---

## Prerequisites
Before you begin, ensure you have the following:

1. **AI Account**: Access to GitHub Copilot, Anthropic Claude, OpenAI Codex, or Google Gemini.
2. **GitHub Repository**: A repository where you have write access.
3. **GitHub Actions Enabled**: Verify in your repository settings.
4. **GitHub CLI (`gh`)**: Version 2.0.0 or higher. Install [here](https://cli.github.com/).
5. **Operating System**: Linux, macOS, or Windows with WSL.

---

## Step 1: Install the Extension
Install the GitHub Agentic Workflows extension:
```bash
gh extension install github/gh-aw
```

If you encounter authentication issues, use the following script:
```bash
curl -sL https://raw.githubusercontent.com/github/gh-aw/main/install-gh-aw.sh | bash
```

Alternatively, log in interactively:
```bash
gh auth login
```

---

## Step 2: Add the Sample Workflow
From your repository root, run:
```bash
gh aw add-wizard githubnext/agentics/daily-repo-status
```

This command initiates an interactive process to:
1. Verify repository permissions.
2. Select an AI engine (e.g., Copilot, Claude, Codex, or Gemini).
3. Set up the required secret (e.g., `COPILOT_GITHUB_TOKEN`).
4. Add the workflow and lock file to `.github/workflows/`.
5. Optionally trigger an initial run.

---

## Step 3: Wait for the Workflow to Complete
The workflow run typically takes 2-3 minutes. Once complete, a new issue will be created in your repository with a “Daily Repo Report.”

### Example Report Includes:
- Recent repository activity (issues, PRs, discussions, releases, code changes).
- Progress tracking, goal reminders, and highlights.
- Project status and recommendations.
- Actionable next steps for maintainers.

---

## Step 4: Customize Your Workflow (Optional)
You can customize the workflow to suit your needs:

1. Open the workflow file located at `.github/workflows/daily-repo-status.md`.
2. Edit the “What to include” section to specify your priorities (e.g., issue backlog, CI setup, testing).
3. If you modify the YAML frontmatter, regenerate the workflow YAML:
   ```bash
   gh aw compile
   ```
4. Commit and push the changes to your repository.
5. Optionally trigger another run:
   ```bash
   gh aw run daily-repo-status
   ```

---

## What’s Next?
Explore more ways to use Agentic Workflows:
- [Creating Agentic Workflows](https://github.github.com/gh-aw/setup/creating-workflows/)
- [How Agentic Workflows Work](https://github.github.com/gh-aw/introduction/how-they-work/)
- [Frequently Asked Questions](https://github.github.com/gh-aw/reference/faq/)

---

## Conclusion
By following this guide, you’ve successfully set up an automated daily status workflow in your GitHub repository. This is just the beginning—customize and expand your workflows to unlock the full potential of Agentic Workflows!