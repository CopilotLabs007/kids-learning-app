# Playwright MCP Setup Guide

> **Read this file before using the Playwright MCP server in `@playwright-agent`.**
> This guide explains how to install, configure, and use the Playwright MCP server
> with GitHub Copilot for interactive browser automation and E2E test validation.

---

## What is Playwright MCP?

The Playwright MCP (Model Context Protocol) server exposes browser automation
capabilities to AI agents as callable tools. When configured in VS Code, the
`@playwright-agent` can navigate pages, click elements, fill forms, take
screenshots, and evaluate JavaScript — all within the agent conversation.

This enables two modes of operation:

| Mode | What it does |
|------|--------------|
| **Generate** | Agent writes `.spec.ts` test files (no MCP needed) |
| **Generate + Execute** | Agent writes files **and** interactively validates against the running app |

---

## Prerequisites

| Requirement | Version / Notes |
|-------------|-----------------|
| Node.js | 18 or later |
| Playwright | Installed via `npm install` (see `package.json`) |
| VS Code | Latest |
| GitHub Copilot extension | Latest |
| Running application | Must be accessible at `baseURL` in `playwright.config.ts` |

Install Playwright browsers if not already installed:

```bash
npx playwright install chromium
```

---

## Installation

### Option A — Microsoft Playwright MCP (Recommended)

The official Microsoft Playwright MCP package is `@playwright/mcp`.

```bash
npm install -g @playwright/mcp
```

Verify installation:

```bash
npx @playwright/mcp --version
```

### Option B — Community Playwright MCP Server

If using the `playwright-mcp` community package:

```bash
npm install -g playwright-mcp
```

---

## VS Code Configuration

Add the Playwright MCP server to your VS Code MCP configuration.

### Step 1: Open MCP configuration

Open VS Code Settings → search for `MCP` → open `mcp.json`
(or create `.vscode/mcp.json` in the workspace root).

### Step 2: Add the server entry

#### Using `@playwright/mcp` (Microsoft package)

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp", "--browser", "chromium"],
      "env": {
        "PLAYWRIGHT_BASE_URL": "http://localhost:5173"
      }
    }
  }
}
```

#### Using `playwright-mcp` (community package)

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["playwright-mcp"],
      "env": {
        "BASE_URL": "http://localhost:5173"
      }
    }
  }
}
```

### Step 3: Verify the server appears in Copilot

Open GitHub Copilot Chat panel.
Type `@playwright-agent` and check that Playwright MCP tools are
listed in the available tools.

---

## Available Tool Names

When the Playwright MCP server is running, these tools are available
to the agent. Tool names may vary slightly between package versions —
the agent will use whichever names are present.

### Navigation

| Tool | Description |
|------|-------------|
| `playwright_navigate` | Navigate to a URL |
| `playwright_go_back` | Navigate browser back |
| `playwright_go_forward` | Navigate browser forward |
| `playwright_reload` | Reload the current page |

### Interaction

| Tool | Description |
|------|-------------|
| `playwright_click` | Click an element |
| `playwright_fill` | Fill a text input |
| `playwright_select` | Select a dropdown option |
| `playwright_check` | Check a checkbox |
| `playwright_uncheck` | Uncheck a checkbox |
| `playwright_hover` | Hover over an element |
| `playwright_press` | Press a keyboard key |
| `playwright_drag` | Drag an element |

### Inspection

| Tool | Description |
|------|-------------|
| `playwright_screenshot` | Take a screenshot |
| `playwright_evaluate` | Run JavaScript in the page |
| `playwright_get_text` | Get element text content |
| `playwright_wait_for` | Wait for a selector or condition |
| `playwright_get_attribute` | Get an element attribute value |

### Context

| Tool | Description |
|------|-------------|
| `playwright_new_context` | Create a new browser context |
| `playwright_close_context` | Close the current browser context |
| `playwright_storage_state` | Read/write storage state (cookies, localStorage) |

---

## Selector Convention for MCP Tools

