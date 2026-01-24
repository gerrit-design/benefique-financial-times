# The Benefique Financial Times - Implementation Guide

## Overview

The Benefique Financial Times (BFT) is a weekly "newspaper-style" financial report delivered to VIP clients every Saturday morning. It presents Fractional CFO metrics in a visual, mobile-friendly format designed for business owners (not accountants).

---

## Versions

### Version 1 (Current) - G-Accon Based
**Status**: PRODUCTION
**Data Source**: Google Sheets synced via g-accon from QuickBooks Online
**Last Updated**: January 23, 2026

Version 1 pulls financial data from Google Sheets that are automatically synced from QuickBooks Online using g-accon. This creates a reliable weekly snapshot for CFO analysis.

**Key Features (V1):**
- TTM (Trailing Twelve Month) metrics for stability
- Rule of 40 calculated on TTM basis (not monthly)
- TTM DSCR instead of volatile monthly DSCR
- Multi-entity consolidated view with intercompany elimination
- Educational context explaining WHY metrics matter
- Seasonal comparison (same month last year)
- Weekly cash flow trend chart

**Data Flow (V1):**
```
QuickBooks Online → g-accon (auto-sync) → Google Sheets → Claude Analysis → BFT Report
```

**Spreadsheet IDs (Titan - Reference Implementation):**
- Distribution: `1RfTsvuqxoFYgk5Jd4JVuyIUlToug9y7bbtsTWheDFew`
- Services: `1QEqKj0bS3pD71uH2Z-Ae0cFVLY3rr2HnPKHI9S3yP7E`
- Consolidated: `1i2c7Dq93gGAJSc2Df7JoiG5gWc3loX8oGJJIuAiQyeA`

### Version 2 (Planned) - QBO API Direct
**Status**: DEVELOPMENT
**Data Source**: QuickBooks Online API (direct)
**Target**: Q1 2026

Version 2 will pull financial data directly from the QuickBooks Online API, eliminating the g-accon intermediary. This will enable:
- Real-time data (no sync delay)
- More granular transaction-level analysis
- Automated weekly report generation
- Direct comparison with V1 results for validation

**Validation Plan:**
When V2 is ready, we will run both versions in parallel and compare:
- All TTM figures
- All balance sheet items
- All P&L calculations
- DSCR, CCC, Rule of 40 scores

Results must match before V2 goes to production.

---

## Architecture

```
Weekly Workflow:

Friday Night          Saturday Morning       Saturday Morning
     │                      │                      │
     ▼                      ▼                      ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│ g-accon     │      │ Claude Code │      │   Vercel    │
│ Sync        │─────▶│ Generate    │─────▶│   Deploy    │
│ (Auto)      │      │ Report      │      │   (Auto)    │
└─────────────┘      └─────────────┘      └─────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │ Email Link  │
                     │ to Client   │
                     └─────────────┘
```

---

## Tech Stack

| Component | Technology | Notes |
|-----------|------------|-------|
| Frontend | React + JSX | Functional components |
| Charts | Recharts | LineChart, BarChart, PieChart, AreaChart |
| Styling | Tailwind CSS | Responsive, mobile-first |
| Hosting | Vercel | Free tier, auto-deploy from GitHub |
| Data | Google Sheets | Via g-accon sync from QuickBooks |

---

## File Structure

```
VIP-Groups/
├── Benefique/
│   ├── benefique_financial_times_template.jsx    # Master template
│   ├── BENEFIQUE_FINANCIAL_TIMES_GUIDE.md        # This file
│   └── FRACTIONAL_CFO_SPEC.md                    # Metrics specification
│
├── [ClientName]/
│   ├── knowledge-base.md                         # Client config + spreadsheet IDs
│   ├── CFO-Analysis-[date].md                    # Raw analysis (internal)
│   └── benefique_financial_times_[date].jsx      # Weekly edition (deployable)
```

---

## Creating a New Edition

### Step 1: Generate CFO Analysis

Run the Fractional CFO analysis for the client:

```
User: "Run CFO analysis for [Client Name]"
Claude: [Generates CFO-Analysis-YYYY-MM-DD.md]
```

