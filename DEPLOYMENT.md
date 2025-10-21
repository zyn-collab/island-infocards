# Deploying to Vercel

## Quick Deployment Steps

### Option 1: Deploy via Vercel Website (Easiest)

1. **Create a Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Deploy Your Project**
   - Click "Add New" → "Project"
   - If using Git:
     - Connect your repository
     - Vercel will auto-detect the settings
     - Click "Deploy"
   - If NOT using Git:
     - Install Vercel CLI (see Option 2)

3. **Done!**
   - Your site will be live at: `https://your-project-name.vercel.app`
   - Vercel automatically handles all the server requirements

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to your project folder**
   ```bash
   cd "c:\Users\User\OneDrive\Desktop\Policy Lab\Island Level Dataset\cards website"
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - First time: You'll be asked to log in
   - Follow the prompts:
     - "Set up and deploy?" → Yes
     - "Which scope?" → Your account
     - "Link to existing project?" → No
     - "Project name?" → Choose a name (e.g., maldives-islands)
     - Accept other defaults
   
4. **Done!**
   - Your site is now live!
   - You'll get a URL like: `https://maldives-islands.vercel.app`

### Option 3: Using Git (Recommended for Updates)

1. **Initialize Git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub repository**
   - Go to https://github.com/new
   - Create a new repository
   - Don't initialize with README (you already have files)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

4. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Click "Deploy"

5. **Automatic Updates**
   - Every time you push to GitHub, Vercel auto-deploys!
   - Just run: `git add .`, `git commit -m "message"`, `git push`

## Configuration Files Included

- **vercel.json** - Tells Vercel how to build and serve your site
- **.vercelignore** - Excludes local-only files from deployment

## Important Notes

✅ **No build step needed** - Your site is pure HTML/CSS/JS
✅ **CSV files will work** - Vercel serves them as static files
✅ **No environment variables needed** - Everything is client-side
✅ **Free tier is sufficient** - Your site is lightweight

## Troubleshooting

**Problem: CSV files not loading**
- Make sure all CSV files are in the root directory with your HTML file
- Check browser console (F12) for any 404 errors

**Problem: Site works locally but not on Vercel**
- Check that all file paths in code are relative (no `C:\` or absolute paths)
- All our paths are relative, so this should work fine

**Problem: Need a custom domain**
- Go to your project in Vercel dashboard
- Click "Settings" → "Domains"
- Add your custom domain and follow DNS instructions

## Updating Your Site

**If using Git + Vercel:**
```bash
# Make your changes to files
git add .
git commit -m "Updated island data"
git push
# Vercel automatically redeploys!
```

**If using Vercel CLI:**
```bash
vercel --prod
```

**If using Vercel website upload:**
- Just re-upload your folder through the website

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions

---

Your Maldives Islands website is ready for the world! 🌴🏝️

