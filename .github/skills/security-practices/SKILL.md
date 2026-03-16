---
name: security-practices
description: Enforces security best practices for the kids-learning-app, focusing on XSS prevention, input validation, and safe coding patterns.
---

# Instructions

When I ask you to "check security" or when reviewing/writing code, apply these security practices:

## Input Validation

Always validate and sanitize user inputs:

```javascript
// Route parameters
app.get('/topic/:name', (req, res) => {
  const { name } = req.params;
  
  // Whitelist allowed values
  const allowedTopics = ['alphabet', 'numbers', 'colors', 'shapes', 'animals', 'fruits'];
  
  if (!allowedTopics.includes(name)) {
    return res.status(404).render('error', { 
      error: 'Topic not found' 
    });
  }
  
  res.render(name, { title: name });
});
```

```javascript
// Query parameters
const page = parseInt(req.query.page) || 1;
const limit = Math.min(parseInt(req.query.limit) || 10, 100); // Max 100

if (page < 1 || limit < 1) {
  return res.status(400).json({ error: 'Invalid pagination parameters' });
}
```

## XSS Prevention

1. **Use EJS auto-escaping**: Always use `<%=` (not `<%-`) unless you KNOW the content is safe
   ```ejs
   <!-- SAFE - Auto-escaped -->
   <p><%= userInput %></p>
   
   <!-- DANGEROUS - No escaping -->
   <p><%- userInput %></p>  <!-- Only for trusted content -->
   ```

2. **Sanitize TTS text**: Text-to-speech should only speak trusted content
   ```javascript
   function speakText(text) {
     // Remove HTML tags
     const cleanText = text.replace(/<[^>]*>/g, '');
     
     // Validate it's reasonable length
     if (cleanText.length > 500) {
       console.warn('Text too long for TTS');
       return;
     }
     
     const utterance = new SpeechSynthesisUtterance(cleanText);
     window.speechSynthesis.speak(utterance);
   }
   ```

3. **Safe DOM manipulation**:
   ```javascript
   // SAFE - textContent
   element.textContent = userInput;
   
   // SAFE - createElement + textContent
   const div = document.createElement('div');
   div.textContent = userInput;
   container.appendChild(div);
   
   // DANGEROUS - innerHTML with user input
   element.innerHTML = userInput; // ❌ Never do this with user data
   ```

## Content Security Policy

Add CSP headers to prevent XSS:

```javascript
// In app.js
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " + // 'unsafe-inline' for inline scripts
    "style-src 'self' 'unsafe-inline'; " +  // 'unsafe-inline' for inline styles
    "img-src 'self' data:; " +
    "font-src 'self';"
  );
  next();
});
```

## Safe Dependencies

```javascript
// In package.json, avoid wildcards
{
  "dependencies": {
    "express": "^5.1.0",          // Specific major version
    "express-ejs-layouts": "^2.5.1"  // Specific major version
  }
}
```

Run `npm audit` regularly and address high/critical vulnerabilities.

## Environment Variables

Never commit secrets:

```javascript
// .env (add to .gitignore)
PORT=3000
NODE_ENV=development

// app.js
require('dotenv').config();
const port = process.env.PORT || 3000;
```

## Rate Limiting

For production, add rate limiting:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Helmet.js for Security Headers

```javascript
const helmet = require('helmet');
app.use(helmet());
```

## Project-Specific Security

For kids-learning-app:
- **No user authentication** (public educational content)
- **No personal data collection** (COPPA compliant)
- **No external API calls** (reduces attack surface)
- **No database** (static content, no SQL injection risk)
- **No file uploads** (no file upload vulnerabilities)

## Security Checklist

Before deploying:
- [ ] All user inputs validated
- [ ] EJS uses `<%= %>` (auto-escape) by default
- [ ] No `eval()` or `Function()` with user input
- [ ] No `innerHTML` with user data
- [ ] Dependencies up to date (`npm audit`)
- [ ] Environment variables for config
- [ ] CSP headers configured
- [ ] Rate limiting on API routes
- [ ] Error messages don't expose system details
- [ ] No sensitive data in client-side code
- [ ] HTTPS in production

## Common Vulnerabilities to Avoid

1. **XSS**: Never trust user input, always sanitize/escape
2. **Path Traversal**: Validate file paths (e.g., `../../../etc/passwd`)
3. **DOS**: Validate input size, implement rate limiting
4. **Dependency Vulnerabilities**: Keep packages updated
5. **Information Disclosure**: Generic error messages for users

## When to Apply Security Checks

- Every route that accepts parameters
- Every function that handles user input
- Every DOM manipulation with dynamic content
- Every dependency update
- Before every deployment
