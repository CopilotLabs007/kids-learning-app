# Playwright MCP Workshop Guide

> Read this guide before using the Playwright MCP server with GitHub Copilot in this repository.

This workshop is organized for hands-on delivery. It starts with setup, moves into quick validation, then walks through guided MCP exercises in a practical order.

---

## 1. Workshop Goal

By the end of this lab, participants should be able to:

- understand what Playwright MCP adds on top of normal Playwright test generation
- configure the Playwright MCP server in VS Code
- start the local application and verify the configured base URL
- use MCP browser tools to navigate, click, type, upload, drag, inspect, and validate UI behavior
- connect interactive MCP validation with the repo's normal Playwright test suite

---

## 2. What Is Playwright MCP?

The Playwright MCP (Model Context Protocol) server exposes browser automation
capabilities to AI agents as callable tools. When configured in VS Code, the
`@playwright` can navigate pages, click elements, fill forms, take
screenshots, and evaluate JavaScript — all within the agent conversation.

This enables two modes of operation:

| Mode | What it does |
| --- | --- |
| Generate | Agent writes Playwright spec files. |
| Generate + Execute | Agent writes tests and can also validate behavior interactively against the running app. |

---

## 3. Prerequisites

| Requirement | Notes |
| --- | --- |
| Node.js | Version 18 or later |
| VS Code | Latest recommended |
| GitHub Copilot extension | Latest recommended |
| Playwright | Installed through this repo's dependencies |
| Running app | Must be reachable at the configured base URL |

Install the browser once if needed:

```bash
npx playwright install chromium
```

---

## 5. Install And Configure Playwright MCP

### Option A: Microsoft package

Recommended package:

```bash
npm install -g @playwright/mcp
```

Verify installation:

```bash
npx @playwright/mcp --version
```

### Option B: Workspace-driven execution

This repo already uses `npx @playwright/mcp@latest` inside `.vscode/mcp.json`, so a global install is optional if the workspace config is used directly.

### Verify VS Code picks it up

1. Open Copilot Chat.
2. Type `@playwright`.
3. Open the tool picker or configure tools UI.
4. Confirm the Playwright browser tools are listed.

![alt text](/GuidedLab/mcp-workshop/images/check-tools.png)
If not visible, reload the VS Code window and check for errors in the output panel.
![alt text](/GuidedLab/mcp-workshop/images/Reload-Window.png)

---
## 5. Repository Settings Used In This Workshop

![alt text](/GuidedLab/mcp-workshop/images/vscode-mcp-json.png)
### MCP config

The current MCP environment variable in `.vscode/mcp.json` is:

```json
{
  "servers": {
    "microsoft/playwright-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ],
      "env": {
        "PLAYWRIGHT_BASE_URL": "http://localhost:3000"
      }
    }
  },
  "inputs": []
}
```

This repo is already set up to use the local Express app at:

```text
http://localhost:3000
```

### Playwright config

The current base URL in `playwright.config.ts` is:

```ts
use: {
  baseURL: 'http://localhost:3000',
  trace: 'on-first-retry'
}
```

If the app host or port changes, update both places.

## 6. Available Tool Names

When the MCP server is active, these are the browser tools expected in this workshop.

### Navigation tools

- `browser_navigate`: Navigate to a URL
- `browser_navigate_back`: Go back to the previous page in browser history
- `browser_resize`: Resize the browser window
- `browser_close`: Close the current page

### Interaction

- `browser_click`: Perform click on a web page element
- `browser_fill_form`: Fill multiple form fields
- `browser_type`: Type text into an editable element
- `browser_select_option`: Select an option in a dropdown
- `browser_handle_dialog`: Handle a browser alert, confirm, prompt, or file chooser dialog
- `browser_hover`: Hover over an element on the page
- `browser_press_key`: Press a keyboard key
- `browser_drag`: Perform drag and drop between two elements
- `browser_file_upload`: Upload one or more files

### Inspection

- `browser_snapshot`: Capture an accessibility-style snapshot of the current page
- `browser_take_screenshot`: Take a screenshot of the current page
- `browser_evaluate`: Evaluate JavaScript expression on page or element
- `browser_run_code`: Run a Playwright code snippet
- `browser_console_messages`: Return browser console messages
- `browser_network_requests`: Return network requests since loading the page

### Context tools

- `browser_tabs`: List, create, close, or select a browser tab

---

## 7. Selector Convention For This App

Use existing `data-testid` values when possible. Do not use CSS classes or positional selectors for workshop demos.

Correct examples:

```json
{
  "tool": "browser_click",
  "selector": "[data-testid='profile-submit']"
}
```

```json
{
  "tool": "browser_click",
  "selector": "data-testid=start-quiz"
}
```

Wrong examples:

```json
{
  "tool": "browser_click",
  "selector": ".btn-primary"
}
```

```json
{
  "tool": "browser_click",
  "selector": "button:nth-child(2)"    // positional
}
```

Useful selectors already present in this app include:

