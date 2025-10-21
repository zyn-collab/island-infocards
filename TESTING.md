# Testing Instructions

## Before Deploying to Vercel

**YOU MUST TEST LOCALLY FIRST!**

### Step 1: Start Local Server

Run `START_SERVER.bat` (Windows) or `python -m http.server 8000` (Mac/Linux)

### Step 2: Open Browser

Go to `http://localhost:8000`

### Step 3: Open Developer Console

Press **F12** to open browser developer tools, then click on the **Console** tab

### Step 4: Verify Data Loading

You should see console messages like:

```
Starting to load data from: http://localhost:8000
✓ Loaded atolls: 21 records from http://localhost:8000/00_atoll_master.csv
✓ Loaded islands: 189 records from http://localhost:8000/01_islands_core.csv
✓ Loaded demographics2022: 189 records from http://localhost:8000/02_demographics_2022.csv
...
✓ All data loaded successfully
Data summary: {atolls: 21, islands: 189, demographics2022: 189, activities: 1284, accommodations: 9831}
```

**If you see any "✗ Error loading" messages, DO NOT PROCEED TO VERCEL!**

### Step 5: Test Atoll Dropdown

1. Look at the "Select Atoll" dropdown
2. It should be populated with atoll names
3. Select any atoll (e.g., "Kaafu (K)")

**If dropdown is empty, check console for errors**

### Step 6: Test Island Dropdown

1. After selecting an atoll, the "Select Island" dropdown should enable
2. It should show islands from that atoll
3. Select any island

**If dropdown stays disabled or empty, check console for errors**

### Step 7: Test Island Data Display

1. After selecting an island, a detailed card should appear below
2. Verify you see sections for:
   - Geographic Information
   - Distance & Travel Information
   - Demographics (2022 Census)
   - Labor Force Statistics
   - Household Statistics
   - Health Facilities
   - Social Services
   - Schools
   - School Statistics
   - Accommodations
   - Activities & Things To Do
   - Civil Society Organizations

3. Check console for messages showing data was found:
   ```
   Island ID: 96 (normalized: 96)
   Health Facilities: 2
   Social Services: 1
   School Stats: Found
   Schools: 3
   Accommodations: 45
   CSOs: 12
   ```

**If sections are missing or show only "N/A", check console for which datasets failed to load**

### Step 8: Test Search

1. Type an island name in the search box (e.g., "Male")
2. Matching islands should appear in dropdown below search box
3. Click on one to view its data

**If search doesn't work, check console for errors**

## All Tests Pass?

✅ **If ALL tests above pass**, you can proceed to deploy to Vercel

❌ **If ANY test fails**, do NOT deploy. Check:
- Are all CSV files in the same folder as index.html?
- Is your local server running from the correct directory?
- Are there any error messages in the console?

## After Deploying to Vercel

**Repeat ALL the same tests on your Vercel URL!**

The Vercel version must work exactly the same as the local version.

## Common Issues

**"Failed to load data"**
- CSV files are missing or in wrong location
- Check that all 16 CSV files are in the project root

**Atoll dropdown empty**
- `00_atoll_master.csv` or `01_islands_core.csv` didn't load
- Check console for which file failed

**Islands dropdown empty after selecting atoll**
- `01_islands_core.csv` didn't load or has no data
- Check console log: should show "✓ Loaded islands: 189 records"

**Island card shows mostly "N/A"**
- Other CSV files didn't load
- Check console for "✗ Error loading" messages
- Verify island_id matching by checking debug console logs

**Numbers showing as decimals (14.0 instead of 14)**
- This should be fixed now
- If still happening, clear browser cache and reload

