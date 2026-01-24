# Fractional CFO Monitoring System

## Quick Start (New Session)

**When starting a new Claude Code session for CFO work:**

1. **Point Claude to**: `C:\Users\Gerrit Disbergen\Documents\Benefique-Tools\CLAUDE.md`
2. **Claude will then read**: This spec (`FRACTIONAL_CFO_SPEC.md`)
3. **For specific client**: Read `VIP-Groups/[ClientName]/knowledge-base.md`

**What's documented where:**

| Information | Location |
|-------------|----------|
| VIP group list | `CLAUDE.md` |
| CFO methodology & ratios | This file (`FRACTIONAL_CFO_SPEC.md`) |
| Entity structure & spreadsheet IDs | `VIP-Groups/[Client]/knowledge-base.md` |
| CFO analysis reports | `VIP-Groups/[Client]/CFO-Analysis-*.md` |

---

## Project Overview

Build an automated daily/weekly monitoring system for SMB accounting clients at Benefique. The system tracks financial data flowing from QuickBooks Online (QBO) → g-accon → individual entity sheets → CFO Analysis reports.

**Goal:** Replace manual daily monitoring with automated alerts that identify significant financial changes across client portfolios.

**Status:** Phase 2 In Progress - Titan Group analysis completed Jan 22, 2026

---

## The CFO Mission

### Core Questions to Answer

| Question | Why It Matters |
|----------|----------------|
| Can they make payroll next month? | Cash + AR - AP - upcoming obligations |
| Is something broken? | Margin compression, expense leaks, revenue drop |
| Is the owner taking too much out? | Draws vs retained earnings |
| Are customers paying? | AR aging movement |
| Are we profitable or just busy? | Revenue up but margin down = problem |

### Output Philosophy

Not a dashboard to stare at. A **notification when something needs attention**.

- **Green**: No action needed
- **Yellow**: Monitor closely
- **Red**: Immediate action required

---

## Data Flow Architecture

```
QBO (Source of Truth)
        ↓
    g-accon (Sync - Daily AM)
        ↓
Entity Sheets (per company)
    - ProfitAndLossReport (monthly)
    - BalanceSheetReport (monthly)
    - ProfitAndLossWeekly (60 weeks) [where available]
    - BalanceSheetWeekly (60 weeks) [where available]
    - AgedReceivablesSummaryByCustomer
    - AgedPayableSummaryByVendor
    - DASHBOARD (summary)
        ↓
Claude Code CFO Analysis
        ↓
Output: Local MD file + Notion page
```

---

## VIP Client Registry

### Active Clients for CFO Monitoring

| VIP Group | Entity Structure | Spreadsheet IDs | Status |
|-----------|------------------|-----------------|--------|
| Remote Rad | **Single Entity** | `1CKjl7QVrIa_3x8WYnYufWLwsWYaseorSdh2cziiEWhI` | ACTIVE |
| Titan | **Multi-Entity (2 + Consolidated)** | See Titan knowledge-base.md | ACTIVE |
| Eber Group | **Multi-Entity** | TBD | Pending |
| Dutchy's | TBD | TBD | Pending |
| Zyis | TBD | TBD | Pending |
| Insite | **Multi-Entity (Complex)** | See Insite knowledge-base.md | Pending |

### Entity Structure Reference

**For detailed entity structure, spreadsheet IDs, and intercompany relationships:**
→ Check `VIP-Groups/[ClientName]/knowledge-base.md`

| Client | Entities | Intercompany? | Consolidated Sheet? |
|--------|----------|---------------|---------------------|
| Remote Rad | 1 (Remote Rad Tech LLC) | No | N/A |
| Titan | 2 (Distribution + Services) | Yes - significant | Yes: `1i2c7Dq93gGAJSc2Df7JoiG5gWc3loX8oGJJIuAiQyeA` |
| Eber Group | 2+ (Coconut Creek, Miami Beach) | TBD | TBD |
| Insite | Multiple (6+ centers) | TBD | Existing dashboard |

### Client-Specific Considerations

