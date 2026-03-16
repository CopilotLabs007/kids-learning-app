---
name: doc-generation
description: Creates standard documentation templates for functions, routes, and components in kids-learning-app.
---

# Instructions

When I ask you to "document this code" or "add documentation," generate these standard templates:

## Function Documentation (JSDoc)

```javascript
/**
 * Brief description of what the function does
 * 
 * @param {Type} paramName - Description of parameter
 * @param {Type} [optionalParam=default] - Description of optional parameter
 * @returns {Type} Description of return value
 * 
 * @example
 * functionName('example', 123);
 * // Returns: expected output
 */
function functionName(paramName, optionalParam = 'default') {
  // Implementation
}
```

## Express Route Documentation

```javascript
/**
 * Route: GET /path/:param
 * Description: Brief description of what this route does
 * 
 * Parameters:
 *   - param (string): Description of URL parameter
 * 
 * Query Parameters:
 *   - option (string, optional): Description of query param
 * 
 * Response:
 *   - Renders: template.ejs with {title, data}
 *   - Or returns: JSON object with {key: value}
 * 
 * Error Handling:
 *   - 400: Invalid parameter
 *   - 404: Resource not found
 *   - 500: Server error
 * 
 * Example:
 *   GET /api/quiz/fruits?difficulty=easy
 */
app.get('/path/:param', (req, res) => {
  // Implementation
});
```

## Client-Side Function Documentation

```javascript
/**
 * Handles user interaction with quiz question
 * 
 * This function:
 * 1. Validates the selected answer
 * 2. Provides visual and audio feedback
 * 3. Updates the score
 * 4. Advances to next question
 * 
 * @param {number} answerIndex - Index of selected answer (0-3)
 * @returns {void}
 * 
 * Side Effects:
 *   - Modifies: currentQuestionIndex, score
 *   - Calls: speakText(), displayQuestion()
 *   - Updates: DOM elements (.quiz-container)
 */
function handleAnswer(answerIndex) {
  // Implementation
}
```

## Component/Module Documentation

Add at the top of each JavaScript file:

```javascript
/**
 * Module: Quiz Game Logic
 * File: public/js/quiz.js
 * 
 * Purpose:
 *   Manages quiz state, question progression, scoring, and user interactions
 * 
 * Dependencies:
 *   - TTS (main.js): Text-to-speech functionality
 *   - Quiz questions: Embedded in HTML template
 * 
 * Global State:
 *   - currentQuestionIndex: Current question number
 *   - score: User's current score
 *   - answered: Whether current question has been answered
 * 
 * Key Functions:
 *   - displayQuestion(): Renders current question
 *   - handleAnswer(): Processes user answer
 *   - showResults(): Displays final score
 *   - restartQuiz(): Resets quiz state
 */
```

## README Template for Features

When adding a new feature, document in README or separate markdown:

```markdown
# Feature Name

## Description
Brief description of what this feature does.

## User Story
As a [user type], I want to [action] so that [benefit].

## Technical Implementation
- **Route**: `/path` (GET/POST)
- **Template**: `views/feature.ejs`
- **Client Logic**: `public/js/feature.js`
- **Styling**: See `style.css` lines XXX-YYY

## Usage
How to use this feature (for developers or end users).

## Testing
How to manually test this feature.

## Known Issues
Any limitations or bugs to be aware of.
```

## Documentation Standards

For kids-learning-app:
- Write for junior developers (explain concepts)
- Include age-appropriate design rationale (why we use large buttons, bright colors, etc.)
- Document TTS integration points
- Explain educational purpose of features
- Keep examples simple and clear
- Update documentation when code changes

## When to Add Documentation

Add docs when:
- Creating new functions (always)
- Adding routes (always)
- Creating complex logic (always)
- Adding features (always)
- Fixing bugs (explain what was wrong)

Skip docs for:
- Trivial getters/setters
- Self-explanatory one-liners
- Private helper functions (unless complex)