- `profile-submit`
- `open-modal`
- `fact-topic`
- `load-fact`
- `drag-penguin`
- `drop-ice`
- `start-quiz`
- `next-question`

---

## 8. Start The Application

From the repository root, start the app with:

```bash
npm start
```

The app should be available at:

```text
http://localhost:3000
```

Recommended first pages:

- `/playground`
- `/quiz`

Optional verification from a terminal:

```bash
curl http://localhost:3000
```

Optional verification in a browser:

```bash
open http://localhost:3000/playground
open http://localhost:3000/quiz
```

---

## 9. Workshop Flow At A Glance

Use this order for a smooth hands-on session:

1. Confirm the app is running and MCP tools are available.
2. Run two smoke prompts to validate navigation.
3. Try click and modal workflows.
4. Try form fill and note entry.
5. Try selection and dynamic content.
6. Try hover and resize.
7. Try file upload and note removal.
8. Try drag and drop.
9. Try screenshot and accessibility snapshot.
10. Try browser history.
11. Finish with the quiz flow.

This progression builds confidence before moving into richer interactions.

---

## 10. Quick Readiness Check

Run these two prompts first. If both work, the environment is ready for the rest of the workshop.

### Prompt 1

```text
Open /playground and tell me which major interactive sections are visible.
```

Expected sections:

- Profile Builder
- Quick Actions
- Learning Stations
- Animal Habitat Match
- Fact Finder

### Prompt 2

```text
Open /quiz and tell me whether the intro screen and Start Quiz button are visible.
```

---

## 11. Guided Hands-On Exercises

Use the prompts below directly in Copilot Chat with Playwright MCP enabled.

### Stage A: Navigation And Visibility

#### 1. Navigate to the playground

Prompt:

```text
Open /playground and tell me which major interactive sections are visible.
```

Primary tools exercised:

- `browser_navigate`
- `browser_snapshot`

Expected result:

- The page opens successfully.
- You should see Profile Builder, Quick Actions, Learning Stations, Animal Habitat Match, and Fact Finder.

#### 2. Navigate to the quiz

Prompt:

```text
Open /quiz and tell me whether the intro screen and Start Quiz button are visible.
```

Primary tools exercised:

- `browser_navigate`
- `browser_snapshot`

### Stage B: Click And Modal Flows

#### 3. Open and close the learning reminder modal

Prompt:

```text
Open /playground, click "Open Learning Reminder", verify the modal is visible, then click "Close" and verify the modal closes.
```

Primary tools exercised:

- `browser_click`
- `browser_snapshot`

#### 4. Accept the modal with the main action button

Prompt:

```text
Open /playground, click "Open Learning Reminder", verify the modal is visible, then click "I am ready" and verify the modal closes.
```

Primary tools exercised:

- `browser_click`
- `browser_snapshot`

#### 5. Close the modal with the keyboard

Prompt:

```text
Open /playground, click "Open Learning Reminder", verify the dialog appears, then press Escape and verify the dialog closes.
```

Primary tools exercised:

- `browser_click`
- `browser_press_key`
- `browser_snapshot`

### Stage C: Form Filling And Typing

Optional focused prompt for submit behavior:

```text
Open /playground, fill the Profile Builder with learner name Mia, age group 6-7, favorite lesson Alphabet, story mode enabled, and energy level 8. Click Save Profile and confirm that the submitted profile summary appears in the result area.
```

```text
Open /playground and use browser_click on [data-testid='profile-submit'].
```

#### 6. Fill the learner profile with one command

Prompt:

```text
Open /playground and fill the learner profile form with these values:
Learner name: Mia
Age group: 6-7
Favorite lesson: Alphabet
Story mode: checked
Then set the energy level to 8, click Save Profile, and summarize the saved result.
```

Primary tools exercised:

- `browser_fill_form`
- `browser_click`
- `browser_snapshot`

#### 7. Type into the notes board manually

Prompt:

```text
Open /playground, switch to the Notes Board tab, type "Practice colors" into the note input, click Add Note, and confirm the note appears.
```

Primary tools exercised:

- `browser_click`
- `browser_type`
- `browser_snapshot`

#### 8. Verify form validation behavior

Prompt:

```text
Open /playground, click Save Profile without entering any values, and tell me what validation or error message appears.
```

Primary tools exercised:

- `browser_click`
- `browser_snapshot`

### Stage D: Dropdowns And Selection

#### 9. Select a fact topic and load a fact

Prompt:

```text
Open /playground, in Fact Finder select Animals, click Load Fact, and tell me the fact text that appears.
```

Primary tools exercised:

- `browser_select_option`
- `browser_click`
- `browser_snapshot`

#### 10. Change topics and verify the state resets

Prompt:

```text
Open /playground, load a fact for Animals, then change the topic to Quiz and confirm the fact area resets before loading the next fact.
```

Primary tools exercised:

- `browser_select_option`
- `browser_click`
- `browser_snapshot`

### Stage E: Hover And Resize

#### 11. Hover over navigation and feature areas

Prompt:

```text
Open /playground, hover over the Quiz link in the top navigation, then hover over the Open Learning Reminder button, and describe any visible state changes.
```