| Client | Type | Special Notes |
|--------|------|---------------|
| Remote Rad | Startup (burn mode) | Focus on runway, funding timeline, Rule of 40 |
| Titan | Operating business (multi-entity) | Focus on margins, intercompany, CCC |
| Eber Group | Healthcare (multi-location) | Multi-location consolidation, reimbursement timing |
| Insite | Healthcare (complex) | Complex entity structure, existing dashboard |

### How to Determine Entity Structure

When onboarding a new client for CFO monitoring:

1. **Check knowledge-base.md** - May already document entities
2. **Ask user** - "Is this a single entity or multi-entity operation?"
3. **Check spreadsheet structure** - Multiple tabs per entity = multi-entity
4. **Look for intercompany** - AR/AP to related entities = needs consolidated view
5. **Update knowledge-base.md** - Document findings for future sessions

---

## CFO Monitoring Metrics

### Primary Metrics (Always Report)

| Category | Metric | Calculation | Alert Threshold |
|----------|--------|-------------|-----------------|
| **Cash** | Current Cash Balance | Bank Accounts total | < 30 days expenses |
| **Cash** | Days Cash on Hand | Cash / (Monthly Expenses / 30) | < 30 days = RED |
| **Cash** | Cash Trend | MoM change direction | 3+ months decline |
| **Revenue** | Monthly Revenue | Total Income | $0 or >30% drop |
| **Revenue** | Revenue Trend | MoM % change | >20% swing |
| **Margins** | Gross Margin % | Gross Profit / Revenue | Below baseline |
| **Margins** | Net Margin % | Net Income / Revenue | Negative + declining |
| **Expenses** | Total Monthly Expenses | Sum of all expenses | >20% above average |
| **Expenses** | Expense Spikes | Line item vs 4-week avg | >50% variance |
| **AR** | Total AR | Accounts Receivable | Growing while revenue flat |
| **AP** | Total AP | Accounts Payable | Stretching payments |
| **Equity** | Total Equity | Assets - Liabilities | Negative = concern |
| **Debt** | Total Debt | Long-term liabilities | Debt service coverage |

### Secondary Metrics (Where Available)

| Category | Metric | Notes |
|----------|--------|-------|
| AR Aging | 30/60/90+ buckets | From AgedReceivablesSummaryByCustomer |
| AP Aging | 30/60/90+ buckets | From AgedPayableSummaryByVendor |
| Owner Draws | Distributions | From Equity section |
| Payroll | Wages + Taxes | % of revenue |

### Working Capital Efficiency Ratios

| Ratio | Formula | Alert Threshold | Notes |
|-------|---------|-----------------|-------|
| DSO (Days Sales Outstanding) | (AR / Revenue) × 30 | > 45 days = YELLOW | Are customers paying? |
| DIO (Days Inventory Outstanding) | (Inventory / COGS) × 30 | > 90 days = YELLOW | Inventory-heavy businesses only |
| DPO (Days Payables Outstanding) | (AP / COGS) × 30 | < 15 or > 60 = YELLOW | Too fast or stretching? |
| Cash Conversion Cycle | DSO + DIO - DPO | > 60 days = YELLOW | How long cash is tied up |

### Debt Service & Coverage Ratios

| Ratio | Formula | Alert Threshold | Notes |
|-------|---------|-----------------|-------|
| DSCR (Debt Service Coverage) | EBITDA / Debt Service | < 1.25x = RED | Can they service debt? |
| True DSCR | OCF / Debt Service | < 1.0x = RED | Conservative cash-based |
| Break-Even Revenue | (Fixed Expenses + DS) / GP% | Revenue < Break-Even = RED | Minimum to cover obligations |

### Growth & Health Ratios (Rule of 40)

| Ratio | Formula | Target | Notes |
|-------|---------|--------|-------|
| **Rule of 40** | Revenue Growth % + EBITDA Margin % | >= 40 = Healthy | Balance growth vs profitability |
| Revenue Growth % | (Current Period - Prior Period) / Prior Period | Varies by stage | YoY preferred, MoM for trends |
| EBITDA Margin % | EBITDA / Revenue | Positive for operating | = Net Operating Margin |

