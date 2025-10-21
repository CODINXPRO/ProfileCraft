# GitHub Pages Deployment Guide

## Quick Start

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Prerequisites
- GitHub account with Pro plan (required for GitHub Actions on private repos)
- Git installed locally
- Node.js 18+ installed

### Deployment Steps

#### 1. Initialize Git Repository (if not already done)
```bash
cd c:\Users\ASUS\Desktop\ACHRAF\newproject
git init
git add .
git commit -m "Initial commit: ProfileCraft Pro - Feature-rich GitHub header generator"
```

#### 2. Create GitHub Repository
- Go to [github.com/new](https://github.com/new)
- Create a repository named `newproject` (or your preferred name)
- **Do NOT initialize with README, .gitignore, or license** (we already have these)

#### 3. Connect Local Repository to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/newproject.git
git branch -M master
git push -u origin master
```

#### 4. Enable GitHub Pages
1. Go to your repository settings on GitHub
2. Navigate to **Settings → Pages**
3. Under "Source", select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

#### 5. Configure Branch Protection (Optional)
1. Go to **Settings → Branches**
2. Add rule for `master` branch
3. Require status checks to pass before merging

### Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
1. Trigger on every push to `master` branch
2. Install dependencies
3. Run linting
4. Build the project
5. Deploy to GitHub Pages automatically

**Your site will be live at:** `https://YOUR_USERNAME.github.io/newproject/`

### Manual Deployment (If Needed)

```bash
npm run build
git add dist -f
git commit -m "Build for deployment"
git push origin master
```

### Environment Variables (Optional)

If you need environment variables:
1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add any secrets your build needs

### Custom Domain (Optional)

To use a custom domain like `profilecraft.dev`:
1. Update the `cname` field in `.github/workflows/deploy.yml`
2. Point your domain's DNS to GitHub Pages
3. GitHub will automatically create `CNAME` file

### Troubleshooting

**Site not showing up after push?**
- Wait 2-3 minutes for GitHub Actions to complete
- Check **Actions** tab for workflow status
- Verify Pages settings are configured correctly

**Build failures?**
- Check the Actions tab for error logs
- Verify `npm run lint` and `npm run build` pass locally
- Check Node.js version compatibility

**Static assets not loading?**
- Ensure `base: '/newproject/'` is correct in `vite.config.ts`
- Replace `newproject` with your actual repository name

### Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── data/
│   │   ├── animations.ts       # 30+ animations
│   │   ├── fonts.ts            # 30+ fonts
│   │   ├── particles.ts        # 15+ particle effects
│   │   ├── backgrounds.ts      # 25+ backgrounds
│   │   └── templates.ts        # 35+ templates
│   ├── App.tsx                 # Main application
│   ├── main.tsx
│   └── App.css
├── vite.config.ts              # Configured for GitHub Pages
├── package.json
└── README.md
```

### Features Included

✅ **30+ Text Animations** - Entrance, continuous, and special effects
✅ **30+ Fonts** - Organized by personality (Professional, Creative, Techy, etc.)
✅ **15+ Particle Effects** - Customizable density, speed, size, and behaviors
✅ **25+ Backgrounds** - Gradients, patterns, and animated effects
✅ **35+ Templates** - Diverse, pre-designed templates across 5 categories
✅ **Multi-Layer Text** - Up to 5 independent text layers with full customization
✅ **Real-time Preview** - See changes instantly
✅ **Export to PNG** - Download your creation with html2canvas
✅ **Dark Modern UI** - Beautiful, responsive interface
✅ **Keyboard Shortcuts** - Ctrl+S (export), Ctrl+R (randomize), Space (play), Ctrl+Z (undo)

### Support

For issues with GitHub Pages deployment, check:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- This repository's [Issues](https://github.com/YOUR_USERNAME/newproject/issues)

---

**Deploy with confidence!** 🚀
