# Deploying to Vercel

## Quick Deployment Steps

### IMPORTANT: Test Locally First!

Before deploying to Vercel, test locally:
1. Run `START_SERVER.bat`
2. Open `http://localhost:8000`
3. Verify atolls load in dropdown
4. Verify islands appear when selecting an atoll
5. Verify island data displays when selecting an island
6. Check browser console (F12) for any errors

**If local test fails, DO NOT deploy to Vercel yet.**

### Option 1: Deploy via Vercel Website (Easiest)

1. **Create a Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Deploy Your Project**
   - Click "Add New" → "Project"
   - If using Git:
     - **IMPORTANT:** Make sure ALL CSV files are committed to Git
     - Connect your repository
     - Vercel will auto-detect the settings
     - Click "Deploy"
   - If NOT using Git:
     - Install Vercel CLI (see Option 2)

3. **Verify Deployment**
   - Wait for deployment to complete
   - Visit your site at: `https://your-project-name.vercel.app`
   - **IMMEDIATELY TEST:**
     - Open browser console (F12)
     - Check that atolls load
     - Select an atoll and verify islands appear
     - Select an island and verify data displays
   - If anything fails, check console for error messages

4. **Done!**
   - Your site should now work exactly like local version

### Option 2: Deploy via Vercel CLI (RECOMMENDED)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to your project folder**
   ```bash
   cd "c:\Users\User\OneDrive\Desktop\Policy Lab\Island Level Dataset\cards website"
   ```

3. **Test locally first!**
   - Run your local server and verify everything works
   - Only proceed if local version works perfectly

4. **Deploy**
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
   
5. **Verify immediately after deployment**
   - Open the provided URL in your browser
   - Press F12 to open console
   - Look for messages like "✓ Loaded atolls: 21 records"
   - Test atoll dropdown, island selection, and data display
   - If you see "✗ Error loading" messages, check that ALL CSV files were uploaded

6. **Done!**
   - Your site is now live at: `https://maldives-islands.vercel.app`

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

**Problem: "Failed to load data" on Vercel**
- **Solution 1:** Check browser console (F12) - you'll see which files failed to load
- **Solution 2:** Ensure ALL CSV files are in the project root (same folder as index.html)
- **Solution 3:** If using Git, make sure you committed and pushed ALL CSV files
- **Solution 4:** Redeploy with `vercel --prod` (CLI) or trigger redeploy in dashboard

**Problem: Atolls dropdown is empty**
- This means `00_atoll_master.csv` or `01_islands_core.csv` didn't load
- Check browser console for "✗ Error loading" messages
- Verify files exist on Vercel by checking deployment logs

**Problem: Console shows "✗ Error loading" messages**
- Open the failed URL shown in console (e.g., `https://yoursite.vercel.app/00_atoll_master.csv`)
- If you get 404, the file wasn't uploaded
- **Fix:** Redeploy ensuring ALL CSV files are included

**Problem: Site works locally but not on Vercel**
- Most likely cause: CSV files weren't uploaded
- **Fix for CLI:** Run `vercel --prod` again from the project directory
- **Fix for Git:** Check that `.gitignore` doesn't exclude CSV files, commit and push all CSVs
- **Fix for Website:** Re-upload entire folder including all CSV files

**Problem: Data displays but with many "N/A" values**
- Some data might not match between files (island_id mismatches)
- This is data quality issue, not deployment issue
- Check console logs to see how many records loaded for each dataset

**Problem: Need a custom domain**
- Go to your project in Vercel dashboard
- Click "Settings" → "Domains"
- Add your custom domain and follow DNS instructions

## Verification Checklist

After deployment, verify these in your browser console:

✓ Should see: `✓ Loaded atolls: 21 records`  
✓ Should see: `✓ Loaded islands: 189 records`  
✓ Should see: `✓ Loaded demographics2022: X records`  
✓ Should see: `✓ All data loaded successfully`  
✓ Atoll dropdown should populate  
✓ Selecting atoll should populate island dropdown  
✓ Selecting island should display full data card  

If ANY of these fail, check the troubleshooting section above.

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

