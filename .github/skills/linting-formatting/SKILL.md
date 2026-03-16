---
name: linting-formatting
description: Enforces kids-learning-app specific style guidelines for JavaScript, CSS, and EJS templates.
---

# Instructions

When I ask you to "format this code" or "check style," apply these project-specific rules:

## JavaScript Style Guide

1. **Indentation**: 2 spaces (no tabs)
2. **Semicolons**: Always use semicolons
3. **Quotes**: Single quotes for JavaScript, double quotes for HTML attributes
4. **Line Length**: Max 100 characters (break into multiple lines if longer)
5. **Naming Conventions**:
   - Variables/functions: camelCase (`currentQuestion`, `displayCard`)
   - Constants: UPPER_SNAKE_CASE (`MAX_QUESTIONS`, `DEFAULT_COLOR`)
   - CSS classes: kebab-case (`quiz-container`, `fruit-card`)

## CSS Style Guide

```css
/* Group related properties */
.selector {
  /* 1. Display & positioning */
  display: flex;
  position: relative;
  
  /* 2. Box model */
  width: 100%;
  padding: 20px;
  margin: 10px 0;
  
  /* 3. Typography */
  font-size: 18px;
  color: #333;
  
  /* 4. Visual */
  background-color: #fff;
  border-radius: 10px;
  
  /* 5. Animations */
  transition: all 0.3s ease;
}
```

**CSS Rules:**
- Order properties logically (display → box model → typography → visual → animations)
- Use hex colors (#RRGGBB) consistently
- Group related selectors together
- Comment sections clearly
- Use CSS custom properties for theme colors

## EJS Template Style

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
</head>
<body>
  <% if (condition) { %>
    <div class="content">
      <!-- Keep EJS logic simple -->
      <%= variable %>
    </div>
  <% } %>
</body>
</html>
```

**EJS Rules:**
- Indent EJS blocks properly
- Keep logic minimal (move complex logic to routes)
- Use `<%=` for output (auto-escapes), `<%-` only when needed
- Comment complex template structures

## File Organization

```
project/
├── app.js                 # Routes and server setup
├── public/
│   ├── css/
│   │   └── style.css     # All styles in one file (project is small)
│   └── js/
│       ├── main.js       # Shared utilities (TTS)
│       └── quiz.js       # Feature-specific logic
└── views/
    ├── layout.ejs        # Shared layout
    ├── index.ejs         # Pages
    └── partials/         # Reusable components (if needed)
```

## Linting Checks

Before committing, verify:
- [ ] No `console.log` in production code (use for debugging only)
- [ ] All functions have clear names
- [ ] No unused variables
- [ ] Consistent formatting throughout file
- [ ] Comments explain "why," not "what"
- [ ] No TODO comments left unresolved

## Project-Specific Rules

For kids-learning-app:
- Prioritize readability over clever code
- Comment age-appropriate design decisions
- Keep files small and focused
- Use clear, descriptive variable names
- Avoid abbreviations (unless universally understood like `TTS`)
