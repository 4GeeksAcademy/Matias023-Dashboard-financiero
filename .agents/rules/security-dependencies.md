# Security and Dependencies Rules

## Purpose

Define practical guardrails for security-sensitive configuration and dependency management in the current project scope.

## Rules

1. Treat open CORS as development-oriented behavior and do not expand it without explicit environment justification.
- Applies to: `backend/app/main.py`.
- Do: keep any CORS changes tied to a documented environment need.
- Validate: CORS config review is included in change summary when modified.

2. Do not represent `allow_origins=["*"]` as production-safe by default.
- Applies to: docs and reports (`README.md`, `README.es.md`, `context.md`, `engineering-analysis.md`).
- Do: describe it as current configuration, not as a security guarantee.
- Validate: wording avoids production-safety claims without dedicated assessment.

3. Pin Python dependency versions when updating backend requirements.
- Applies to: `backend/requirements.txt`.
- Do: replace unpinned entries with explicit versions during dependency updates.
- Validate: file shows pinned versions and `docker compose exec -T backend pytest -q` passes.

4. Review and report warnings/deprecations when changing FastAPI, Starlette, httpx, or pytest-related dependencies.
- Applies to: `backend/requirements.txt`, backend test execution output.
- Do: run backend tests and include warnings in report.
- Validate: command output includes explicit warning review.

5. Never commit secrets, tokens, or credentials.
- Applies to: all files and environment handling.
- Do: keep sensitive values out of repository files.
- Validate: use environment-variable based configuration when sensitive values appear in future phases.

6. Use environment variables for sensitive settings when new sensitive configuration is introduced.
- Applies to: future config additions across frontend/backend.
- Do: avoid hardcoding secrets in source or markdown.
- Validate: sensitive config values are sourced from environment, not literals in tracked files.

7. Do not claim the system is secure or production-ready without a dedicated security validation phase.
- Applies to: all project documentation and status reports.
- Do: keep readiness claims aligned with verified scope.
- Validate: no production-security claims appear without explicit supporting evidence.
