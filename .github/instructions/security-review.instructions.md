---
description: "Use when performing security reviews, secure code reviews, threat modeling, or vulnerability triage across Python, JavaScript/TypeScript, C#, Java, and Terraform."
applyTo: "**/*.py, **/*.js, **/*.ts, **/*.cs, **/*.java, **/*.tf"
---

# Security Review Instructions

Focus on exploitable risk first. Prioritise findings that could lead to data loss, account takeover, remote code execution, privilege escalation, or lateral movement.

## Severity Model

- Critical: Actively exploitable vulnerabilities or direct secret exposure.
- High: Strong exploitation path with meaningful impact.
- Medium: Real weakness with constrained exploitability.
- Low: Hardening gaps and defence-in-depth issues.

## Review Priorities

- Authentication and authorisation correctness:
  - Verify access checks are enforced server-side.
  - Flag missing tenant or ownership checks on resource access.
- Input validation and output encoding:
  - Flag injection paths (SQL/NoSQL/command/template/LDAP/path traversal).
  - Flag unsafe HTML rendering or output generation that can lead to XSS.
- Secret and key management:
  - Flag hardcoded secrets, tokens, private keys, and connection strings.
  - Ensure secrets are loaded from secure stores or environment variables.
- Cryptography and transport:
  - Flag weak crypto (MD5/SHA1, ECB, custom crypto, insecure random generators).
  - Verify TLS usage and certificate validation are not bypassed.
- Data protection and logging:
  - Flag sensitive data in logs, errors, telemetry, or client responses.
  - Verify PII and credentials are redacted.
- Dependency and supply-chain risk:
  - Flag known-vulnerable or unpinned dependencies where lockfiles are expected.
  - Highlight risky install scripts or untrusted artifact sources.

## Language and Platform Checks

- Python:
  - Flag usage of eval, exec, pickle.loads on untrusted input, and shell=True patterns.
  - Check Flask/FastAPI/Django routes for missing authz and validation.
- JavaScript/TypeScript:
  - Flag eval/new Function, unsafe child_process usage, and direct DOM injection.
  - Check Express handlers for input validation and auth middleware coverage.
- C#/.NET:
  - Check for insecure deserialisation and unsafe process execution.
  - Verify anti-forgery, model validation, and policy-based authorisation where applicable.
- Java:
  - Flag deserialisation risks, command execution paths, and weak crypto APIs.
  - Verify security filters/interceptors are consistently applied.
- Terraform:
  - Flag public exposure of resources handling sensitive data.
  - Enforce least privilege IAM, encryption at rest, and private networking where possible.
  - Flag secrets in code/state outputs and plaintext variables.

## Review Output Format

For each finding include:

- Severity: Critical, High, Medium, or Low.
- Location: file and line reference.
- Impact: what an attacker can achieve.
- Evidence: short proof path from source to sink.
- Remediation: concrete fix or safer pattern.

If no issues are found, explicitly state: "No security findings identified in reviewed scope," then list residual risks or test gaps.