---
name: "Documentation Update"
description: "Update API documentation when route files change"
trigger:
  event: "file_save"
  pattern: "backend/routes/*.js"
action:
  type: "message"
  message: "Route files have been updated. Please review and update API documentation in docs/api/ if needed."
---

# Documentation Update Hook

This hook reminds developers to update API documentation whenever backend route files are modified, ensuring documentation stays in sync with code changes.

## Trigger Conditions
- Runs when any file in `backend/routes/` is saved
- Monitors JavaScript route definition files
- Activates on both new files and modifications

## Actions Performed
1. Sends a reminder message to update documentation
2. Suggests reviewing the docs/api/ directory
3. Prompts to check if new endpoints need documentation

## Benefits
- Keeps API documentation current
- Prevents documentation drift
- Improves developer experience
- Maintains project quality standards