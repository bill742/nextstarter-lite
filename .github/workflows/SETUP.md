# Code Review GitHub Action - Setup Guide

Quick guide to get the Code Review action working in your repository.

---

## ✅ Prerequisites

- [x] GitHub repository
- [x] `.skills/review-code.sh` script present
- [x] `.node-version` file exists
- [x] `package.json` with `npm ci` support

All prerequisites are already met! ✓

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Verify Files Exist

```bash
# Check workflow file
ls -la .github/workflows/ci.yml

# Check review script
ls -la .skills/review-code.sh

# Ensure script is executable
chmod +x .skills/review-code.sh
```

### Step 2: Commit and Push

```bash
git add .github/workflows/ci.yml
git add .skills/review-code.sh
git commit -m "Add code review GitHub Action"
git push origin main
```

### Step 3: Verify Workflow

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Look for **CI** in the workflows list (code review is its `code-review` job)
4. You should see it running (or completed)

**That's it!** The workflow is now active.

---

## 🎯 Test It Out

### Create a Test Pull Request

```bash
# Create a test branch
git checkout -b test-code-review

# Make a small change
echo "// Test" >> src/app/page.tsx

# Commit and push
git add .
git commit -m "Test code review workflow"
git push origin test-code-review

# Create PR on GitHub
# The workflow will automatically run and comment!
```

### Or Trigger Manually

1. Go to **Actions** tab
2. Select **CI** workflow
3. Click **Run workflow** dropdown
4. Select branch (default: main)
5. Click **Run workflow** button
6. Watch it execute!

---

## 📊 What Happens When It Runs

### On Every Push to Main

```
Trigger: Push to main
    ↓
1. Checkout code
2. Setup Node.js
3. Install dependencies (npm ci)
4. Run review script
5. Generate report
6. Upload artifact
7. Set job summary
8. ✅ Pass or ❌ Fail
```

### On Every Pull Request

```
Trigger: PR created/updated
    ↓
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Run review script
5. Generate report
6. Upload artifact
7. Comment on PR with results ← NEW!
8. Set job summary
9. ✅ Pass or ❌ Fail
```

---

## 🔧 Configuration Options

### Make Review Required (Optional)

Force code review to pass before merging:

**GitHub Settings:**
1. Go to **Settings** → **Branches**
2. Click **Add rule** or edit existing rule for `main`
3. Check ☑️ **Require status checks to pass before merging**
4. Search for "Review code against AGENTS.md"
5. Check it ☑️
6. Click **Save changes**

**Effect:**
- PRs cannot be merged if review finds errors
- "Merge" button will be disabled
- Shows required check status on PR

### Change When It Runs

Edit the `on:` block of `.github/workflows/ci.yml` (it applies to every job):

```yaml
on:
  push:
    branches: ["main", "develop"]  # Add more branches
  pull_request:
    branches: ["main"]
  schedule:
    - cron: '0 9 * * 1'  # Add: Every Monday at 9 AM UTC
```

### Adjust Failure Conditions

Currently: Errors = fail, Warnings = pass

To make warnings fail too, edit workflow:

```yaml
# Find this section and change:
if [ "$ERRORS" -gt 0 ] || [ "$WARNINGS" -gt 0 ]; then
  echo "STATUS=failure" >> $GITHUB_OUTPUT
  exit 1
fi
```

---

## 📱 Notifications

### Enable GitHub Notifications

Get notified when workflows fail:

1. **Settings** → **Notifications**
2. Scroll to **Actions**
3. Choose notification preference:
   - ☑️ Only notify for failed workflows
   - ☑️ Send notifications to email
   - ☑️ Send web notifications

### Slack Integration (Optional)

Add to workflow file:

```yaml
- name: Notify Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "Code Review Failed on ${{ github.repository }}"
      }
```

---

## 🎨 Customization

### Badge for README

Add status badge to your README.md:

```markdown
![Code Review](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml/badge.svg)
```

Replace `YOUR_USERNAME` and `YOUR_REPO`.

**Result:**  
![Code Review](https://img.shields.io/badge/code%20review-passing-brightgreen)

### Custom PR Comment Format

Edit the `Comment on PR` step in workflow to customize message format.

---

## 🐛 Troubleshooting

### Workflow Not Appearing

**Problem:** Don't see "CI" in Actions tab

**Solutions:**
1. Check file is in `.github/workflows/`
2. Ensure file has `.yml` extension
3. Push to default branch first
4. Wait 1-2 minutes for GitHub to detect

### Permission Errors

**Problem:** `Resource not accessible by integration`

**Solution:** Workflow already has correct permissions configured. If still failing:
1. Check repository settings
2. **Settings** → **Actions** → **General**
3. Ensure "Read and write permissions" is enabled

### Script Not Found

**Problem:** `bash: .skills/review-code.sh: No such file or directory`

**Solution:**
```bash
# Verify script exists
ls -la .skills/review-code.sh

# If missing, create it or check git tracking
git add .skills/review-code.sh
git commit -m "Add review script"
git push
```

### Node Version Issues

**Problem:** Node version mismatch

**Solution:**
```bash
# Check your .node-version file
cat .node-version

# Ensure it matches supported versions
# Update if needed
echo "20" > .node-version
```

---

## 📈 Monitoring

### View Workflow Runs

**Actions Tab → Code Review:**
- Green ✅ = Passed
- Red ❌ = Failed
- Yellow ⏸️ = Running

**Click a run to see:**
- Detailed logs
- Step-by-step execution
- Error messages
- Download artifacts

### Workflow Insights

**Actions Tab → Click workflow name:**
- Success/failure rate
- Average run duration
- Recent runs history

---

## 💾 Artifacts

### Accessing Reports

Every run creates an artifact:

1. Go to workflow run
2. Scroll to **Artifacts** section at bottom
3. Click **code-review-report** to download
4. Unzip and view `code-review-report.md`

**Retention:** 30 days (configurable)

---

## 🔐 Security

### Tokens

- Uses built-in `GITHUB_TOKEN` automatically
- No secrets needed!
- Token has limited scope (read code, write comments)

### Permissions

Minimal permissions configured:
```yaml
permissions:
  contents: read        # Read repository code
  pull-requests: write  # Comment on PRs
  issues: write        # Create issues if needed
```

### Trust

All actions used are official GitHub actions:
- ✅ `actions/checkout@v4`
- ✅ `actions/setup-node@v4`
- ✅ `actions/upload-artifact@v4`
- ✅ `actions/github-script@v7`

---

## 📚 Next Steps

Now that setup is complete:

1. ✅ **Test the workflow** - Create a test PR
2. 📖 **Read full docs** - See [README.md](./README.md)
3. 🛡️ **Enable branch protection** - Make review required
4. 🎨 **Add status badge** - Show status in README
5. 🔔 **Configure notifications** - Stay informed

---

## 🆘 Getting Help

**Documentation:**
- [Workflow README](./README.md) - Complete reference
- [Skills README](../../.skills/README.md) - Review script docs
- [AGENTS.md](../../AGENTS.md) - Coding guidelines

**Issues:**
- Workflow problems → GitHub Issues
- Script issues → Test locally first
- GitHub Actions docs → https://docs.github.com/actions

---

## ✨ Success!

Your code review workflow is now active and will automatically review all code changes against your AGENTS.md guidelines!

**Test it now:**
```bash
git checkout -b test-branch
echo "// test" >> src/app/page.tsx
git add .
git commit -m "Test workflow"
git push origin test-branch
# Create PR and watch the magic! ✨
```

---

Last Updated: 2026-02-04
