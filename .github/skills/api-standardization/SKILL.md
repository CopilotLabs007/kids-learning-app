---
name: api-standardization
description: Ensures all API calls in kids-learning-app follow consistent structure with proper error handling and logging.
---

# Instructions

When I ask you to "standardize API calls" or create new API endpoints, follow these patterns:

## Express Route Structure

All routes in `app.js` should follow this pattern:

```javascript
app.get('/path/:param', (req, res) => {
  try {
    // 1. Validate input
    const { param } = req.params;
    if (!param) {
      return res.status(400).json({ error: 'Missing required parameter' });
    }
    
    // 2. Process request
    const data = processData(param);
    
    // 3. Render or respond
    res.render('template', { 
      title: 'Page Title',
      data: data 
    });
    
  } catch (error) {
    console.error('Error in /path/:param:', error);
    res.status(500).render('error', { 
      error: 'Something went wrong',
      message: error.message 
    });
  }
});
```

## Client-Side API Calls

For fetch requests in client-side JavaScript:

```javascript
async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Fetch error:', error);
    // Show user-friendly error
    showError('Failed to load data. Please try again.');
    return null;
  }
}
```

## Required Standards

1. **Error Handling**: All routes and API calls must have try-catch blocks
2. **Status Codes**: Use appropriate HTTP status codes (200, 400, 404, 500)
3. **Logging**: Log errors with context (route name, parameters)
4. **Validation**: Validate all user inputs before processing
5. **Consistent Response Format**: Use consistent JSON structure or EJS rendering
6. **Timeout Handling**: Set reasonable timeouts for external API calls

## Project-Specific Rules

For kids-learning-app:
- Keep API responses simple (this is a learning app)
- No authentication required (public educational content)
- Focus on fast response times (kids have short attention spans)
- Provide clear error messages suitable for parent/teacher troubleshooting
- Log errors but don't expose technical details to users