**Why EBITDA Margin (not Net Profit Margin):**
- SMB depreciation is often tax-driven (Section 179, bonus depreciation)
- Tax depreciation ≠ true economic depreciation
- Net Profit % distorted by non-cash tax accounting
- EBITDA margin reflects actual operational profitability
- Only use NP% if all assets are fully depreciated

**Rule of 40 Interpretation for SMBs:**

| Score | Status | Interpretation |
|-------|--------|----------------|
| >= 40 | 🟢 GREEN | Healthy balance of growth and profit |
| 25-39 | ⚠️ YELLOW | Acceptable, monitor trajectory |
| < 25 | 🔴 RED | Either not growing or not profitable enough |

**Examples:**
- 30% growth + 15% EBITDA margin = 45 → GREEN
- 10% growth + 20% EBITDA margin = 30 → YELLOW
- 5% growth + 5% EBITDA margin = 10 → RED (stagnant and thin)
- 50% growth + -20% EBITDA margin = 30 → YELLOW (burning for growth - OK if funded)

### Rule of 40 Calculation Methodology (Index-Based)

**IMPORTANT: Use Index-based TTM calculation, NOT rolling monthly calculations**

Single-month and rolling TTM calculations can be unreliable due to:
- Incomplete historical data in g-accon sheets (only 12 months)
- Data quality issues with automated YoY calculations
- Invoice timing and accrual distortions

**Correct Approach: Index-Based Growth Calculation**

1. **Establish Index (Baseline):** Use calendar year (Jan-Dec) from QBO annual reports
2. **Compare Current TTM to Index:** Calculate raw growth
3. **Annualize if needed:** If TTM period doesn't align with Index, annualize the growth

**Example Calculation (Titan - January 2026):**

| Step | Calculation | Result |
|------|-------------|--------|
| Index (Jan-Dec 2024) | Services $2.34M + Distribution $2.38M | $4.72M |
| Current TTM (Feb 25 - Jan 26) | Services $3.22M + Distribution $3.11M | $6.33M |
| Raw Growth | ($6.33M - $4.72M) / $4.72M | +34.2% |
| Time Gap | End of Index to End of TTM | 13 months |
| Annualized Growth | 34.2% × (12/13) | **+31.6%** |
| TTM EBITDA Margin | $533K / $6.33M | **+8.4%** |
| **Rule of 40** | 31.6 + 8.4 | **40** (GREEN) |

**Why Index-Based Works Better:**
- Uses verified annual report data from QBO
- Clean calendar year baseline
- Annualization adjusts for period misalignment
- Avoids g-accon calculation errors

**For BFT Rule of 40 Section:**
- Show TTM Rule of 40 score (single value)
- Display growth and EBITDA margin components
- Include methodology explanation for readers
- No trend chart (requires 24+ months of reliable data)

---

## Report Structure

### Standard CFO Analysis Report

```markdown
# CFO Analysis: [Entity Name]

**Report Date**: [Date]
**Period**: [Start] - [End]
**Data Source**: [Google Sheet URL]
**Last Data Refresh**: [Timestamp from sheet]

---

## Executive Summary
- Overall Status: [GREEN/YELLOW/RED]
- Cash Runway: [X] days
- Monthly Burn/Profit: $[X]
- Key Concern: [One sentence]

---

## 1. Cash Position
- Current Cash: $X
- Days Cash on Hand: X days
- Cash Trend: [12-month view]
- Finding: [Interpretation]

## 2. Revenue Analysis
- TTM Revenue: $X
- Monthly Average: $X
- Current Month: $X
- Trend: [Growth/Decline %]
- Finding: [Interpretation]

## 3. Profitability
- Gross Margin: X%
- Net Margin: X%
- TTM Net Income: $X
- Finding: [Interpretation]

## 4. Expense Analysis
- Total Monthly Expenses: $X
- Top 5 Categories: [List with %]
- Expense Spikes: [Any >20% variance]
- Finding: [Interpretation]

## 5. Balance Sheet
- Total Assets: $X
- Total Liabilities: $X
- Total Equity: $X
- Debt Structure: [Breakdown]
- Finding: [Interpretation]

## 6. AR/AP Status
- AR Balance: $X
- AP Balance: $X
- AR Aging: [If available]
- Finding: [Interpretation]

---

## Action Items

### Immediate (This Week)
- [ ] Item 1
- [ ] Item 2

### Short-Term (30 Days)
- [ ] Item 1
- [ ] Item 2

---

## Data Gaps
- [Missing information needed for complete analysis]

---

## Audit Trail
| Data Point | Source Tab | Cell Reference | Value |
|------------|------------|----------------|-------|
| Cash | BalanceSheetReport | [Cell] | $X |
| Revenue | ProfitAndLossReport | [Cell] | $X |

---

*Report generated by Claude Code | Benefique Fractional CFO System*
*Next review: [Date]*
```