### Step 2: Create the BFT Edition

Copy the template and update with client data:

```
User: "Create this week's Benefique Financial Times for [Client Name]"
Claude: [Creates benefique_financial_times_[client]_[date].jsx]
```

### Step 3: Update the CONFIG Section

The template has two sections to update:

**CONFIG** - Client metadata:
```javascript
const CONFIG = {
  clientName: 'Titan Group',
  reportDate: 'January 25, 2026',
  editionNumber: 1,
  currentDay: 25,
  daysInMonth: 31,
  isMultiEntity: true,
  entities: ['Distribution', 'Services'],
  // ...
};
```

**DATA** - Financial data:
```javascript
const summaryMetrics = { ... };
const cashData = { ... };
const entityData = [ ... ];
const consolidated = { ... };
// etc.
```

### Step 4: Deploy to Vercel

**Option A: GitHub → Vercel (Recommended)**

1. Push the JSX file to GitHub repo
2. Vercel auto-deploys on push
3. Get public URL

**Option B: Direct Deploy**

1. Create a simple React app with the component
2. Run `npm run build`
3. Deploy `dist` folder to Vercel/Netlify

**Option C: Drag-and-Drop (Quick)**

1. Build locally
2. Go to app.netlify.com/drop
3. Drag the build folder

### Step 5: Send to Client

Email the client with the link:

```
Subject: Your Benefique Financial Times - Week of [Date]

[Client Name] Team,

Your weekly financial report is ready:
[Vercel URL]

Key Highlights:
• Overall Status: [GREEN/YELLOW/RED]
• Cash Runway: [X] days
• Rule of 40: [Score]

[Action items if any]

Best regards,
Benefique Fractional CFO
```

---

## Template Sections

### 1. Masthead
- Newspaper-style header
- Client name, date, edition number
- Location

### 2. Above the Fold (Lead Story)
- Executive summary narrative
- Weekly cash trend chart (12 weeks)
- 6-month revenue trend by entity
- Key metrics sidebar (Status, Runway, TTM DSCR, TTM Net Income)
- Cash Conversion Cycle breakdown

### 3. Seasonal Comparison
- Current month vs same period last year
- Month before/after comparison (catches shifted seasonality)
- Insight narrative

### 4. Consolidated View (Multi-Entity Only)
- Combined Cash, Revenue, EBITDA, TTM DSCR
- Big picture before drilling into entities

### 5. Entity Performance (Multi-Entity Only)
- Individual entity cards with key metrics
- Working capital ratios (DSO, DIO, DPO)
- Intercompany position summary

### 6. Receivables & Payables Analysis
- AR Aging (Current, 31-60, 61-90, 90+ days)
- Visual aging bar with percentages
- Top 3 Customers with concentration risk indicator
- AP Aging (Current, 31-60, 61-90, 90+ days)
- Top 3 Vendors
- Intercompany balances flagged with INTERCO badge

### 7. YTD vs Prior Year
- Side-by-side comparison table (Jan 2025 vs Jan 2026)
- YoY % change for each metric
- Full Year 2025 vs 2026 Projection
- Trajectory indicators (Revenue, EBITDA)

### 8. Profitability Analysis
- 6-month margin trend chart (Gross Margin + EBITDA)
- Rule of 40 trend chart (Rolling TTM at each month-end, NOT single-month)
- Enhanced Rule of 40 breakdown (TTM-based for stability)
- Comparison to prior year TTM

**Rule of 40 Trend Methodology:**
Single-month calculations are too volatile (invoice timing, accruals, payroll timing).
Calculate TTM Rule of 40 at each month-end to show reliable trend direction.

### 9. Expense Watch
- Spike detection table (>50% variance from 4-month average)
- Variance analysis with status (SPIKE, REVERSAL)

### 10. Owner Distributions
- MTD draws vs income percentage
- Partner breakdown
- Conservative/Moderate/High indicator

### 11. Action Items
- Prioritized list with urgency levels (HIGH, MEDIUM, LOW)
- Entity assignment badges

