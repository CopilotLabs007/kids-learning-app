# Playwright MCP Testing Prompts

Use this guide to test the Microsoft Playwright MCP server against the running
`kids-learning-app` application.

Base URL:

```text
http://localhost:3000
```

Recommended pages:

- `/playground` for forms, modal, upload, drag and drop, tabs, notes, fetch, screenshots, and evaluation
- `/quiz` for progress, radio-button flows, results, retry, and navigation history

Before starting:

1. Start the app with `npm start`.
2. Confirm the Playwright MCP server is enabled in `.vscode/mcp.json`.
3. Use the prompts below directly in Copilot Chat with the Playwright MCP tools enabled.

## Quick Smoke Tests

This list is intentionally limited to 20 prompts and focuses only on simple to
medium-complexity checks.

### 1. Navigate to the playground

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

### 2. Navigate to the quiz

Prompt:

```text
Open /quiz and tell me whether the intro screen and Start Quiz button are visible.
```

Primary tools exercised:

- `browser_navigate`
- `browser_snapshot`

## Click and Visibility Flows

### 3. Open and close the learning reminder modal

Prompt:

```text
Open /playground, click "Open Learning Reminder", verify the modal is visible, then click "Close" and verify the modal closes.
```

Primary tools exercised:

- `browser_click`
- `browser_snapshot`

### 4. Accept the modal with the main action button

Prompt:

```text
Open /playground, click "Open Learning Reminder", verify the modal is visible, then click "I am ready" and verify the modal closes.
```

Primary tools exercised:

- `browser_click`
- `browser_snapshot`

### 5. Close the modal with the keyboard

Prompt:

```text
Open /playground, click "Open Learning Reminder", verify the dialog appears, then press Escape and verify the dialog closes.
```

Primary tools exercised:

- `browser_click`
- `browser_press_key`
- `browser_snapshot`

## Form Filling and Typing

Optional focused prompt for submit behavior:

```text
Open /playground, fill the Profile Builder with learner name Mia, age group 6-7, favorite lesson Alphabet, story mode enabled, and energy level 8. Click Save Profile and confirm that the submitted profile summary appears in the result area.
```

### 6. Fill the learner profile with one command

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

### 7. Type into the notes board manually

Prompt:

```text
Open /playground, switch to the Notes Board tab, type "Practice colors" into the note input, click Add Note, and confirm the note appears.
```

Primary tools exercised:

- `browser_click`
- `browser_type`
- `browser_snapshot`

### 8. Verify form validation behavior

Prompt:

```text
Open /playground, click Save Profile without entering any values, and tell me what validation or error message appears.
```

Primary tools exercised:

- `browser_click`
- `browser_snapshot`

## Dropdowns and Selection

### 9. Select a fact topic and load a fact

Prompt:

```text
Open /playground, in Fact Finder select Animals, click Load Fact, and tell me the fact text that appears.
```

Primary tools exercised:

- `browser_select_option`
- `browser_click`
- `browser_snapshot`

### 10. Change topics and verify the state resets

Prompt:

```text
Open /playground, load a fact for Animals, then change the topic to Quiz and confirm the fact area resets before loading the next fact.
```

Primary tools exercised:

- `browser_select_option`
- `browser_click`
- `browser_snapshot`

## Hover and Resize

### 11. Hover over navigation and feature areas

Prompt:

```text
Open /playground, hover over the Quiz link in the top navigation, then hover over the Open Learning Reminder button, and describe any visible state changes.
```

Primary tools exercised:

- `browser_hover`
- `browser_snapshot`

### 12. Resize for mobile layout

Prompt:

```text
Open /playground, resize the browser to a mobile viewport around 390 by 844, and tell me whether the layout stacks into a single column cleanly.
```

Primary tools exercised:

- `browser_resize`
- `browser_snapshot`

## File Upload and Notes

### 13. Upload a practice file

Prompt:

```text
Open /playground, switch to the Upload Corner tab, upload a small text file, and confirm the uploaded filename appears in the list.
```

Primary tools exercised:

- `browser_click`
- `browser_file_upload`
- `browser_snapshot`

### 14. Add and remove a note

Prompt:

```text
Open /playground, go to Notes Board, add a note that says "Practice shapes", then remove it and confirm it disappears.
```

Primary tools exercised:

- `browser_type`
- `browser_click`
- `browser_snapshot`

## Drag and Drop

### 15. Complete the habitat matching activity

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

### 16. Reset the drag-and-drop game

Prompt:

```text
Open /playground, complete the habitat matches, click Reset Match Game, and verify the status returns to 0 of 3 matches complete.
```

Primary tools exercised:

- `browser_drag`
- `browser_click`
- `browser_snapshot`

## Screenshots and Snapshots

### 17. Capture a full-page screenshot

Prompt:

```text
Open /playground and take a screenshot of the current page so I can review the layout.
```

Primary tools exercised:

- `browser_take_screenshot`

### 18. Capture a structured accessibility snapshot

Prompt:

```text
Open /playground and give me an accessibility-style page snapshot so I can inspect the interactive elements and their roles.
```

Primary tools exercised:

- `browser_snapshot`

## Navigation History

### 19. Use browser back navigation

Prompt:

```text
Open /playground, then navigate to /quiz, then go back in browser history and confirm you returned to /playground.
```

Primary tools exercised:

- `browser_navigate`
- `browser_navigate_back`
- `browser_snapshot`

## Quiz Use Cases

### 20. Start the quiz and verify disabled next state

Prompt:

```text
Open /quiz, click Start Quiz, and confirm that the Next button is disabled until an answer is selected.
```

Primary tools exercised:

- `browser_click`
- `browser_snapshot`

## Suggested Demo Sequence

If you want a compact end-to-end demo in front of a class, use this order:

1. Open `/playground`
2. Open and close the learning reminder modal
3. Fill the learner profile and save it
4. Switch to Upload Corner and upload a file
5. Switch to Notes Board and add a note
6. Load a fact for Animals
7. Complete the habitat drag-and-drop game
8. Resize to mobile and take a screenshot
9. Open `/quiz` and verify the quiz can start

This sequence covers navigation, clicks, typing, form filling, file upload,
selection, drag and drop, screenshots, and
navigation history in one realistic workflow.
