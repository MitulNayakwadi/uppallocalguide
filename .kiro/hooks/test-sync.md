---
name: "Test Sync"
description: "Automatically run tests when code changes are saved"
trigger:
  event: "file_save"
  pattern: "**/*.{js,jsx,ts,tsx}"
action:
  type: "command"
  command: "npm test -- --passWithNoTests"
  workingDirectory: "."
---

# Test Sync Hook

This hook automatically runs the test suite whenever JavaScript or TypeScript files are saved, ensuring code quality and catching issues early in development.

## Trigger Conditions
- Runs on file save events
- Monitors all JS/JSX/TS/TSX files in the project
- Excludes node_modules and build directories

## Actions Performed
1. Runs Jest test suite with `--passWithNoTests` flag
2. Displays test results in the terminal
3. Highlights any failing tests or coverage issues

## Benefits
- Immediate feedback on code changes
- Prevents broken code from being committed
- Maintains test coverage standards
- Reduces debugging time