---

## Output Locations

### For Each Analysis

| Output | Location | Format |
|--------|----------|--------|
| Local File | `VIP-Groups/[ClientName]/CFO-Analysis-YYYY-MM-DD.md` | Full markdown with tables |
| Notion | Client's VIP page | Structured blocks (paragraphs + bullets) |
| **Benefique Financial Times** | Vercel (public URL) | React/JSX newspaper-style |

### The Benefique Financial Times

Weekly client-facing report delivered Saturday mornings.

| Resource | Location |
|----------|----------|
| Template | `VIP-Groups/Benefique/benefique_financial_times_template.jsx` |
| Guide | `VIP-Groups/Benefique/BENEFIQUE_FINANCIAL_TIMES_GUIDE.md` |
| Client Editions | `VIP-Groups/[Client]/bft_[client]_[YYYY-MM-DD].jsx` |

**Features:**
- Newspaper-style layout with masthead
- Mobile-responsive (Tailwind CSS)
- Interactive charts (Recharts)
- Sections: Lead Story, Key Metrics, Seasonal Comparison, Consolidated View, Entity Performance, **AR/AP Aging (30/60/90+)**, **Top 3 Customers/Vendors**, **YTD vs Prior Year**, Profitability, Rule of 40 (Rolling TTM trend), Expense Watch, Owner Draws, Action Items
- Hosted on Vercel (free, no login required)
- Archived by week/date with persistent URLs

### BFT Edition Architecture

**Problem:** Each weekly edition needs its own persistent URL for reference.

**Solution: Route-based editions with React Router**

```
benefique-financial-times.vercel.app/
├── /                           # Landing page (list of clients/editions)
├── /titan/                     # Titan latest edition
├── /titan/2026-01-24          # Titan Jan 24, 2026 edition
├── /titan/2026-01-31          # Titan Jan 31, 2026 edition
├── /remote-rad/               # Remote Rad latest edition
├── /remote-rad/2026-02-01     # Remote Rad Feb 1, 2026 edition
└── /archive/                   # Full archive listing
```

**Implementation Requirements:**
1. Install React Router: `npm install react-router-dom`
2. Create route structure in App.jsx
3. Store each edition as a data file or component
4. Index page lists all available editions by client
5. Each edition URL is permanent (never overwritten)

**Edition Naming Convention:**
- Route: `/[client-slug]/[YYYY-MM-DD]`
- Component file: `editions/[Client]_[YYYY-MM-DD].jsx`
- Data file: `data/[client]/[YYYY-MM-DD].json`

**Vol/Edition Numbering:**
- Vol. I = First year of publication for that client
- No. X = Sequential edition number for that client
- Example: Titan Vol. I, No. 1 = First Titan edition ever
- Numbering continues across calendar years within same Volume

**Status:** TO BE IMPLEMENTED - Current system overwrites single page

### File Naming Convention

```
CFO-Analysis-YYYY-MM-DD.md       # Standard weekly/monthly report
CFO-Analysis-YYYY-MM-DD-adhoc.md # Ad-hoc analysis
CFO-Alert-YYYY-MM-DD.md          # Alert-triggered report
```

---

## Data Verification Process

### Before Analysis

1. **Check data freshness**
   - Read "Last Updated" timestamp from sheet
   - Verify g-accon sync completed (should be < 24 hours old)

