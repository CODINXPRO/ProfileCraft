# 🚀 Quick GitHub Pages Deployment Guide

## 5-Minute Setup

### Step 1: Initialize Git
```bash
cd c:\Users\ASUS\Desktop\ACHRAF\newproject
git init
git add .
git commit -m "Initial commit: ProfileCraft Pro"
```

### Step 2: Create Repository on GitHub
1. Go to [github.com/new](https://github.com/new)
2. Name it: `newproject`
3. Set as **Public** (for free GitHub Pages) or **Private** (with GitHub Pro)
4. Click **Create repository**

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/newproject.git
git branch -M master
git push -u origin master
```

### Step 4: Enable GitHub Pages
1. Go to **Settings → Pages** on your GitHub repo
2. Select Branch: `gh-pages`
3. Click **Save**

### Step 5: Wait for Deployment
- GitHub Actions will automatically build and deploy
- Check the **Actions** tab for progress
- Site will be ready at: `https://YOUR_USERNAME.github.io/newproject/`

## That's It! 🎉

Your ProfileCraft Pro is now live on GitHub Pages!

## Alternative: Manual Deployment

If automatic deployment doesn't work:

```bash
npm run build
git add dist -f
git commit -m "Manual deployment build"
git push origin master
```

## Troubleshooting

### "Page not found" after deployment?
- Wait 2-3 minutes for GitHub to process
- Check repository **Settings → Pages** is enabled
- Verify you're using the correct URL: `github.com/USERNAME/newproject/`

### Changes not showing up?
- Check Actions tab - build may have failed
- Look at workflow logs for errors
- Try `npm run lint` and `npm run build` locally first

### Custom Domain?
Edit `.github/workflows/deploy.yml` and change:
```yaml
cname: your-domain.com
```

---

**Questions?** See `GITHUB_DEPLOYMENT.md` for detailed instructions.
