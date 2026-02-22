import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ReferenceLine, Area, AreaChart, ComposedChart } from 'recharts';

// ============================================================
// THE BENEFIQUE FINANCIAL TIMES - TITAN GROUP
// Edition: February 21, 2026 (Saturday Edition, Vol. I, No. 2)
// Data: MTD as of Feb 21, 2026 (75% through month)
// Sources: titan-bft-february-2026.md, titan-bft-2026-02-21.md
// ============================================================

export default function App() {

  // ============================================================
  // CONFIG
  // ============================================================

  const CONFIG = {
    clientName: 'Titan Group',
    clientSlug: 'titan',
    industry: 'Marine & Industrial Services',
    location: 'Hollywood, Florida',
    reportDate: 'February 21, 2026',
    editionNumber: 2,
    periodStart: 'March 2025',
    periodEnd: 'February 2026',
    currentDay: 21,
    daysInMonth: 28,
    isMultiEntity: true,
    entities: ['Distribution', 'Services'],
    hasConsolidated: true,
    primaryColor: '#1e3a5f',
    secondaryColor: '#166534',
    alertColor: '#dc2626',
    dataSource: 'QuickBooks via g-accon',
    lastSync: '2026-02-21 09:14:00',
    spreadsheetIds: {
      distribution: '1RfTsvuqxoFYgk5Jd4JVuyIUlToug9y7bbtsTWheDFew',
      services: '1QEqKj0bS3pD71uH2Z-Ae0cFVLY3rr2HnPKHI9S3yP7E',
      consolidated: '1i2c7Dq93gGAJSc2Df7JoiG5gWc3loX8oGJJIuAiQyeA',
    },
  };

  const monthProgress = Math.round((CONFIG.currentDay / CONFIG.daysInMonth) * 100);

  // ============================================================
  // DATA - February 21, 2026
  // NOTE: AR/AP aging figures are estimated from DSO/DIO/DPO calculations.
  //       Full aging reports should be pulled from Google Sheets to confirm.
  // ============================================================

  const summaryMetrics = {
    overallStatus: 'GREEN',
    statusReason: 'Record February Profitability — Validate Data Before Celebrating',
    cashRunway: 32,
    ttmNetIncome: 548223,
    mtdNetIncome: 218648,
    ruleOf40Score: 48,
    ruleOf40TTM: 48,
  };

  const cashData = {
    current: 131281,
    prior: 140735,      // January 2026 final
    change: -9454,
    changePct: -7,
    daysOnHand: 32,
    trend: [
      { week: 'Jan 17', cash: 179300 },
      { week: 'Jan 31', cash: 140735 },
      { week: 'Feb 7',  cash: 122000 },   // estimated
      { week: 'Feb 14', cash: 145000 },   // estimated
      { week: 'Feb 21', cash: 131281 },
    ],
  };

  const entityData = [
    {
      name: 'Distribution',
      status: 'GREEN',
      statusNote: 'Revenue +19% MoM | ⚠️ Expenses $42K vs $77K avg — verify accruals',
      cash: 52562,
      revenue: 275404,
      revenueProjected: 367205,
      revenuePrior: 231810,         // January 2026 final
      ebitda: 92490,
      ebitdaPct: 34,
      grossMarginPct: 49,
      dscr: 2.80,                   // estimated TTM-based improvement
      dso: 20,
      dio: 80,
      dpo: 25,
      ccc: 75,
      ar: 183000,                   // estimated: revenue * DSO/30
      ap: 118000,                   // estimated: COGS * DPO/30
      inventory: 530000,            // estimated (Jan was $545K)
      ttmRevenue: 3200000,          // estimated
      ttmNetIncome: 370000,         // estimated
    },
    {
      name: 'Services',
      status: 'GREEN',
      statusNote: '⚠️ 74% gross margin vs 39% TTM avg — COGS verification required',
      cash: 78720,
      revenue: 319705,
      revenueProjected: 426273,
      revenuePrior: 303762,         // January 2026 final
      ebitda: 137741,
      ebitdaPct: 43,
      grossMarginPct: 74,
      dscr: 1.90,                   // estimated TTM-based improvement
      dso: 13,
      dio: 4,
      dpo: 18,
      ccc: -1,
      ar: 139000,                   // estimated: revenue * DSO/30
      ap: 175000,                   // estimated (mostly intercompany, similar to Jan)
      inventory: 47000,
      ttmRevenue: 3321912,          // from Services TTM memo
      ttmNetIncome: 117379,         // from Services TTM memo (titan-bft-2026-02-21.md)
    },
  ];

  const consolidated = {
    cash: 131281,
    revenue: 595109,
    revenueProjected: 793478,
    revenuePrior: 535572,           // January 2026 final
    revenueMoM: 11,
    grossProfit: 371963,
    grossMarginPct: 63,
    ebitda: 230231,
    ebitdaPct: 39,
    ebitdaPrior: 28082,             // January 2026 final EBITDA
    netIncome: 218648,
    ttmRevenue: 6500000,            // estimated: rolling 12 months
    ttmEbitda: 659000,              // estimated: TTM roll-forward
    ttmEbitdaPct: 10,
    ttmNetIncome: 548223,           // estimated: TTM roll-forward
    ttmNetMarginPct: 8,
    dscr: 2.38,                     // estimated: TTM EBITDA / TTM debt service
    trueDscr: 1.40,                 // estimated: includes owner distributions
    debtService: 23066,
    ttmDebtService: 276792,
    dso: 15,
    dio: 40,
    dpo: 22,
    ccc: 33,
    ar: 322000,                     // estimated
    ap: 293000,                     // estimated
    inventory: 577000,              // estimated
  };

  // Seasonal Comparison - February 2026 vs February 2025
  // Note: Feb 2025 figures are estimated based on January 2025 actuals and TTM data
  const seasonalComparison = {
    currentMonth: 'February 2026',
    priorMonth: 'February 2025 (est.)',
    metrics: [
      { metric: 'Revenue',      current: 595109,  prior: 478000,  change: 24.5 },
      { metric: 'Gross Profit', current: 371963,  prior: 150000,  change: 147.9 },
      { metric: 'GP %',         current: 63,      prior: 31,      change: 103.2 },
      { metric: 'EBITDA',       current: 230231,  prior: -20000,  change: 1251 },
      { metric: 'Cash',         current: 131281,  prior: 155000,  change: -15.3 },
    ],
  };

  // 6-Month Revenue Trend (actuals through Jan 2026 final; Feb = MTD)
  const revenueTrend = [
    { month: 'Sep',  distribution: 188000, services: 163000, total: 351000 },
    { month: 'Oct',  distribution: 495000, services: 300000, total: 795000 },
    { month: 'Nov',  distribution: 309000, services: 285000, total: 594000 },
    { month: 'Dec',  distribution: 254000, services: 274000, total: 528000 },
    { month: 'Jan',  distribution: 232000, services: 304000, total: 536000 },
    { month: 'Feb*', distribution: 275404, services: 319705, total: 595109 },
  ];

  const marginTrend = [
    { month: 'Sep',  grossMargin: 21, ebitdaMargin: -25 },
    { month: 'Oct',  grossMargin: 38, ebitdaMargin: 14  },
    { month: 'Nov',  grossMargin: 30, ebitdaMargin: -1  },
    { month: 'Dec',  grossMargin: 35, ebitdaMargin: -2  },
    { month: 'Jan',  grossMargin: 39, ebitdaMargin: 5   },
    { month: 'Feb*', grossMargin: 63, ebitdaMargin: 39  },
  ];

  // AR Aging Data — ESTIMATED from DSO calculations. Pull aging report to confirm.
  const arAging = {
    distribution: {
      current: 0,
      days1to30: 183000,
      days31to60: 0,
      days61to90: 0,
      days90plus: 0,
      total: 183000,
      intercompany: 168000,
      intercompanyPct: 92,
    },
    services: {
      current: 139000,
      days1to30: 0,
      days31to60: 0,
      days61to90: 0,
      days90plus: 0,
      total: 139000,
      intercompany: 0,
      intercompanyPct: 0,
    },
  };

  const topCustomers = [
    { name: 'Titan Marine Services (IC)',    amount: 168000, entity: 'Distribution', isIntercompany: true  },
    { name: 'Titan Marine St Maarten (IC)',  amount: 15000,  entity: 'Distribution', isIntercompany: true  },
    { name: 'External Customers',            amount: 0,      entity: 'Distribution', isIntercompany: false },
  ];

  // AP Aging Data — ESTIMATED. Pull aging report to confirm.
  const apAging = {
    distribution: {
      current: 118000,
      days1to30: 0,
      days31to60: 0,
      days61to90: 0,
      days90plus: 0,
      total: 118000,
      intercompany: 0,
      intercompanyPct: 0,
    },
    services: {
      current: 0,
      days1to30: 175000,
      days31to60: 0,
      days61to90: 0,
      days90plus: 0,
      total: 175000,
      intercompany: 172000,
      intercompanyPct: 98,
    },
  };

  const topVendors = [
    { name: 'Titan Marine Distribution (IC)', amount: 172000, entity: 'Services',      isIntercompany: true  },
    { name: 'Frigomar Srl',                   amount: 60000,  entity: 'Distribution',  isIntercompany: false },
    { name: 'SXM Orders',                     amount: 8000,   entity: 'Services',      isIntercompany: false },
  ];

  // YTD vs Prior Year
  const ytdComparison = {
    current: {
      period: 'YTD Feb 2026',
      revenue: 1130681,       // Jan $535,572 + Feb $595,109
      grossProfit: 578339,    // Jan $206,376 + Feb $371,963
      ebitda: 258313,         // Jan $28,082 + Feb $230,231
      netIncome: 240772,      // Jan $22,124 + Feb $218,648
    },
    prior: {
      period: 'YTD Feb 2025 (est.)',
      revenue: 956000,
      grossProfit: 302834,
      ebitda: -43566,
      netIncome: -46566,
    },
    fullYear: {
      prior: {
        year: '2025',
        revenue: 6424700,
        netIncome: 440732,
      },
      projected: {
        year: '2026',
        revenue: 7200000,
        netIncome: 1440000,   // conservative: YTD run rate, adjusted for seasonality
      },
    },
  };

  // Expense Watch — February anomalies
  const expenseSpikes = [
    { category: 'Operating Expenses',        entity: 'Distribution', current: 42012,  average: 77000,  variance: -45, status: 'LOW'    },
    { category: 'COGS (margin-implied)',      entity: 'Services',     current: 82245,  average: 185000, variance: -56, status: 'LOW'    },
    { category: 'Operating Expenses',        entity: 'Services',     current: 99719,  average: 100000, variance:   0, status: 'NORMAL' },
  ];

  const ownerDraws = {
    ttmTotal: 256000,         // estimated (Jan TTM $242,885 + Feb)
    mtdTotal: 14000,          // estimated
    mtdPctOfIncome: 6.4,
    partners: [
      { name: 'Francisco', ttm: 102000, mtd: 2000  },   // estimated
      { name: 'Ronel',     ttm: 154000, mtd: 12000 },   // estimated
    ],
  };

  const intercompany = {
    distributionARfromServices: 168000,
    servicesAPtoDistribution: 172000,
    netPosition: 4000,
    direction: 'Services owes Distribution',
  };

  const actionItems = [
    { priority: 1, item: 'Verify Services COGS completeness — 74.3% gross margin vs 38.9% TTM average. Confirm all COGS accruals and labor costs are posted for February.', entity: 'Services', urgency: 'HIGH' },
    { priority: 2, item: 'Reconcile Distribution operating expenses — $42K vs $77K trailing average. Were all vendor bills, accruals, and allocations posted?', entity: 'Distribution', urgency: 'HIGH' },
    { priority: 3, item: 'Analyze cash vs profit disconnect — $219K net income but only -$10K cash change. Pull full cash flow statement and review A/R, inventory, and A/P movements.', entity: 'Both', urgency: 'MEDIUM' },
    { priority: 4, item: 'Pull AR aging report from Google Sheets to confirm estimated figures used in this dashboard.', entity: 'Both', urgency: 'LOW' },
  ];

  // ============================================================
  // UTILITY FUNCTIONS
  // ============================================================

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return '—';
    const absValue = Math.abs(value);
    if (absValue >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (absValue >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatPercent = (value) => {
    if (value === null || value === undefined) return '—';
    return `${value >= 0 ? '+' : ''}${value}%`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'GREEN':  return 'bg-green-100 text-green-800 border-green-300';
      case 'YELLOW': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'RED':    return 'bg-red-100 text-red-800 border-red-300';
      default:       return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'GREEN':  return '🟢';
      case 'YELLOW': return '🟡';
      case 'RED':    return '🔴';
      default:       return '⚪';
    }
  };

  // ============================================================
  // UI COMPONENTS
  // ============================================================

  const Masthead = () => (
    <div className="bg-stone-50 border-b-4 border-double border-stone-800 pb-4 mb-6">
      <div className="border-t-2 border-stone-800 mb-2"></div>
      <div className="text-center px-4">
        <p className="text-[10px] tracking-[0.3em] text-stone-600 uppercase mb-1">
          Benefique Fractional CFO | {CONFIG.industry}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-black text-stone-900 tracking-tight" style={{ fontFamily: 'Georgia, Times, serif' }}>
          The Benefique Financial Times
        </h1>
        <p className="text-lg font-serif text-stone-700 mt-1" style={{ fontFamily: 'Georgia, Times, serif' }}>
          {CONFIG.clientName} Edition
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-2 text-[11px] text-stone-600">
          <span>Vol. I, No. {CONFIG.editionNumber}</span>
          <span className="hidden md:inline text-stone-400">|</span>
          <span className="font-medium">{CONFIG.reportDate}</span>
          <span className="hidden md:inline text-stone-400">|</span>
          <span>Saturday Edition</span>
          <span className="hidden md:inline text-stone-400">|</span>
          <span className="italic">{CONFIG.location}</span>
        </div>
        {/* Month Progress Bar */}
        <div className="mt-3 max-w-md mx-auto">
          <div className="flex justify-between text-[10px] text-stone-600 font-medium mb-1">
            <span>Month Progress</span>
            <span>{monthProgress}% ({CONFIG.currentDay}/{CONFIG.daysInMonth} days)</span>
          </div>
          <div className="h-4 bg-stone-200 rounded-full overflow-hidden border border-stone-300">
            <div className="h-full bg-amber-600 rounded-full transition-all" style={{ width: `${monthProgress}%` }}></div>
          </div>
        </div>
      </div>
      <div className="border-b border-stone-400 mt-3"></div>
    </div>
  );

  const SectionHeader = ({ title, subtitle }) => (
    <div className="border-b-2 border-stone-800 mb-4 pb-1">
      <h2 className="font-serif text-lg font-bold text-stone-900 uppercase tracking-wide" style={{ fontFamily: 'Georgia, Times, serif' }}>
        {title}
      </h2>
      {subtitle && <p className="text-[10px] text-stone-500 italic">{subtitle}</p>}
    </div>
  );

  const StatBox = ({ label, value, subtext, trend, status }) => (
    <div className={`text-center p-3 border bg-white ${status ? getStatusColor(status) : 'border-stone-300'}`}>
      <p className="text-[10px] uppercase tracking-wide text-stone-500 mb-1">{label}</p>
      <p className="text-xl md:text-2xl font-bold text-stone-900" style={{ fontFamily: 'Georgia, Times, serif' }}>{value}</p>
      {subtext && <p className="text-[10px] text-stone-500">{subtext}</p>}
      {trend !== undefined && (
        <p className={`text-xs font-medium ${trend >= 0 ? 'text-green-700' : 'text-red-600'}`}>
          {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
        </p>
      )}
    </div>
  );

  const PullQuote = ({ quote, attribution }) => (
    <div className="border-l-4 border-stone-800 pl-4 py-2 my-4 bg-stone-50">
      <p className="font-serif text-base md:text-lg italic text-stone-800" style={{ fontFamily: 'Georgia, Times, serif' }}>
        "{quote}"
      </p>
      {attribution && <p className="text-xs text-stone-500 mt-1">— {attribution}</p>}
    </div>
  );

  const Article = ({ headline, byline, children }) => (
    <article className="mb-6">
      <h3 className="font-serif text-xl font-bold text-stone-900 leading-tight mb-1" style={{ fontFamily: 'Georgia, Times, serif' }}>
        {headline}
      </h3>
      {byline && <p className="text-[10px] text-stone-500 uppercase tracking-wide mb-2">{byline}</p>}
      <div className="text-sm text-stone-700 leading-relaxed" style={{ fontFamily: 'Georgia, Times, serif' }}>
        {children}
      </div>
    </article>
  );

  const AlertBox = ({ type, title, children }) => {
    const colors = {
      success: 'bg-green-50 border-green-300 text-green-900',
      warning: 'bg-amber-50 border-amber-300 text-amber-900',
      danger:  'bg-red-50 border-red-300 text-red-900',
      info:    'bg-blue-50 border-blue-300 text-blue-900',
    };
    return (
      <div className={`p-3 border ${colors[type] || colors.info}`}>
        <p className="font-serif font-bold text-sm mb-1">{title}</p>
        <div className="text-[11px]">{children}</div>
      </div>
    );
  };

  const Dateline = ({ location }) => (
    <span className="font-bold uppercase text-[11px]">{location} —</span>
  );

  // ============================================================
  // MAIN RENDER
  // ============================================================

  return (
    <div className="bg-stone-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg">
        <div className="p-4 md:p-6">

          <Masthead />

          {/* DATA VALIDATION BANNER */}
          <div className="mb-6 p-3 bg-amber-50 border-2 border-amber-400">
            <p className="font-serif font-bold text-sm text-amber-900">⚠️ Data Validation Required Before Distribution</p>
            <p className="text-[11px] text-amber-800 mt-1">
              February shows exceptional results (10x profit vs January). Two anomalies require confirmation: Services gross margin at 74.3% (vs 38.9% TTM avg) and Distribution expenses at $42K (vs $77K avg).
              AR/AP aging figures in this report are <strong>estimated</strong> from DSO/DIO/DPO calculations — pull the actual aging reports from Google Sheets before sending to the client.
            </p>
          </div>

          {/* ============================================================ */}
          {/* ABOVE THE FOLD - Lead Story + Key Metrics */}
          {/* ============================================================ */}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            <div className="md:col-span-8">
              <Article
                headline="Titan Posts Strongest Month on Record — $219K Net Income, 63% Gross Margins Signal Operational Breakthrough"
                byline="Benefique Fractional CFO Analysis | Data Pending Validation"
              >
                <p className="first-letter:text-4xl md:first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                  <Dateline location={CONFIG.location} /> The Titan Group enters the final week of February
                  with {formatCurrency(cashData.current)} in combined cash and consolidated net income of {formatCurrency(consolidated.netIncome)} —
                  a tenfold improvement over January's {formatCurrency(entityData[0].revenuePrior > 0 ? 22124 : 22124)} and the strongest profit month
                  in the group's recorded history. Both entities delivered exceptional performance across all margin metrics.
                </p>

                <p className="mt-3">
                  At {monthProgress}% through the month, consolidated revenue stands at {formatCurrency(consolidated.revenue)} with
                  a projected full-month total of {formatCurrency(consolidated.revenueProjected)}. Gross margins reached {consolidated.grossMarginPct}%
                  — significantly higher than January's 38.5% — driven by Services at 74% and Distribution at 49%.
                  EBITDA of {formatCurrency(consolidated.ebitda)} represents a {consolidated.ebitdaPct}% margin, swinging sharply from
                  January's {formatCurrency(consolidated.ebitdaPrior)}.
                </p>

                <PullQuote
                  quote="Both entities hit all-time margin highs in February. If validated, this is a transformational month. But a 10x profit jump demands one final look — verify Services COGS and Distribution accruals before we celebrate."
                  attribution="CFO Analysis"
                />

                <p>
                  Year-over-year, February 2026 revenue is up an estimated 24.5% versus February 2025, but the margin story is
                  the real headline: gross profit is up approximately 148% and EBITDA has swung from a loss of roughly $20K to a
                  gain of {formatCurrency(consolidated.ebitda)} — a turnaround exceeding {formatCurrency(250000)}.
                  The YTD picture through February is equally strong: {formatCurrency(ytdComparison.current.revenue)} in revenue
                  and {formatCurrency(ytdComparison.current.netIncome)} in net income, versus an estimated loss of {formatCurrency(Math.abs(ytdComparison.prior.netIncome))} in the same period of 2025.
                </p>
              </Article>

              {/* Cash Trend Chart */}
              <div className="border border-stone-300 p-3 mt-4">
                <h4 className="font-serif font-bold text-sm mb-2">5-Week Cash Trend (Combined)</h4>
                <ResponsiveContainer width="100%" height={120}>
                  <AreaChart data={cashData.trend}>
                    <defs>
                      <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#166534" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#166534" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="week" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Area type="monotone" dataKey="cash" stroke="#166534" fill="url(#cashGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-[10px] text-stone-500 mt-1">
                  Cash down {formatCurrency(Math.abs(cashData.change))} ({cashData.changePct}%) vs Jan 31 close.
                  Despite $219K profit, cash decreased — review cash flow statement (see Action Items).
                </p>
              </div>

              {/* 6-Month Revenue Trend */}
              <div className="border border-stone-300 p-3 mt-4">
                <h4 className="font-serif font-bold text-sm mb-2">6-Month Revenue by Entity</h4>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={revenueTrend}>
                    <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Bar dataKey="distribution" stackId="a" fill="#1e3a5f" name="Distribution" />
                    <Bar dataKey="services"     stackId="a" fill="#166534" name="Services" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-[10px] text-stone-500 mt-1">*February MTD as of {CONFIG.currentDay}/{CONFIG.daysInMonth} days ({monthProgress}% complete). Jan–Dec are final actuals.</p>
              </div>
            </div>

            {/* Sidebar - Key Metrics */}
            <div className="md:col-span-4 md:border-l md:border-stone-300 md:pl-6">
              <div className="bg-stone-800 text-white px-3 py-2 mb-4">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wide">By The Numbers</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                <StatBox
                  label="Overall Status"
                  value={getStatusEmoji(summaryMetrics.overallStatus) + ' ' + summaryMetrics.overallStatus}
                  subtext={summaryMetrics.statusReason}
                />
                <StatBox
                  label="Cash Runway"
                  value={`${summaryMetrics.cashRunway} days`}
                  status={summaryMetrics.cashRunway >= 45 ? 'GREEN' : summaryMetrics.cashRunway >= 30 ? 'YELLOW' : 'RED'}
                />
                <StatBox
                  label="TTM DSCR"
                  value={`${consolidated.dscr.toFixed(2)}x`}
                  subtext="Debt Service Coverage"
                  status={consolidated.dscr >= 1.25 ? 'GREEN' : consolidated.dscr >= 1.0 ? 'YELLOW' : 'RED'}
                />
                <StatBox
                  label="TTM Net Income"
                  value={formatCurrency(summaryMetrics.ttmNetIncome)}
                  subtext="Trailing 12 Months (est.)"
                />
              </div>

              {/* Cash Conversion Cycle */}
              <div className="mt-4 p-3 bg-stone-50 border border-stone-200">
                <h4 className="font-serif font-bold text-xs mb-2">Cash Conversion Cycle</h4>
                <div className="text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span>DSO (Days Sales Outstanding)</span>
                    <span className="font-medium">{consolidated.dso} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DIO (Days Inventory Outstanding)</span>
                    <span className="font-medium">{consolidated.dio} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DPO (Days Payables Outstanding)</span>
                    <span className="font-medium">({consolidated.dpo}) days</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-300 pt-1 mt-1">
                    <span className="font-bold">CCC Total</span>
                    <span className="font-bold">{consolidated.ccc} days</span>
                  </div>
                </div>
              </div>

              {/* Rule of 40 Box */}
              <div className="mt-4">
                <AlertBox type={summaryMetrics.ruleOf40TTM >= 40 ? 'success' : summaryMetrics.ruleOf40TTM >= 25 ? 'warning' : 'danger'} title="Rule of 40 (TTM)">
                  <p>Score: <strong>{summaryMetrics.ruleOf40TTM}</strong> (Growth% + EBITDA%)</p>
                  <p className="text-[10px] mt-1">
                    YoY Revenue Growth: +38% + TTM EBITDA Margin: {consolidated.ttmEbitdaPct}%
                  </p>
                  <p className="text-[10px] mt-1">
                    {summaryMetrics.ruleOf40TTM >= 40 ? 'Healthy balance of growth and profit' :
                     summaryMetrics.ruleOf40TTM >= 25 ? 'Acceptable - monitor trajectory' :
                     'Below target - focus on growth or margins'}
                  </p>
                </AlertBox>
              </div>

              {/* January Final vs Projected note */}
              <div className="mt-4 p-2 bg-stone-50 border border-stone-200 text-[9px] text-stone-500">
                <p className="font-bold mb-1">January 2026 — Final Actuals</p>
                <p>Revenue: $535K (proj. was $620K)</p>
                <p>Net Income: $22K (proj. was $153K)</p>
                <p>Cash close: $141K</p>
                <p className="mt-1 italic">January came in below projections. February is correcting strongly.</p>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: SEASONAL COMPARISON */}
          {/* ============================================================ */}

          <SectionHeader title="Seasonal Comparison" subtitle="February 2026 vs February 2025 — Same Period Analysis (Prior year estimated)" />

          <div className="mb-6">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-800">
                  <th className="py-2 text-left font-serif font-bold">Metric</th>
                  <th className="py-2 text-right font-serif font-bold">Feb 2025 (est.)</th>
                  <th className="py-2 text-right font-serif font-bold">Feb 2026</th>
                  <th className="py-2 text-right font-serif font-bold">YoY Change</th>
                </tr>
              </thead>
              <tbody>
                {seasonalComparison.metrics.map((row, idx) => (
                  <tr key={idx} className="border-b border-stone-200">
                    <td className="py-2 font-medium">{row.metric}</td>
                    <td className="py-2 text-right text-stone-500">
                      {row.metric.includes('%') ? `${row.prior}%` : formatCurrency(row.prior)}
                    </td>
                    <td className="py-2 text-right font-medium">
                      {row.metric.includes('%') ? `${row.current}%` : formatCurrency(row.current)}
                    </td>
                    <td className={`py-2 text-right font-medium ${row.change >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                      {row.change >= 0 ? '+' : ''}{row.change.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[10px] text-stone-500 mt-2 italic">
              Key Insight: Revenue is up ~25% YoY, but the margin story is transformational — gross profit nearly tripled and EBITDA
              swung from an estimated -$20K loss to +$230K. Prior year February figures estimated from January 2025 actuals and TTM data;
              confirm against 2025 monthly P&L for precise comparison.
            </p>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: CONSOLIDATED VIEW */}
          {/* ============================================================ */}

          <SectionHeader title="Consolidated View" subtitle="Combined Distribution + Services Performance" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <StatBox label="Combined Cash"  value={formatCurrency(consolidated.cash)}    trend={cashData.changePct} />
            <StatBox label="MTD Revenue"    value={formatCurrency(consolidated.revenue)} subtext={`Proj: ${formatCurrency(consolidated.revenueProjected)}`} />
            <StatBox label="MTD EBITDA"     value={formatCurrency(consolidated.ebitda)}  subtext={`${consolidated.ebitdaPct}% margin`} />
            <StatBox label="TTM Revenue"    value={formatCurrency(consolidated.ttmRevenue)} subtext="est." />
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: ENTITY BREAKDOWN */}
          {/* ============================================================ */}

          <SectionHeader title="Entity Performance" subtitle="Distribution | Services — Individual Analysis" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {entityData.map((entity, idx) => (
              <div key={entity.name} className={`${idx === 0 ? 'md:border-r md:border-stone-200 md:pr-6' : 'md:pl-2'}`}>
                <div className={`px-3 py-2 mb-4 ${entity.status === 'GREEN' ? 'bg-green-900' : entity.status === 'YELLOW' ? 'bg-amber-600' : 'bg-red-700'} text-white`}>
                  <h3 className="font-serif font-bold uppercase tracking-wide">{entity.name}</h3>
                  <p className="text-[10px] opacity-80">
                    {entity.status} | {entity.statusNote}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center p-2 bg-stone-50 border border-stone-200">
                    <p className="text-[9px] uppercase text-stone-500">Cash</p>
                    <p className="font-bold text-lg">{formatCurrency(entity.cash)}</p>
                  </div>
                  <div className="text-center p-2 bg-stone-50 border border-stone-200">
                    <p className="text-[9px] uppercase text-stone-500">Gross Margin</p>
                    <p className="font-bold text-lg">{entity.grossMarginPct}%</p>
                  </div>
                  <div className="text-center p-2 bg-stone-50 border border-stone-200">
                    <p className="text-[9px] uppercase text-stone-500">EBITDA %</p>
                    <p className="font-bold text-lg">{entity.ebitdaPct}%</p>
                  </div>
                  <div className="text-center p-2 bg-stone-50 border border-stone-200">
                    <p className="text-[9px] uppercase text-stone-500">TTM DSCR (est.)</p>
                    <p className="font-bold text-lg">{entity.dscr.toFixed(2)}x</p>
                  </div>
                </div>

                <div className="text-[11px] text-stone-700 space-y-1">
                  <p><strong>Revenue MTD:</strong> {formatCurrency(entity.revenue)} → Proj: {formatCurrency(entity.revenueProjected)}</p>
                  <p><strong>vs Prior Month:</strong> {formatCurrency(entity.revenuePrior)} ({entity.revenue > entity.revenuePrior ? '+' : ''}{Math.round((entity.revenue - entity.revenuePrior) / entity.revenuePrior * 100)}%)</p>
                  <p><strong>EBITDA:</strong> {formatCurrency(entity.ebitda)} ({entity.ebitdaPct}%)</p>
                  <p><strong>Working Capital:</strong> DSO {entity.dso}d / DIO {entity.dio}d / DPO {entity.dpo}d</p>
                  <p><strong>CCC:</strong> <span className={entity.ccc < 0 ? 'text-green-700 font-medium' : entity.ccc > 60 ? 'text-amber-600' : ''}>{entity.ccc} days</span></p>
                  <p><strong>AR (est.):</strong> {formatCurrency(entity.ar)} / <strong>AP (est.):</strong> {formatCurrency(entity.ap)}</p>
                  {entity.inventory > 100000 && <p><strong>Inventory:</strong> {formatCurrency(entity.inventory)}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Intercompany Position */}
          <div className="bg-stone-100 p-4 mb-6 border border-stone-300">
            <h4 className="font-serif font-bold text-sm mb-2">Intercompany Position (estimated)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
              <div>
                <p className="text-stone-500">Distribution AR from Services</p>
                <p className="font-bold text-lg">{formatCurrency(intercompany.distributionARfromServices)}</p>
              </div>
              <div>
                <p className="text-stone-500">Services AP to Distribution</p>
                <p className="font-bold text-lg">{formatCurrency(intercompany.servicesAPtoDistribution)}</p>
              </div>
              <div>
                <p className="text-stone-500">Net Position</p>
                <p className="font-bold text-lg text-amber-700">{intercompany.direction}: {formatCurrency(intercompany.netPosition)}</p>
              </div>
            </div>
            <p className="text-[10px] text-stone-500 mt-2 italic">
              Note: Intercompany figures estimated from prior month patterns. Pull AR/AP aging reports to confirm February balances.
              Distribution sells parts/equipment to Services — intercompany represents the majority of both entities' AR and AP.
            </p>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: CASH FLOW ANALYSIS */}
          {/* ============================================================ */}

          <SectionHeader title="Cash Flow Analysis" subtitle="Understanding the Profit vs Cash Disconnect — February 2026" />

          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-green-50 border border-green-200 text-center">
                <p className="text-[10px] uppercase text-stone-500">Net Income (MTD)</p>
                <p className="font-bold text-xl text-green-800">{formatCurrency(consolidated.netIncome)}</p>
                <p className="text-[10px] text-green-700">Record month</p>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 text-center">
                <p className="text-[10px] uppercase text-stone-500">Cash Change (MTD)</p>
                <p className="font-bold text-xl text-red-700">{formatCurrency(cashData.change)}</p>
                <p className="text-[10px] text-red-600">vs Jan 31 close</p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 text-center">
                <p className="text-[10px] uppercase text-stone-500">Profit-Cash Gap</p>
                <p className="font-bold text-xl text-amber-800">{formatCurrency(consolidated.netIncome - Math.abs(cashData.change))}</p>
                <p className="text-[10px] text-amber-700">Absorbed by balance sheet</p>
              </div>
            </div>
            <div className="p-3 bg-stone-50 border border-stone-200 text-[11px]">
              <p className="font-bold mb-2">Where did the $219K go? Likely causes (pull cash flow statement to confirm):</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <p className="font-medium text-amber-700">↑ Cash Uses (outflows):</p>
                  <ul className="list-disc list-inside space-y-1 mt-1 text-stone-600">
                    <li>A/R increase — elevated Feb revenue not yet collected</li>
                    <li>Inventory restocking (Distribution)</li>
                    <li>Debt service payments (~{formatCurrency(consolidated.debtService)}/mo)</li>
                    <li>Owner distributions (~{formatCurrency(ownerDraws.mtdTotal)})</li>
                    <li>Year-end tax payments or accruals</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-green-700">↓ Cash Sources (inflows):</p>
                  <ul className="list-disc list-inside space-y-1 mt-1 text-stone-600">
                    <li>Collections on January A/R</li>
                    <li>A/P deferrals (Distribution expenses down)</li>
                    <li>Operating cash from both entities</li>
                  </ul>
                </div>
              </div>
              <p className="mt-2 italic text-stone-500">Action: Request full Statement of Cash Flows from Danika for February to confirm the balance sheet movements.</p>
            </div>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: AR/AP ANALYSIS */}
          {/* ============================================================ */}

          <SectionHeader title="Receivables & Payables Analysis" subtitle="Aging, Concentration, and Collection Status — ESTIMATED (confirm with aging reports)" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* AR Aging */}
            <div>
              <h4 className="font-serif font-bold text-sm mb-3">Accounts Receivable Aging <span className="text-amber-600 text-[10px] font-normal">(estimated)</span></h4>
              <div className="space-y-3">
                {['distribution', 'services'].map((key) => {
                  const data = arAging[key];
                  const total = data.total;
                  const currentPct = Math.round((data.current / total) * 100) || 0;
                  const days30Pct = Math.round((data.days1to30 / total) * 100) || 0;
                  return (
                    <div key={key} className="p-2 bg-stone-50 border border-stone-200">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="font-medium uppercase">{key}</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                      <div className="h-3 bg-stone-200 rounded flex overflow-hidden text-[8px]">
                        <div className="bg-green-500 flex items-center justify-center text-white" style={{ width: `${currentPct}%` }}>
                          {currentPct > 10 && `${currentPct}%`}
                        </div>
                        <div className="bg-amber-400 flex items-center justify-center" style={{ width: `${days30Pct}%` }}>
                          {days30Pct > 10 && `${days30Pct}%`}
                        </div>
                      </div>
                      <div className="flex justify-between text-[9px] text-stone-500 mt-1">
                        <span>Current: {formatCurrency(data.current)}</span>
                        <span>1-30d: {formatCurrency(data.days1to30)}</span>
                        {data.intercompanyPct > 0 && (
                          <span className="text-blue-600 font-medium">{data.intercompanyPct}% IC</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Top Customers */}
              <h5 className="font-serif font-bold text-xs mt-4 mb-2">Top Customers (estimated)</h5>
              <div className="space-y-1">
                {topCustomers.map((cust, idx) => (
                  <div key={idx} className="flex justify-between text-[10px] p-1 bg-stone-50">
                    <span>
                      {cust.name}
                      {cust.isIntercompany && <span className="ml-1 px-1 bg-blue-100 text-blue-700 text-[8px] rounded">INTERCO</span>}
                    </span>
                    <span className="font-medium">{cust.amount > 0 ? formatCurrency(cust.amount) : '—'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AP Aging */}
            <div>
              <h4 className="font-serif font-bold text-sm mb-3">Accounts Payable Aging <span className="text-amber-600 text-[10px] font-normal">(estimated)</span></h4>
              <div className="space-y-3">
                {['distribution', 'services'].map((key) => {
                  const data = apAging[key];
                  const total = Math.abs(data.total);
                  const currentPct = Math.round((Math.abs(data.current) / total) * 100) || 0;
                  const days30Pct = Math.round((Math.abs(data.days1to30) / total) * 100) || 0;
                  const days60Pct = Math.round((Math.abs(data.days31to60) / total) * 100) || 0;
                  return (
                    <div key={key} className="p-2 bg-stone-50 border border-stone-200">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="font-medium uppercase">{key}</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                      <div className="h-3 bg-stone-200 rounded flex overflow-hidden text-[8px]">
                        <div className="bg-green-500 flex items-center justify-center text-white" style={{ width: `${currentPct}%` }}>
                          {currentPct > 10 && `${currentPct}%`}
                        </div>
                        <div className="bg-amber-400 flex items-center justify-center" style={{ width: `${days30Pct}%` }}>
                          {days30Pct > 10 && `${days30Pct}%`}
                        </div>
                        <div className="bg-orange-500 flex items-center justify-center text-white" style={{ width: `${days60Pct}%` }}>
                          {days60Pct > 10 && `${days60Pct}%`}
                        </div>
                      </div>
                      <div className="flex justify-between text-[9px] text-stone-500 mt-1">
                        <span>Current: {formatCurrency(data.current)}</span>
                        <span>1-30d: {formatCurrency(data.days1to30)}</span>
                        {data.intercompanyPct > 0 && (
                          <span className="text-blue-600 font-medium">{data.intercompanyPct}% IC</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Top Vendors */}
              <h5 className="font-serif font-bold text-xs mt-4 mb-2">Top Vendors (estimated)</h5>
              <div className="space-y-1">
                {topVendors.map((vendor, idx) => (
                  <div key={idx} className="flex justify-between text-[10px] p-1 bg-stone-50">
                    <span>
                      {vendor.name}
                      {vendor.isIntercompany && <span className="ml-1 px-1 bg-blue-100 text-blue-700 text-[8px] rounded">INTERCO</span>}
                    </span>
                    <span className="font-medium">{formatCurrency(vendor.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: YTD VS PRIOR YEAR */}
          {/* ============================================================ */}

          <SectionHeader title="YTD vs Prior Year" subtitle="Year-over-Year Performance Comparison" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-serif font-bold text-sm mb-3">YTD February Comparison</h4>
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-stone-300">
                    <th className="py-1 text-left">Metric</th>
                    <th className="py-1 text-right">YTD Feb 2025 (est.)</th>
                    <th className="py-1 text-right">YTD Feb 2026</th>
                    <th className="py-1 text-right">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone-200">
                    <td className="py-1">Revenue</td>
                    <td className="py-1 text-right text-stone-500">{formatCurrency(ytdComparison.prior.revenue)}</td>
                    <td className="py-1 text-right">{formatCurrency(ytdComparison.current.revenue)}</td>
                    <td className="py-1 text-right text-green-700">+{Math.round((ytdComparison.current.revenue - ytdComparison.prior.revenue) / ytdComparison.prior.revenue * 100)}%</td>
                  </tr>
                  <tr className="border-b border-stone-200">
                    <td className="py-1">Gross Profit</td>
                    <td className="py-1 text-right text-stone-500">{formatCurrency(ytdComparison.prior.grossProfit)}</td>
                    <td className="py-1 text-right">{formatCurrency(ytdComparison.current.grossProfit)}</td>
                    <td className="py-1 text-right text-green-700">+{Math.round((ytdComparison.current.grossProfit - ytdComparison.prior.grossProfit) / ytdComparison.prior.grossProfit * 100)}%</td>
                  </tr>
                  <tr className="border-b border-stone-200">
                    <td className="py-1">EBITDA</td>
                    <td className="py-1 text-right text-red-600">{formatCurrency(ytdComparison.prior.ebitda)}</td>
                    <td className="py-1 text-right">{formatCurrency(ytdComparison.current.ebitda)}</td>
                    <td className="py-1 text-right text-green-700">+{formatCurrency(ytdComparison.current.ebitda - ytdComparison.prior.ebitda)}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Net Income</td>
                    <td className="py-1 text-right text-red-600">{formatCurrency(ytdComparison.prior.netIncome)}</td>
                    <td className="py-1 text-right">{formatCurrency(ytdComparison.current.netIncome)}</td>
                    <td className="py-1 text-right text-green-700">+{formatCurrency(ytdComparison.current.netIncome - ytdComparison.prior.netIncome)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 className="font-serif font-bold text-sm mb-3">Full Year Trajectory</h4>
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-stone-300">
                    <th className="py-1 text-left">Metric</th>
                    <th className="py-1 text-right">FY 2025</th>
                    <th className="py-1 text-right">2026 Proj</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone-200">
                    <td className="py-1">Revenue</td>
                    <td className="py-1 text-right text-stone-500">{formatCurrency(ytdComparison.fullYear.prior.revenue)}</td>
                    <td className="py-1 text-right">{formatCurrency(ytdComparison.fullYear.projected.revenue)}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Net Income</td>
                    <td className="py-1 text-right text-stone-500">{formatCurrency(ytdComparison.fullYear.prior.netIncome)}</td>
                    <td className="py-1 text-right">{formatCurrency(ytdComparison.fullYear.projected.netIncome)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[9px] text-stone-500 mt-2 italic">
                *2026 projection based on 2-month run rate, adjusted conservatively for seasonality.
                February anomalies (if confirmed) would push projection materially higher.
                Validate data before updating projections.
              </p>
            </div>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: PROFITABILITY & RULE OF 40 */}
          {/* ============================================================ */}

          <SectionHeader title="Profitability Analysis" subtitle="Margins, Rule of 40, and Trend Analysis" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-stone-300 p-3">
              <h4 className="font-serif font-bold text-sm mb-2">6-Month Margin Trend</h4>
              <ResponsiveContainer width="100%" height={150}>
                <ComposedChart data={marginTrend}>
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `${v}%`} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />
                  <Bar dataKey="grossMargin"  fill="#166534" name="Gross Margin" />
                  <Line type="monotone" dataKey="ebitdaMargin" stroke="#1e3a5f" strokeWidth={2} name="EBITDA Margin" dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-stone-500 mt-1">*February based on MTD ({monthProgress}% complete). Note the sharp margin expansion — requires COGS validation.</p>
            </div>

            <div className="border border-stone-300 p-3">
              <h4 className="font-serif font-bold text-sm mb-2">Entity Margin Comparison</h4>
              <div className="space-y-3 mt-2">
                {entityData.map(e => (
                  <div key={e.name}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="font-medium">{e.name} — Gross Margin</span>
                      <span className="font-bold">{e.grossMarginPct}%</span>
                    </div>
                    <div className="h-3 bg-stone-100 rounded overflow-hidden">
                      <div className="h-full bg-green-600 rounded" style={{ width: `${e.grossMarginPct}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] mt-1 mb-1">
                      <span className="text-stone-500">{e.name} — EBITDA %</span>
                      <span>{e.ebitdaPct}%</span>
                    </div>
                    <div className="h-3 bg-stone-100 rounded overflow-hidden">
                      <div className="h-full bg-blue-800 rounded" style={{ width: `${e.ebitdaPct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TTM Rule of 40 Breakdown */}
          <div className="bg-stone-50 p-4 border border-stone-300 mb-6">
            <h4 className="font-serif font-bold text-sm mb-3">TTM Rule of 40 Breakdown</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-[10px] text-stone-500 uppercase">YoY Revenue Growth</p>
                <p className="text-2xl font-bold text-green-700">+38%</p>
                <p className="text-[9px] text-stone-500">vs 2024 baseline ($4.72M)</p>
              </div>
              <div className="text-2xl font-bold self-center">+</div>
              <div>
                <p className="text-[10px] text-stone-500 uppercase">TTM EBITDA Margin</p>
                <p className="text-2xl font-bold">{consolidated.ttmEbitdaPct}%</p>
                <p className="text-[9px] text-stone-500">{formatCurrency(consolidated.ttmEbitda)} / {formatCurrency(consolidated.ttmRevenue)} (est.)</p>
              </div>
            </div>
            <div className="text-center mt-3 pt-3 border-t border-stone-300">
              <p className="text-[10px] text-stone-500 uppercase">TTM Rule of 40 Score</p>
              <p className={`text-3xl font-bold ${summaryMetrics.ruleOf40TTM >= 40 ? 'text-green-700' : summaryMetrics.ruleOf40TTM >= 25 ? 'text-amber-600' : 'text-red-600'}`}>
                {summaryMetrics.ruleOf40TTM}
              </p>
              <p className="text-[9px] text-stone-500 mt-1">
                {summaryMetrics.ruleOf40TTM >= 40 ? 'HEALTHY — Strong balance of growth and profit' :
                 summaryMetrics.ruleOf40TTM >= 25 ? 'ACCEPTABLE — Room for improvement' :
                 'BELOW TARGET — Focus needed'}
              </p>
            </div>
            <p className="text-[9px] text-stone-500 mt-3 text-center italic">
              TTM figures are estimated via roll-forward from January actuals. Confirm against Google Sheets consolidated tab.
              February's strong performance has materially improved the Rule of 40 from 40 (January) to an estimated 48.
            </p>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: EXPENSE WATCH */}
          {/* ============================================================ */}

          <SectionHeader title="Expense Watch" subtitle="Variance Analysis — February 2026 Anomalies Require Immediate Review" />

          <div className="mb-6">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-800">
                  <th className="py-2 text-left font-serif font-bold">Category</th>
                  <th className="py-2 text-left font-serif font-bold">Entity</th>
                  <th className="py-2 text-right font-serif font-bold">Current</th>
                  <th className="py-2 text-right font-serif font-bold">Trailing Avg</th>
                  <th className="py-2 text-right font-serif font-bold">Variance</th>
                  <th className="py-2 text-center font-serif font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {expenseSpikes.map((spike, idx) => (
                  <tr key={idx} className="border-b border-stone-200">
                    <td className="py-2 font-medium">{spike.category}</td>
                    <td className="py-2">{spike.entity}</td>
                    <td className="py-2 text-right">{formatCurrency(spike.current)}</td>
                    <td className="py-2 text-right text-stone-500">{formatCurrency(spike.average)}</td>
                    <td className={`py-2 text-right font-medium ${spike.variance > 0 ? 'text-red-600' : spike.variance < -10 ? 'text-amber-600' : 'text-green-700'}`}>
                      {spike.variance > 0 ? '+' : ''}{spike.variance}%
                    </td>
                    <td className="py-2 text-center">
                      <span className={`px-2 py-1 text-[9px] font-bold rounded ${
                        spike.status === 'SPIKE'   ? 'bg-red-100 text-red-700'    :
                        spike.status === 'LOW'     ? 'bg-amber-100 text-amber-700' :
                        spike.status === 'NORMAL'  ? 'bg-green-100 text-green-700' :
                        'bg-stone-100 text-stone-700'
                      }`}>
                        {spike.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 p-2 bg-amber-50 border border-amber-200 text-[10px] text-amber-900">
              <p className="font-bold">⚠️ Key Anomalies This Month:</p>
              <p className="mt-1"><strong>Services COGS:</strong> Implied from 74.3% gross margin — COGS was only $82K vs ~$170K average (TTM COGS rate applied to monthly revenue). Verify all labor costs,
                subcontractors, and parts purchases are fully recorded. This is the single most important validation item.</p>
              <p className="mt-1"><strong>Distribution OpEx:</strong> $42K vs $77K trailing average (-45%). Verify rent accruals, payroll allocations,
                and vendor bills are all posted. A $35K shortfall in expenses can inflate income significantly.</p>
            </div>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: OWNER DRAWS */}
          {/* ============================================================ */}

          <SectionHeader title="Owner Distributions" subtitle="Partner Draws and Equity Movement (estimated — confirm with QBO)" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-stone-50 border border-stone-200">
              <p className="text-[10px] uppercase text-stone-500">MTD Draws (est.)</p>
              <p className="font-bold text-2xl">{formatCurrency(ownerDraws.mtdTotal)}</p>
              <p className="text-[10px] text-stone-500">{ownerDraws.mtdPctOfIncome}% of MTD Net Income</p>
              <p className={`text-[9px] mt-1 ${ownerDraws.mtdPctOfIncome < 30 ? 'text-green-600' : ownerDraws.mtdPctOfIncome < 60 ? 'text-amber-600' : 'text-red-600'}`}>
                {ownerDraws.mtdPctOfIncome < 30 ? 'Conservative' : ownerDraws.mtdPctOfIncome < 60 ? 'Moderate' : 'High'}
              </p>
            </div>
            <div className="text-center p-4 bg-stone-50 border border-stone-200">
              <p className="text-[10px] uppercase text-stone-500">TTM Distributions (est.)</p>
              <p className="font-bold text-2xl">{formatCurrency(ownerDraws.ttmTotal)}</p>
              <p className="text-[10px] text-stone-500">Trailing 12 Months</p>
            </div>
            <div className="p-4 bg-stone-50 border border-stone-200">
              <p className="text-[10px] uppercase text-stone-500 mb-2">By Partner (est.)</p>
              {ownerDraws.partners.map((partner) => (
                <div key={partner.name} className="flex justify-between text-[11px] mb-1">
                  <span>{partner.name}</span>
                  <span className="font-medium">{formatCurrency(partner.mtd)} MTD / {formatCurrency(partner.ttm)} TTM</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: ACTION ITEMS */}
          {/* ============================================================ */}

          <SectionHeader title="Action Items" subtitle="Items Requiring Immediate Attention" />

          <div className="mb-6">
            {actionItems.map((item, idx) => (
              <div key={idx} className={`flex items-start gap-3 p-3 mb-2 border-l-4 ${
                item.urgency === 'HIGH'   ? 'border-red-500 bg-red-50'    :
                item.urgency === 'MEDIUM' ? 'border-amber-500 bg-amber-50' :
                'border-stone-300 bg-stone-50'
              }`}>
                <span className="font-bold text-stone-400">#{item.priority}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.item}</p>
                  <p className="text-[10px] text-stone-500">{item.entity}</p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-1 rounded ${
                  item.urgency === 'HIGH'   ? 'bg-red-200 text-red-800'    :
                  item.urgency === 'MEDIUM' ? 'bg-amber-200 text-amber-800' :
                  'bg-stone-200 text-stone-800'
                }`}>
                  {item.urgency}
                </span>
              </div>
            ))}
          </div>

          {/* ============================================================ */}
          {/* FOOTER */}
          {/* ============================================================ */}

          <div className="border-t-2 border-stone-800 mt-8 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[9px] text-stone-500 gap-4">
              <div>
                <p className="font-bold">The Benefique Financial Times</p>
                <p>Published by Benefique Fractional CFO Services</p>
                <p className="mt-1">© 2026 Benefique Capital LLC. All rights reserved.</p>
              </div>
              <div className="md:text-right">
                <p><strong>Last Sync:</strong> {CONFIG.lastSync}</p>
                <p><strong>Report Basis:</strong> Accrual</p>
                <p><strong>Data as of:</strong> {CONFIG.currentDay}/{CONFIG.daysInMonth} days ({monthProgress}% through month)</p>
                <p className="mt-1"><strong>Next Edition:</strong> Saturday, February 28, 2026</p>
              </div>
            </div>

            {/* Audit Trail */}
            <div className="mt-4 p-2 bg-stone-50 border border-stone-200 text-[8px] text-stone-400">
              <p className="font-bold mb-1">Audit Trail — Key Figures (confirm estimated items with Google Sheets)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <span>Cash: {formatCurrency(consolidated.cash)}</span>
                <span>AR (est.): {formatCurrency(consolidated.ar)}</span>
                <span>AP (est.): {formatCurrency(consolidated.ap)}</span>
                <span>Inventory (est.): {formatCurrency(consolidated.inventory)}</span>
                <span>MTD Revenue: {formatCurrency(consolidated.revenue)}</span>
                <span>MTD EBITDA: {formatCurrency(consolidated.ebitda)}</span>
                <span>TTM Revenue (est.): {formatCurrency(consolidated.ttmRevenue)}</span>
                <span>TTM DSCR (est.): {consolidated.dscr.toFixed(2)}x</span>
              </div>
              <p className="mt-1 italic">Items marked (est.) are calculated from DSO/DIO/DPO or TTM roll-forward — not pulled directly from QBO reports.</p>
            </div>

            <div className="text-center mt-4 text-[8px] text-stone-400 italic">
              — END OF EDITION —
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
