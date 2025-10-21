# Maldives Islands Information Website

A simple, clean website to explore detailed information about Maldivian islands.

## How to Use

### Easy Method (Recommended):

**For Windows:**
1. Double-click `START_SERVER.bat` (requires Python) OR `START_SERVER_NODE.bat` (requires Node.js)
2. Wait for the server to start
3. Open your browser and go to `http://localhost:8000`
4. Press Ctrl+C in the command window when done to stop the server

**For Mac/Linux:**
1. Open Terminal in this folder
2. Run: `python -m http.server 8000` (Python 3) or `python -m SimpleHTTPServer 8000` (Python 2)
3. Open your browser and go to `http://localhost:8000`
4. Press Ctrl+C in Terminal when done

### Why do I need a server?

Modern browsers block loading local CSV files directly for security reasons. A local server solves this issue. Don't worry - it's completely safe and runs only on your computer!

2. **Select an island** using one of two methods:
   - **Search**: Type the island name in the search box to quickly find it
   - **Dropdown**: Select an atoll first, then choose an island from that atoll

3. **View information**: Once you select an island, a detailed card will appear with all available information including:
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
   - Civil Society Organizations (CSOs)

## Files Included

- `index.html` - Main HTML file
- `app.js` - JavaScript for data loading and display
- `styles.css` - Custom CSS styling
- All CSV data files (*.csv)

## Requirements

- A modern web browser with JavaScript enabled
- Internet connection (for loading Bootstrap and PapaParse libraries from CDN)
- Python (any version) OR Node.js installed (for running the local server)
  - Most computers already have Python installed
  - Download Python from: https://www.python.org/downloads/
  - Download Node.js from: https://nodejs.org/

## Troubleshooting

**Problem: "Failed to load data" error**
- **Solution**: You must run the website through a local server (use the START_SERVER.bat files)
- Do NOT open index.html directly by double-clicking it
- Browsers block loading local CSV files for security reasons

**Problem: "Python/Node.js not found"**
- **Solution**: Install Python from https://www.python.org/downloads/
- During installation, check "Add Python to PATH"
- After installing, restart your computer and try again

**Problem: Port 8000 already in use**
- **Solution**: Edit the batch file and change 8000 to another number (like 8080 or 3000)

## Notes

- All data is loaded from CSV files in the same directory
- The website uses Bootstrap 5 for styling and PapaParse for CSV parsing
- Must be run through a local server (see instructions above)
- Population changes are calculated automatically from 2014 and 2022 data

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

