---
description: 'Run a security-focused code review on the selected code'
agent: Ask
model: GPT-5.2-Codex
---

Perform a thorough security review of the current code. For each issue found, provide:

1. **Severity**: Critical / High / Medium / Low
2. **Location**: File and line reference
3. **Issue**: What the problem is
4. **Risk**: What could go wrong if left unfixed
5. **Fix**: Specific code change to resolve it

Check for:

- Injection vulnerabilities (SQL, XSS, command injection)
- Authentication and authorisation gaps
- Hardcoded secrets or credentials
- Missing input validation
- Insecure cryptographic usage
- Sensitive data exposure in logs or error messages
- Missing rate limiting on public endpoints

Format output as a table sorted by severity.