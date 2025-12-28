---
name: "Security Scan"
description: "Run security audit when package.json changes"
trigger:
  event: "file_save"
  pattern: "**/package.json"
action:
  type: "command"
  command: "npm audit --audit-level=moderate"
  workingDirectory: "."
---

# Security Scan Hook

This hook automatically runs a security audit whenever package.json files are modified, helping identify and address security vulnerabilities in dependencies.

## Trigger Conditions
- Runs when any package.json file is saved
- Monitors both root and subdirectory package files
- Activates on dependency additions, updates, or removals

## Actions Performed
1. Runs `npm audit` with moderate severity threshold
2. Reports any security vulnerabilities found
3. Suggests fixes for identified issues
4. Displays audit summary in terminal

## Benefits
- Early detection of security vulnerabilities
- Automated security monitoring
- Prevents vulnerable dependencies from being deployed
- Maintains security best practices