Always use `data-testid` selectors when calling MCP tools.
Never use CSS classes or positional selectors.

```json
// CORRECT — using data-testid
{
  "tool": "playwright_click",
  "selector": "[data-testid='submit-loan-button']"
}

// ALSO CORRECT — getByTestId syntax (supported by some servers)
{
  "tool": "playwright_click",
  "selector": "data-testid=submit-loan-button"
}

// WRONG — never use these
{
  "tool": "playwright_click",
  "selector": ".btn-primary"           // CSS class
}
{
  "tool": "playwright_click",
  "selector": "button:nth-child(2)"    // positional
}
```

All `data-testid` values come from `docs/design/design-doc.md`.
If a `data-testid` is missing from the design document, **update the design document** —
do not invent values.

---

## Confirming the Application is Running

Before using any Playwright MCP tools, confirm the application is running.

### Check if the frontend is running

```bash
# Expected: server responding at baseURL
curl http://localhost:5173
```

### Start the application (if not running)

The start commands depend on the tech stack in `workshop-stack.md`.
Typical commands:

```bash
# Start backend (in one terminal)
npm run dev:backend
# or
node src/backend/index.ts

# Start frontend (in another terminal)
npm run dev:frontend
# or
npm run dev
```

Wait until both servers are ready before invoking the agent with
MCP execution mode.

---

## baseURL Configuration

The `baseURL` used by Playwright is defined in `playwright.config.ts`:

```typescript
use: {
  baseURL: 'http://localhost:5173',
  ...
}
```

If the application runs on a different port or host, update
`playwright.config.ts` **and** the MCP server environment variable
(`PLAYWRIGHT_BASE_URL` or `BASE_URL`) to match.

---

## Authentication in MCP Sessions

If the application requires login before tests can run:

1. The agent will use the `playwright_navigate` tool to open the login page
2. It will use `playwright_fill` and `playwright_click` with `data-testid`
   selectors to perform login
3. After login, it saves browser storage state so subsequent tool calls
   remain authenticated

Seed user credentials come from `workshop-stack.md` and
`src/backend/prisma/seed.ts` (or equivalent seed file).
The agent never hardcodes passwords — it reads them from the seed file comment.

---

## Troubleshooting

### MCP server not appearing in Copilot

1. Check `.vscode/mcp.json` syntax — must be valid JSON
2. Reload VS Code window (`Developer: Reload Window`)
3. Check the Output panel → Copilot MCP for error messages
4. Verify the package is installed: `npx @playwright/mcp --version`

### `playwright_navigate` fails immediately

- Confirm the application is running at the configured `baseURL`
- Check for CORS or CSP headers that block the MCP browser context
- Try opening `baseURL` in a regular browser to rule out app startup issues

### Tests pass in MCP session but fail in `npx playwright test`

This can happen if:
- Auth state is not persisted between MCP and the CLI runner
- The MCP session uses a different browser profile
- Run `npx playwright test --headed` to visually debug

### Element not found by `data-testid`

- Verify the `data-testid` attribute is present in the design document
- Verify the FRONTEND implementation added the attribute to the element
- Use `playwright_screenshot` to visually inspect the current page state

---

## Running the Full Test Suite

Use the terminal for the authoritative test run (not MCP tools):

```bash
# Run all tests
npx playwright test

# Run with verbose output
npx playwright test --reporter=list

# Run a single file
npx playwright test e2e/book-catalogue.spec.ts

# Run in headed mode (see the browser)
npx playwright test --headed

# Open the HTML report after a run
npx playwright show-report docs/test-reports
```

The HTML report is written to `docs/test-reports/` as configured in
`playwright.config.ts`. Open `docs/test-reports/index.html` in a browser.

---

## References

- [Playwright documentation](https://playwright.dev)
- [Microsoft Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [VS Code MCP configuration](https://code.visualstudio.com/docs/copilot/mcp)
- `playwright.config.ts` — project test configuration
- `workshop-stack.md` — `e2e_tests_folder` and `baseURL` settings