2. **Spot-check key figures**
   - Pull specific cells and verify against sheet
   - Document cell references in audit trail

### After Analysis

1. **Include audit trail** in every report
2. **Flag data gaps** explicitly
3. **Note verification needed** for anomalies

### Trust Hierarchy

```
QBO (Source of Truth)
    ↓ [Verify 2-3 values manually if critical]
g-accon Sync
    ↓ [Check "Last Updated" timestamp]
Google Sheet
    ↓ [Document cell references]
Claude Analysis
    ↓ [Include audit trail]
Report Output
```

---

## Key Constraints

### G-accon Limitations

- **Weekly data**: Overwrites outside 60-week window
- **Daily refresh**: Early AM, may not have latest transactions
- **Report types**: Some clients have monthly only, not weekly

### Notion API Limitations

- Limited block types (no native tables)
- Must append content in chunks
- Creating child pages requires workarounds

### Analysis Limitations

- Cannot verify QBO directly (only see g-accon output)
- Accrual timing may affect revenue recognition
- Cannot know what transactions are missing

---

## Alert Thresholds

### Red Alerts (Immediate Action)

| Condition | Threshold |
|-----------|-----------|
| Days Cash on Hand | < 14 days |
| Monthly Revenue | $0 or not recorded |
| Net Margin | < -100% (losing more than revenue) |
| Expense Spike | Single line item > 5x average |
| AR Aging | > 50% in 90+ bucket |

### Yellow Alerts (Monitor Closely)

| Condition | Threshold |
|-----------|-----------|
| Days Cash on Hand | 14-30 days |
| Revenue Decline | > 20% MoM |
| Net Margin Decline | > 10 percentage points |
| Expense Spike | Line item > 2x average |
| Cash Trend | 3+ months declining |

---

## Sheet Tab Reference

### Standard g-accon Tabs

| Tab Name | Content | Data Type |
|----------|---------|-----------|
| ProfitAndLossReport | Monthly P&L | Monthly columns |
| BalanceSheetReport | Monthly Balance Sheet | Monthly columns |
| ProfitAndLossWeekly | Weekly P&L (60 weeks) | Weekly columns |
| BalanceSheetWeekly | Weekly Balance Sheet | Weekly columns |
| DASHBOARD | Summary metrics | Calculated |
| AgedReceivablesSummaryByCustomer | AR aging | Current snapshot |
| AgedPayableSummaryByVendor | AP aging | Current snapshot |
| Total Data | Raw transaction data | Rows |
| Company Information | Entity metadata | Static |

### Key Cell Patterns

| Metric | Typical Location |
|--------|------------------|
| Total Income | ProfitAndLossReport, "Total Income" row |
| Total Expenses | ProfitAndLossReport, "Total Expenses" row |
| Net Income | ProfitAndLossReport, "Net Income" row |
| Cash | BalanceSheetReport, "Total Bank Accounts" row |
| AR | BalanceSheetReport, "Total Accounts Receivable" row |
| AP | BalanceSheetReport, "Total Accounts Payable" row |
| Last Updated | Header area, varies by sheet |

---

## Execution Workflow

### Manual Analysis (Current)

```
1. User provides Google Sheet URL
2. Claude reads sheet metadata (tabs available)
3. Claude reads key tabs (P&L, Balance Sheet, Dashboard)
4. Claude performs CFO analysis
5. Claude generates report
6. Claude writes to local file + Notion
7. User reviews and takes action
```

### Current Automation (CFO Control Panel)

**Status: IMPLEMENTED** (January 23, 2026)

```
1. Friday 11 PM: CFO Control Panel trigger fires
2. Script refreshes all VIP g-accon sheets
3. Verifies required reports exist
4. Logs status to Control Panel
5. Sends email alert if any refresh fails
6. Saturday: Claude generates BFT with fresh data
```

**Control Panel Location:** `VIP-Groups/Benefique/cfo-control-panel/`

### Future Automation (n8n Integration)