Primary tools exercised:

- `browser_hover`
- `browser_snapshot`

#### 12. Resize for mobile layout

Prompt:

```text
Open /playground, resize the browser to a mobile viewport around 390 by 844, and tell me whether the layout stacks into a single column cleanly.
```

Primary tools exercised:

- `browser_resize`
- `browser_snapshot`

### Stage F: File Upload And Notes

#### 13. Upload a practice file

Prompt:

```text
Open /playground, switch to the Upload Corner tab, upload a small text file, and confirm the uploaded filename appears in the list.
```

Primary tools exercised:

- `browser_click`
- `browser_file_upload`
- `browser_snapshot`

#### 14. Add and remove a note

Prompt:

```text
Open /playground, go to Notes Board, add a note that says "Practice shapes", then remove it and confirm it disappears.
```

Primary tools exercised:

- `browser_type`
- `browser_click`
- `browser_snapshot`

### Stage G: Drag And Drop

#### 15. Complete the habitat matching activity

Prompt:

```text
Open /playground and complete the animal habitat drag-and-drop activity, then tell me the match status text.
```

Primary tools exercised:

- `browser_drag`
- `browser_snapshot`

Expected result:

- Penguin goes to Icy Coast.
- Lion goes to Sunny Savanna.
- Duck goes to Pond.
- The final status should read `3 of 3 matches complete.`

#### 16. Reset the drag-and-drop game

Prompt:

```text
Open /playground, complete the habitat matches, click Reset Match Game, and verify the status returns to 0 of 3 matches complete.
```

Primary tools exercised:

- `browser_drag`
- `browser_click`
- `browser_snapshot`

### Stage H: Screenshots And Snapshots

#### 17. Capture a full-page screenshot

Prompt:

```text
Open /playground and take a screenshot of the current page so I can review the layout.
```

Primary tools exercised:

- `browser_take_screenshot`

#### 18. Capture a structured accessibility snapshot

Prompt:

```text
Open /playground and give me an accessibility-style page snapshot so I can inspect the interactive elements and their roles.
```

Primary tools exercised:

- `browser_snapshot`

### Stage I: Navigation History

#### 19. Use browser back navigation

Prompt:

```text
Open /playground, then navigate to /quiz, then go back in browser history and confirm you returned to /playground.
```

Primary tools exercised:

- `browser_navigate`
- `browser_navigate_back`
- `browser_snapshot`

### Stage J: Quiz Use Case

#### 20. Start the quiz and verify disabled next state

Prompt:

```text
Open /quiz, click Start Quiz, and confirm that the Next button is disabled until an answer is selected.
```

Primary tools exercised:

- `browser_click`
- `browser_snapshot`

---

## 12. Suggested Live Demo Sequence

If you want one compact end-to-end instructor demo, use this order:

1. Open `/playground`.
2. Open and close the learning reminder modal.
3. Fill the learner profile and save it.
4. Switch to Upload Corner and upload a file.
5. Switch to Notes Board and add a note.
6. Load a fact for Animals.
7. Complete the habitat drag-and-drop game.
8. Resize to mobile and take a screenshot.
9. Open `/quiz` and verify the quiz can start.

This path covers navigation, clicking, typing, form fill, upload, selection, drag and drop, screenshots, and route changes in one realistic walkthrough.

---

## 13. Running The Playwright Test Suite

Use the terminal for the authoritative automated test run.

```bash
npm test
```

Repo-specific useful commands:

```bash
npm run test:playground
npm run test:quiz
npm run test:headed
npx playwright test --reporter=list
```

The current `playwright.config.ts` uses:

- `testDir: './tests'`
- `baseURL: 'http://localhost:3000'`
- `trace: 'on-first-retry'`

---

## 14. Troubleshooting

### MCP server does not appear in Copilot

1. Check `.vscode/mcp.json` syntax.
2. Reload the VS Code window.
3. Open the Copilot or MCP output panel and inspect errors.
4. Run `npx @playwright/mcp --version` to confirm the package is available.

### Navigation fails immediately

- Confirm the app is running at `http://localhost:3000`.
- Open the same URL in a regular browser to separate app issues from MCP issues.
- Confirm the MCP base URL matches the Playwright base URL.

### An element is not found

- Confirm the element exists on the currently visible page.
- Prefer `data-testid` selectors already present in the app.
- Use `browser_snapshot` first if the UI state may have changed.
- Use `browser_take_screenshot` if you need a quick visual check.

### MCP session works but CLI tests fail

- MCP validation and CLI test execution are related but not identical.
- Run `npm run test:headed` to inspect behavior visually.
- Run `npx playwright test --reporter=list` for detailed CLI feedback.

---

## 15. References

- [Playwright documentation](https://playwright.dev)
- [Microsoft Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [VS Code MCP configuration](https://code.visualstudio.com/docs/copilot/mcp)
- `playwright.config.ts`
- `.vscode/mcp.json`
- `tests/playground.spec.ts`
- `tests/quiz.spec.ts`