### 12. Footer
- Data source attribution
- Sync timestamp
- Report basis (Accrual)
- Copyright
- Audit trail (key figures)
- Next edition date

---

## Mobile Responsiveness

The template uses Tailwind CSS responsive classes:

| Breakpoint | Layout |
|------------|--------|
| Mobile (<768px) | Single column, stacked cards |
| Tablet (768px+) | 2-column grids |
| Desktop (1024px+) | Full newspaper layout |

Key responsive patterns:
- `grid-cols-1 md:grid-cols-12` - Single → 12-column
- `hidden md:inline` - Hide on mobile
- `text-4xl md:text-5xl` - Smaller text on mobile
- `p-4 md:p-6` - Less padding on mobile

---

## Customization

### Color Scheme

Update in CONFIG:
```javascript
primaryColor: '#1e3a5f',    // Headers, accents
secondaryColor: '#166534',  // Positive/success
alertColor: '#dc2626',      // Warnings/alerts
```

### Status Thresholds

In `getStatusColor()` and throughout:
- **GREEN**: Cash runway >= 45 days, Rule of 40 >= 40, DSCR >= 1.25
- **YELLOW**: Cash runway 30-45 days, Rule of 40 25-40, DSCR 1.0-1.25
- **RED**: Cash runway < 30 days, Rule of 40 < 25, DSCR < 1.0

### Adding Sections

To add a new section:
1. Create the data structure in the DATA section
2. Add a `<SectionHeader>` component
3. Build the UI using existing components (StatBox, AlertBox, etc.)
4. Add charts using Recharts components

---

## Archiving Editions

### URL Versioning

Recommended URL structure:
```
/[client]/[year]-[week]
/titan/2026-w04
/titan/2026-01-25
```

### Notion Archive

After each edition:
1. Create a Notion page for the week
2. Link to the Vercel URL
3. Note key findings
4. Track action item follow-ups

### Local Archive

Keep JSX files in client folders:
```
VIP-Groups/Titan/
├── benefique_financial_times_2026-01-25.jsx
├── benefique_financial_times_2026-02-01.jsx
└── ...
```

---

## Automation (Future)

### n8n Workflow

```
1. Cron Trigger: Saturday 6 AM
2. Loop: For each VIP client with BFT enabled
3. Fetch: Pull data from Google Sheets
4. Generate: Call Claude API with template
5. Deploy: Push to Vercel via API
6. Notify: Send email with link
7. Log: Update Notion archive
```

### Data Requirements for Automation

Minimum data points needed per client:
- Cash balance (current + prior)
- Revenue (MTD + prior month)
- EBITDA / Net Operating Income
- DSCR (if debt exists)
- AR / AP balances
- Expense totals by category
- Owner draws (if applicable)

---

## Trademark / Copyright

### Current Protection

- **Copyright**: Automatic upon creation
- Add to footer: "© 2026 Benefique Capital LLC. All rights reserved."

### Future Trademark

If commercializing the BFT as a product:
1. File trademark application with USPTO
2. Classes: Financial consulting services, printed reports
3. Cost: ~$250-350 per class
4. Timeline: 8-12 months for registration

---

## Quick Reference

### To Generate This Week's Report:

```
User: "Create the Benefique Financial Times for Titan Group for the week of January 25, 2026"
```

### To Update an Existing Report:

```
User: "Update the Titan BFT with the latest data from the consolidated sheet"
```

### To Deploy:

```
User: "Deploy the Titan BFT to Vercel"
```

---

## Files Reference

| File | Purpose |
|------|---------|
| `benefique_financial_times_template.jsx` | Master template - copy for each edition |
| `BENEFIQUE_FINANCIAL_TIMES_GUIDE.md` | This guide |
| `FRACTIONAL_CFO_SPEC.md` | Metrics definitions, thresholds, methodology |
| `[client]/knowledge-base.md` | Client config, spreadsheet IDs, entity structure |

---

*Last Updated: January 23, 2026*
*Maintained by: Benefique Fractional CFO System*
*Current Version: 1.1 (G-Accon Based) - Added AR/AP Aging, YTD vs Prior Year*