```
1. Scheduled trigger (weekly)
2. n8n fetches sheet data
3. n8n calls Claude API with data
4. Claude generates analysis
5. n8n writes to Notion
6. n8n sends email alert if RED status
7. n8n logs completion
```

---

## Development Tasks

### Phase 1: Manual CFO Analysis [COMPLETE]
- [x] Define CFO metrics and questions
- [x] Build report template
- [x] Test with Remote Rad (pilot)
- [x] Output to local markdown
- [x] Output to Notion
- [x] Document audit trail process

### Phase 2: Scale to All VIP Clients [IN PROGRESS]
- [x] Collect all VIP client spreadsheet IDs (ongoing - add to knowledge-base.md)
- [x] Verify each client has required tabs
- [x] Run analysis for Titan Group (Distribution, Services, Consolidated)
- [ ] Run analysis for Eber Group
- [ ] Run analysis for remaining VIP clients
- [x] Document client-specific variations (in knowledge-base.md per client)

### Phase 3: History Preservation
- [ ] Create History tab structure for weekly data
- [ ] Write Apps Script to append oldest week
- [ ] Set up weekly trigger (Sunday 11 PM)
- [ ] Test duplicate prevention
- [ ] Roll out to all clients with weekly data

### Phase 4: Automated Alerts
- [ ] Define n8n workflow structure
- [ ] Build scheduled trigger
- [ ] Implement threshold checking
- [ ] Create email alert templates
- [ ] Test end-to-end automation

### Phase 5: Dashboard/Consolidation
- [ ] Multi-client summary view
- [ ] Portfolio-level health indicators
- [ ] Trend comparisons across clients
- [ ] Executive summary format

---

## Lessons Learned (Remote Rad Pilot)

### What Worked
- Monthly P&L and Balance Sheet data was sufficient for CFO analysis
- Audit trail with cell references builds trust
- Action items with clear ownership drive follow-up
- Notion output enables team visibility

### Issues Identified
- January 2026 showed $0 revenue (likely data lag, not real)
- December 2025 had $77K expense spike (needs explanation)
- Notion API limited - tables render as text
- Need AR aging detail for collection assessment

### Improvements for Next Client
- Verify data freshness before analysis
- Flag $0 revenue immediately as verification needed
- Include funding/runway context for startups
- Add client-specific thresholds based on business type

---

## Lessons Learned (Titan Group - Multi-Entity)

### What Worked
- Weekly data from g-accon (60-week rolling) enables trend analysis
- Partial month adjustment (e.g., 71% = 22/31 days) provides realistic projections
- Intercompany analysis reveals true working capital picture
- Client's consolidated spreadsheet model is excellent reference
- Rule of 40, DSCR, CCC are valuable SMB ratios

### Issues Identified
- Payroll timing can distort partial-month analysis (depends on pay periods)
- Labor COGS often books at month-end - mid-month margins may be overstated
- Intercompany elimination approach depends on use case (management vs GAAP)
- Entity-specific thresholds needed (inventory business vs service business)

### Multi-Entity Workflow
1. Analyze each entity individually first
2. Document intercompany relationships in knowledge-base.md
3. Create consolidated view (with or without elimination based on need)
4. Compare to client's own consolidated model if available
5. Identify entity-specific focus areas (e.g., DIO for distribution, labor COGS for services)

### Key Ratios Added from Titan
- DSCR (Debt Service Coverage Ratio)
- True DSCR (OCF / Debt Service)
- Cash Conversion Cycle (DSO + DIO - DPO)
- Break-Even Revenue
- Rule of 40

---

## Notes

- G-accon updates daily (early AM Eastern)
- Each client group may have multiple entities
- Different clients need different alert thresholds
- Startups: focus on runway and funding
- Operating businesses: focus on margins and trends
- Healthcare: watch for reimbursement timing
- AR/AP aging reports are current snapshots only (no history)

---

*Last Updated: January 24, 2026*
*Maintained by: Benefique Fractional CFO System*
*Clients Completed: Remote Rad (single), Titan Group (multi-entity)*
*BFT Version: 1.2 - Rolling TTM Rule of 40 trend, Edition archiving architecture*
