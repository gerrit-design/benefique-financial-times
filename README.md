# The Benefique Financial Times

> A newspaper-style weekly CFO report for multi-entity businesses

**Live Demo**: [Titan Group Edition (January 2026)](https://benefique-financial-times.vercel.app)

## Overview

The Benefique Financial Times (BFT) is a mobile-first financial dashboard designed for VIP fractional CFO clients. It transforms complex multi-entity financial data into a clean, newspaper-inspired format delivered every Saturday morning.

Built for business owners—not accountants—BFT focuses on actionable insights with visual storytelling rather than dense spreadsheets.

## Tech Stack

- **React 19.2** - Functional components with hooks
- **Vite 7.2** - Lightning-fast build tooling and HMR
- **Tailwind CSS 4.1** - Utility-first styling with mobile-first design
- **Recharts 3.7** - Interactive financial charts (Area, Bar, Composed, Line)

## Key Features

### Financial Metrics
- **Multi-Entity Consolidation** - Separate tracking for Distribution & Services with consolidated view
- **Trailing Twelve Month (TTM) Analysis** - Stable long-term metrics instead of volatile monthly snapshots
- **Rule of 40** - Growth rate + EBITDA margin tracking for business health
- **Cash Conversion Cycle** - DSO, DIO, DPO analysis with intercompany identification
- **DSCR Tracking** - Debt Service Coverage Ratio for lender compliance
- **Seasonal Comparison** - Year-over-year performance for same period

### Dashboard Sections
1. **Above the Fold** - Lead story with key metrics sidebar
2. **Consolidated View** - Combined performance across all entities
3. **Entity Breakdown** - Individual P&L, balance sheet, and working capital analysis
4. **AR/AP Aging** - Receivables and payables aging with intercompany tagging
5. **YTD vs Prior Year** - Performance comparison with projections
6. **Profitability Analysis** - Margin trends and Rule of 40 breakdown
7. **Expense Watch** - Variance detection vs. 4-month trailing average
8. **Owner Distributions** - Partner draw tracking as % of net income
9. **Action Items** - Prioritized list of items requiring attention

### Design Features
- **Newspaper Aesthetic** - Masthead, bylines, pull quotes, section headers
- **Month Progress Bar** - Visual indicator of reporting period completion
- **Status Indicators** - Color-coded entity health (GREEN/YELLOW/RED)
- **Mobile-Responsive** - Clean layout on phones, tablets, and desktops
- **Print-Friendly** - Serif typography for readability

## Project Structure

```
src/
├── App.jsx          # Main report component with all data and UI
├── main.jsx         # React entry point
└── index.css        # Tailwind base styles

public/
├── index.html       # Entry HTML with viewport meta tags

config/
├── vite.config.js   # Vite configuration with React plugin
├── package.json     # Dependencies and scripts
└── vercel.json      # Vercel deployment settings
```

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

The report is configured via the `CONFIG` object in `App.jsx`:

```javascript
const CONFIG = {
  clientName: 'Titan Group',
  industry: 'Marine & Industrial Services',
  location: 'Hollywood, Florida',
  reportDate: 'January 24, 2026',
  editionNumber: 1,
  periodStart: 'February 2025',
  periodEnd: 'January 2026',
  currentDay: 24,
  daysInMonth: 31,
  isMultiEntity: true,
  entities: ['Distribution', 'Services'],
  // ... more config
};
```

## Data Source

**Current (V1)**: Google Sheets synced from QuickBooks Online via [g-accon](https://github.com/g-accon/g-accon)

**Planned (V2)**: Direct QuickBooks Online API integration (Q1 2026)

### Data Flow (V1)
```
QuickBooks Online → g-accon → Google Sheets → Claude Analysis → BFT Report → Vercel
```

## Development Workflow

1. **Friday Night**: g-accon syncs QBO data to Google Sheets (automated)
2. **Saturday Morning**: Generate report with updated data
3. **Saturday Morning**: Deploy to Vercel (auto-deploy on push)
4. **Saturday Morning**: Email link to client

## Deployment

Hosted on **Vercel** with automatic deployments from the `main` branch.

```bash
# Manual deploy
npm run build
vercel --prod
```

## Security & Privacy

- No API keys or credentials in source code
- Generic client descriptions for public demos
- Private repo option for client-specific data
- Intercompany transactions clearly tagged
- No sensitive transaction details exposed

## Example Clients

- **Titan Group** - Marine & industrial services (distribution + services entities)
- **Eber Group / 3T Radiology** - Medical imaging (multi-location)

Each client edition maintains consistent format with custom data, branding colors, and industry context.

## Documentation

- `BENEFIQUE_FINANCIAL_TIMES_GUIDE.md` - Implementation workflow and versioning
- `FRACTIONAL_CFO_SPEC.md` - Financial metrics definitions and calculations

## License

© 2026 Benefique Capital LLC. All rights reserved.

---

**Built with ❤️ for VIP fractional CFO clients who deserve better than boring spreadsheets.**
