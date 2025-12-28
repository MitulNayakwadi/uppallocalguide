---
name: "Cost Check"
description: "Manual hook to review potential cloud costs"
trigger:
  event: "manual"
action:
  type: "message"
  message: "Reviewing cloud service costs and usage patterns. Check Supabase usage, Vercel bandwidth, and any API rate limits to optimize costs."
---

# Cost Check Hook

This manual hook helps developers review and optimize cloud service costs by providing reminders to check usage patterns and billing information.

## Trigger Conditions
- Manual activation only
- Run before deployments or monthly reviews
- Useful during scaling decisions

## Actions Performed
1. Reminds to check Supabase database usage
2. Reviews Vercel deployment and bandwidth costs
3. Monitors API rate limits and usage
4. Suggests cost optimization strategies

## Benefits
- Prevents unexpected cloud bills
- Encourages cost-conscious development
- Helps optimize resource usage
- Maintains budget awareness

## When to Use
- Before major deployments
- Monthly cost reviews
- When adding new features that may increase usage
- During performance optimization sessions