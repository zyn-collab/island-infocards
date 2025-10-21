# Maldives Islands Information Website

A simple, clean website to explore detailed information about Maldivian islands.

## Quick Start - Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to this folder and deploy:
   ```bash
   cd "c:\Users\User\OneDrive\Desktop\Policy Lab\Island Level Dataset\cards website"
   vercel
   ```

3. Done! Your site will be live at `https://your-project-name.vercel.app`

See `DEPLOYMENT.md` for more details.

## How to Use the Website

Once deployed, visit your Vercel URL and:

1. **Select an island** using one of two methods:
   - **Search**: Type the island name in the search box to quickly find it
   - **Dropdown**: Select an atoll first, then choose an island from that atoll

2. **View information**: Once you select an island, a detailed card will appear with all available information including:
   - Geographic information (size, coordinates, capital status)
   - Travel and distance information
   - Demographics (2022 data with changes from 2014)
   - Labor force statistics
   - Household statistics
   - Health facilities
   - Social services
   - Education statistics
   - Contact information
   - Activities and things to do
   - Accommodations (resorts, guesthouses)
   - Civil Society Organizations (CSOs)

## Files Included

- `index.html` - Main HTML file
- `app.js` - JavaScript for data loading and display
- `styles.css` - Custom CSS styling
- `vercel.json` - Vercel configuration
- All CSV data files (*.csv)

## Requirements

- Node.js with npm (for Vercel deployment)
  - Download from: https://nodejs.org/
- Internet connection (required for deployment and website usage)

## Troubleshooting

**Problem: "Failed to load data" on Vercel**
- Check browser console (F12) for specific error messages
- Ensure all CSV files were uploaded/deployed
- See `DEPLOYMENT.md` for detailed troubleshooting

**Problem: Vercel CLI not found**
- Install Node.js from https://nodejs.org/
- Run `npm install -g vercel` again
- Restart your terminal/command prompt

## Notes

- All data is loaded from CSV files in the same directory
- The website uses Bootstrap 5 for styling and PapaParse for CSV parsing
- Designed for Vercel deployment (free hosting)
- Population changes are calculated automatically from 2014 and 2022 data
- All numbers are formatted cleanly (no unnecessary decimals)

## Data Sources

The website displays data from the following CSV files:
- Island master data
- Atoll master data
- Demographics (2014 and 2022)
- Labor force statistics
- Household information
- Activities and attractions
- Services and contacts
- Health facilities
- Social services
- School statistics
- CSO organizations and locations
- Island distances and travel information
- Accommodations (resorts and guesthouses)

Enjoy exploring the Maldives islands!

---

## Deploying to Vercel

Want to put this website online? See **DEPLOYMENT.md** for complete instructions on deploying to Vercel (free hosting).

Quick steps:
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel` in this folder
3. Follow the prompts
4. Done! Your site is live.

Or use the Vercel website to drag-and-drop deploy.
