---
name: code-refactoring
description: Automatically converts older JavaScript syntax to modern ES6+ standards across the kids-learning-app codebase.
---

# Instructions

When I ask you to "refactor this code" or "modernize syntax," perform these transformations:

## JavaScript Modernization

1. **var to const/let**: Replace `var` declarations with `const` (for non-reassigned) or `let` (for reassigned variables).
   
2. **Function expressions to arrow functions**: Convert anonymous functions to arrow functions where appropriate:
   ```javascript
   // Old
   array.forEach(function(item) { ... });
   // New
   array.forEach(item => { ... });
   ```

3. **Template literals**: Replace string concatenation with template literals:
   ```javascript
   // Old
   const message = 'Hello ' + name + '!';
   // New
   const message = `Hello ${name}!`;
   ```

4. **Destructuring**: Use destructuring for object/array access when reading multiple properties.

5. **Default parameters**: Replace manual default value checks with default parameters:
   ```javascript
   // Old
   function greet(name) {
     name = name || 'Guest';
   }
   // New
   function greet(name = 'Guest') { ... }
   ```

6. **Async/await**: Convert callback-based patterns to async/await where applicable.

## Project-Specific Rules

For kids-learning-app:
- Keep code simple and readable (target audience: junior developers)
- Preserve existing EJS template syntax
- Don't refactor Express middleware patterns unless requested
- Maintain browser compatibility (modern browsers only, ES6+ supported)
- Keep TTS and animation code clear and well-commented

## When NOT to Refactor

- Don't change working code without a specific reason
- Don't refactor during bug fixes (separate PRs)
- Don't modernize third-party library code
- Don't break existing functionality for syntax improvements alone
