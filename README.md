# Miniapp Project Readiness Audit

A small, dependency-free command-line check for reusable miniapp project briefs. It catches the most common gap in template projects: a list of screens without the roles, business flow, permission boundary, abnormal paths, and acceptance evidence needed for a real delivery.

## What it checks

The input JSON must document six items:

| Field | Why it matters |
| --- | --- |
| `name` | Identifies the business scope being reviewed. |
| `roles` | Makes user, operator, and administrator responsibilities explicit. |
| `flows` | Records the end-to-end user and back-office path. |
| `permissions` | Prevents UI-only permission assumptions. |
| `exceptions` | Requires duplicate, expired-session, conflict, or failure paths. |
| `acceptance` | Defines evidence that the project can be handed over. |

## Run it

```bash
node audit-project.mjs example-project.json
```

The command prints structured JSON and exits with code `1` when required delivery evidence is missing. It can be used in a CI job before accepting a template into a project marketplace.

## Example output

```json
{
  "project": "Service booking miniapp",
  "passed": true,
  "issues": []
}
```

For a practical marketplace and mobile project-preview workflow, see [Togtok](https://www.togtok.com/). Use the tool as an initial document check; it does not replace runtime tests, security review, or industry-specific compliance work.

## License

MIT
