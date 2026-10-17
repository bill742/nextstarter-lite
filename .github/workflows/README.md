# GitHub Actions Workflows

This directory contains automated workflows for the Next.js Boilerplate project.

Every check runs as a job in a single workflow, `ci.yml`, which defines the shared
site environment variables, checkout, Node setup (from `.node-version`) and
`npm ci` steps once. The only exception is `scaffold.yml`, which stays separate
because `.nextstarter/apply.mjs` deletes it from the projects it creates.

---

## Available Workflows

### 1. ESLint (`ci.yml` → `eslint` job)

**Purpose:** Runs ESLint scanning for code quality and security issues

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch
- Scheduled: Weekly on Fridays at 11:25 PM UTC

**What it does:**
- Checks JavaScript/TypeScript code for linting issues
- Uploads results to GitHub Security tab
- Uses SARIF format for detailed reporting

---

### 2. Code Review (`ci.yml` → `code-review` job)

**Purpose:** Automatically reviews code against AGENTS.md guidelines

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch
- Manual trigger via "Run workflow" button

**What it does:**
1. ✅ Runs comprehensive code review script
2. 📊 Checks 6 categories:
   - Naming conventions (kebab-case)
   - Component structure (displayName, arrow functions)
   - JSDoc documentation
   - React best practices (array keys)
   - Function style
   - ESLint compliance
3. 📝 Generates detailed markdown report
4. 💬 Comments on pull requests with results
5. 📎 Uploads report as artifact (30-day retention)
6. ❌ Fails workflow if critical errors found
7. ⚠️ Allows warnings (non-blocking)

**Permissions Required:**
- `contents: read` - Read repository code
- `pull-requests: write` - Comment on PRs
- `issues: write` - Create issues if needed

---

## Code Review Workflow Details

### When It Runs

**Automatically:**
- Every push to `main` branch
- Every pull request targeting `main`

**Manually:**
- Go to "Actions" tab → "CI" → "Run workflow" (runs every job)

### What You'll See

#### On Pull Requests

The workflow will add/update a comment like this:

```markdown
## ✅ Code Review Results

**Status:** All checks passed!

<details>
<summary>📄 Full Report</summary>

# Code Review Report
...full report here...

</details>
```

#### In GitHub Actions UI

1. **Summary Tab** - Shows pass/fail status
2. **Artifacts** - Download `code-review-report.md`
3. **Logs** - View detailed execution

### Exit Codes

- **Exit 0** (Success) - No errors found (warnings OK)
- **Exit 1** (Failure) - Critical errors found

### Examples

**All Clear:**
```
✅ All checks passed! Code is compliant with AGENTS.md

Total Files: 11
Errors: 0
Warnings: 0
```

**With Warnings:**
```
⚠️ Found 2 warning(s)

Total Files: 11
Errors: 0
Warnings: 2

Workflow continues (non-blocking)
```

**With Errors:**
```
❌ Found 3 error(s)

Total Files: 11
Errors: 3
Warnings: 1

Workflow fails (blocks merge if required)
```

---

## Configuration

### Making Code Review Required

To require code review to pass before merging:

1. Go to **Settings** → **Branches**
2. Add/edit branch protection rule for `main`
3. Enable "Require status checks to pass"
4. Select "Review code against AGENTS.md"
5. Save changes

### Adjusting Triggers

Edit the `on:` block of `.github/workflows/ci.yml` (it applies to every job):

```yaml
on:
  push:
    branches: ["main", "develop"]  # Add more branches
  pull_request:
    branches: ["main"]
  schedule:
    - cron: '0 0 * * 1'  # Add weekly schedule (Mondays at midnight)
```

### Modifying Review Checks

The workflow runs `.skills/review-code.sh`. To adjust checks:

1. Edit `.skills/review-code.sh`
2. Add/remove check sections
3. Commit and push changes
4. Workflow will use updated script

---

## Troubleshooting

### Workflow Not Running

**Check:**
- Workflow file is in `.github/workflows/`
- YAML syntax is valid
- Branch name matches trigger configuration

**Solution:**
```bash
# Validate locally
bash .skills/review-code.sh
```

### Permission Denied

**Error:** `Permission denied: .skills/review-code.sh`

**Solution:**
```bash
chmod +x .skills/review-code.sh
git add .skills/review-code.sh
git commit -m "Make review script executable"
git push
```

### Failed to Comment on PR

**Error:** `Resource not accessible by integration`

**Cause:** Missing permissions

**Solution:** Ensure workflow has `pull-requests: write` permission (already configured)

### Node Version Mismatch

**Error:** `Expected version X, got Y`

**Solution:** Update `.node-version` file or workflow `node-version` parameter

---

## Artifacts

### Downloading Reports

1. Go to workflow run
2. Scroll to "Artifacts" section
3. Click "code-review-report" to download
4. Extract and view `code-review-report.md`

### Retention

- Reports are kept for **30 days**
- Configurable in workflow file (`retention-days`)

---

## Local Testing

Before pushing, test locally:

```bash
# Run code review
bash .skills/review-code.sh

# Check report
cat code-review-report.md

# Run ESLint
npm run lint
```

---

## Workflow Files Reference

| File | Purpose | Triggers |
|------|---------|----------|
| `ci.yml` → `eslint` | Lint JavaScript/TypeScript (SARIF) | Push, PR, Weekly, Manual |
| `ci.yml` → `supply-chain` | Verify signatures, audit advisories | Push, PR, Weekly, Manual |
| `ci.yml` → `typecheck` | `next typegen`, then `npm run typecheck` | Push, PR, Manual |
| `ci.yml` → `code-review` | Review against AGENTS.md | Push, PR, Manual |
| `ci.yml` → `react-doctor` | React Doctor scan | Push, PR |
| `ci.yml` → `playwright` | Build and run Playwright tests | Push, PR, Manual |
| `ci.yml` → `lighthouse` | Lighthouse CI, mobile and desktop | Push, PR, Manual |
| `scaffold.yml` | Apply and test both starter modes | Push, PR |

---

## Best Practices

### For Contributors

1. **Run locally first** - Test before pushing
   ```bash
   bash .skills/review-code.sh
   ```

2. **Fix errors, review warnings** - Errors block merge, warnings don't

3. **Check PR comments** - Review automated feedback

4. **Download reports** - Keep for reference if needed

### For Maintainers

1. **Monitor workflow runs** - Check Actions tab regularly

2. **Update AGENTS.md** - Keep guidelines current

3. **Adjust script** - Modify checks as project evolves

4. **Set branch protection** - Require reviews before merge

---

## Security

### Secrets

This workflow uses built-in `GITHUB_TOKEN` - no additional secrets needed.

### Permissions

Follows principle of least privilege:
- Read-only access to code
- Write access only for comments/issues

### Dependencies

Uses official GitHub Actions:
- `actions/checkout@v4`
- `actions/setup-node@v4`
- `actions/upload-artifact@v4`
- `actions/github-script@v7`

---

## Future Enhancements

Potential improvements:

- [ ] Add annotations to specific lines of code
- [ ] Generate GitHub Issues for persistent errors
- [ ] Track metrics over time
- [ ] Auto-fix certain issues
- [ ] Integration with other tools (Prettier, etc.)

---

## Support

- **Issues:** Report workflow problems in GitHub Issues
- **Documentation:** See [AGENTS.md](../../AGENTS.md) for coding guidelines
- **Script:** See [.skills/README.md](../../.skills/README.md) for review script details

---

Last Updated: 2026-02-04
