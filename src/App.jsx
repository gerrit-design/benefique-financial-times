import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ReferenceLine, Area, AreaChart, ComposedChart } from 'recharts';

// ============================================================
// THE BENEFIQUE FINANCIAL TIMES - TITAN GROUP
// Edition: January 24, 2026
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
    reportDate: 'January 24, 2026',
    editionNumber: 2,
    periodStart: 'February 2025',
    periodEnd: 'January 2026',
    currentDay: 24,
    daysInMonth: 31,
    isMultiEntity: true,
    entities: ['Distribution', 'Services'],
    hasConsolidated: true,
    primaryColor: '#1e3a5f',
    secondaryColor: '#166534',
    alertColor: '#dc2626',
    dataSource: 'QuickBooks via g-accon',
    lastSync: '2026-01-24 06:22:13',
    spreadsheetIds: {
      distribution: '1RfTsvuqxoFYgk5Jd4JVuyIUlToug9y7bbtsTWheDFew',
      services: '1QEqKj0bS3pD71uH2Z-Ae0cFVLY3rr2HnPKHI9S3yP7E',
      consolidated: '1i2c7Dq93gGAJSc2Df7JoiG5gWc3loX8oGJJIuAiQyeA',
    },
  };

  const monthProgress = Math.round((CONFIG.currentDay / CONFIG.daysInMonth) * 100);

  // ============================================================
  // DATA - January 24, 2026
  // ============================================================

  const summaryMetrics = {
    overallStatus: 'GREEN',
    statusReason: 'Strong January Performance',
    cashRunway: 50,
    ttmNetIncome: 440520,
    mtdNetIncome: 153069,
    ruleOf40Score: 17,
    ruleOf40TTM: 17,
  };

  const cashData = {
    current: 193031,
    prior: 139918,
    change: 53113,
    changePct: 38,
    daysOnHand: 50,
    trend: [
      { week: 'Dec 27', cash: 166675 },
      { week: 'Jan 3', cash: 119415 },
      { week: 'Jan 10', cash: 188960 },
      { week: 'Jan 17', cash: 179300 },
      { week: 'Jan 24', cash: 193031 },
    ],
  };

  const entityData = [
    {
      name: 'Distribution',
      status: 'YELLOW',
      statusNote: 'Revenue down 35% MoM',
      cash: 75742,
      revenue: 168320,
      revenueProjected: 217510,
      revenuePrior: 253638,
      ebitda: 23273,
      ebitdaPct: 14,
      grossMarginPct: 38,
      dscr: 2.44,
      dso: 17,
      dio: 86,
      dpo: 23,
      ccc: 80,
      ar: 277160,
      ap: 84299,
      inventory: 544797,
      ttmRevenue: 3112257,
      ttmNetIncome: 328253,
    },
    {
      name: 'Services',
      status: 'GREEN',
      statusNote: 'Revenue up 16% MoM',
      cash: 117289,
      revenue: 311386,
      revenueProjected: 402466,
      revenuePrior: 269217,
      ebitda: 133820,
      ebitdaPct: 43,
      grossMarginPct: 69,
      dscr: 1.42,
      dso: 13,
      dio: 4,
      dpo: 20,
      ccc: -3,
      ar: 125553,
      ap: 159656,
      inventory: 44618,
      ttmRevenue: 3221203,
      ttmNetIncome: 112267,
    },
  ];

  const consolidated = {
    cash: 193031,
    revenue: 479706,
    revenueProjected: 619976,
    revenuePrior: 522856,
    revenueMoM: -8,
    grossProfit: 277613,
    grossMarginPct: 58,
    ebitda: 157093,
    ebitdaPct: 33,
    ebitdaPrior: -11653,
    netIncome: 153069,
    ttmRevenue: 6333460,
    ttmEbitda: 533941,
    ttmEbitdaPct: 8,
    ttmNetIncome: 440520,
    ttmNetMarginPct: 7,
    dscr: 1.93,
    trueDscr: 1.19,
    debtService: 23066,
    ttmDebtService: 276792,
    dso: 15,
    dio: 44,
    dpo: 22,
    ccc: 37,
    ar: 402714,
    ap: 243955,
    inventory: 589414,
  };

  // Seasonal Comparison - January 2026 vs January 2025
  const seasonalComparison = {
    currentMonth: 'January 2026',
    priorMonth: 'January 2025',
    metrics: [
      { metric: 'Revenue', current: 479706, prior: 478095, change: 0.3 },
      { metric: 'Gross Profit', current: 277613, prior: 152834, change: 81.6 },
      { metric: 'GP %', current: 58, prior: 32, change: 81.3 },
      { metric: 'EBITDA', current: 157093, prior: -23566, change: 767 },
      { metric: 'Cash', current: 193031, prior: 166708, change: 15.8 },
    ],
  };

  const revenueTrend = [
    { month: 'Aug', distribution: 195767, services: 280093, total: 475860 },
    { month: 'Sep', distribution: 188074, services: 158400, total: 346474 },
    { month: 'Oct', distribution: 494486, services: 294372, total: 788858 },
    { month: 'Nov', distribution: 308689, services: 281942, total: 590631 },
    { month: 'Dec', distribution: 253638, services: 269217, total: 522855 },
    { month: 'Jan*', distribution: 217510, services: 402466, total: 619976 },
  ];

  const marginTrend = [
    { month: 'Aug', grossMargin: 31, ebitdaMargin: -4 },
    { month: 'Sep', grossMargin: 21, ebitdaMargin: -25 },
    { month: 'Oct', grossMargin: 38, ebitdaMargin: 14 },
    { month: 'Nov', grossMargin: 30, ebitdaMargin: -1 },
    { month: 'Dec', grossMargin: 35, ebitdaMargin: -2 },
    { month: 'Jan*', grossMargin: 58, ebitdaMargin: 33 },
  ];

  const ruleOf40Data = [
    { month: 'Aug', growth: -19, ebitdaMargin: -4, score: -23 },
    { month: 'Sep', growth: -27, ebitdaMargin: -25, score: -52 },
    { month: 'Oct', growth: 128, ebitdaMargin: 14, score: 142 },
    { month: 'Nov', growth: -25, ebitdaMargin: -1, score: -26 },
    { month: 'Dec', growth: -11, ebitdaMargin: -2, score: -13 },
    { month: 'Jan*', growth: 19, ebitdaMargin: 33, score: 52 },
  ];

  // AR Aging Data
  const arAging = {
    distribution: {
      current: 0,
      days1to30: 277160,
      days31to60: 0,
      days61to90: 0,
      days90plus: 1013,
      total: 278173,
      intercompany: 262782,
      intercompanyPct: 94,
    },
    services: {
      current: 125553,
      days1to30: 0,
      days31to60: 0,
      days61to90: 0,
      days90plus: 0,
      total: 125553,
      intercompany: 0,
      intercompanyPct: 0,
    },
  };

  const topCustomers = [
    { name: 'Titan Marine Services (IC)', amount: 190842, entity: 'Distribution', isIntercompany: true },
    { name: 'Titan Marine St Maarten (IC)', amount: 71326, entity: 'Distribution', isIntercompany: true },
    { name: 'D&C Marine', amount: 5233, entity: 'Distribution', isIntercompany: false },
  ];

  // AP Aging Data
  const apAging = {
    distribution: {
      current: 81058,
      days1to30: 3240,
      days31to60: 0,
      days61to90: 0,
      days90plus: 0,
      total: 84298,
      intercompany: 0,
      intercompanyPct: 0,
    },
    services: {
      current: 0,
      days1to30: 103226,
      days31to60: 62060,
      days61to90: 0,
      days90plus: -5630,
      total: 159656,
      intercompany: 155886,
      intercompanyPct: 98,
    },
  };

  const topVendors = [
    { name: 'Titan Marine Distribution (IC)', amount: 155886, entity: 'Services', isIntercompany: true },
    { name: 'Frigomar Srl', amount: 80106, entity: 'Distribution', isIntercompany: false },
    { name: 'SXM Orders', amount: 7628, entity: 'Services', isIntercompany: false },
  ];

  // YTD vs Prior Year
  const ytdComparison = {
    current: {
      period: 'Jan 2026',
      revenue: 479706,
      grossProfit: 277613,
      ebitda: 157093,
      netIncome: 153069,
    },
    prior: {
      period: 'Jan 2025',
      revenue: 478095,
      grossProfit: 152834,
      ebitda: -23566,
      netIncome: -26566,
    },
    fullYear: {
      prior: {
        year: '2025',
        revenue: 6424700,
        netIncome: 440732,
      },
      projected: {
        year: '2026',
        revenue: 7439712,
        netIncome: 1836828,
      },
    },
  };

  const expenseSpikes = [
    { category: 'Payroll (Wages)', entity: 'Services', current: 53116, average: 15048, variance: 253, status: 'SPIKE' },
    { category: 'Advertising', entity: 'Services', current: -1709, average: 6426, variance: -127, status: 'REVERSAL' },
    { category: 'Rent & Lease', entity: 'Distribution', current: 1931, average: 12539, variance: -85, status: 'LOW' },
  ];

  const ownerDraws = {
    totalCumulative: 618149,
    mtdTotal: 11233,
    mtdPctOfIncome: 7.3,
    partners: [
      { name: 'Francisco', cumulative: 251569, mtd: 1000 },
      { name: 'Ronel', cumulative: 366580, mtd: 10233 },
    ],
  };

  const intercompany = {
    distributionARfromServices: 190842,
    servicesAPtoDistribution: 155886,
    netPosition: 34956,
    direction: 'Services owes Distribution',
  };

  const actionItems = [
    { priority: 1, item: 'Investigate Services payroll spike (+253% vs avg) - verify if this includes catch-up or bonus', entity: 'Services', urgency: 'HIGH' },
    { priority: 2, item: 'Distribution revenue down 35% MoM - verify if timing issue or trend', entity: 'Distribution', urgency: 'MEDIUM' },
    { priority: 3, item: 'Review Distribution rent ($1.9K vs $12.5K avg) - confirm if partial month or accrual issue', entity: 'Distribution', urgency: 'MEDIUM' },
    { priority: 4, item: 'Services AP aging: $62K in 31-60 days (intercompany) - schedule settlement', entity: 'Both', urgency: 'LOW' },
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
      case 'GREEN': return 'bg-green-100 text-green-800 border-green-300';
      case 'YELLOW': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'RED': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'GREEN': return '🟢';
      case 'YELLOW': return '🟡';
      case 'RED': return '🔴';
      default: return '⚪';
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
          <span>Friday Edition</span>
          <span className="hidden md:inline text-stone-400">|</span>
          <span className="italic">{CONFIG.location}</span>
        </div>
        {/* Month Progress Bar */}
        <div className="mt-3 max-w-md mx-auto">
          <div className="flex justify-between text-[9px] text-stone-500 mb-1">
            <span>Month Progress</span>
            <span>{monthProgress}% ({CONFIG.currentDay}/{CONFIG.daysInMonth} days)</span>
          </div>
          <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
            <div className="h-full bg-stone-700 rounded-full" style={{ width: `${monthProgress}%` }}></div>
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
      danger: 'bg-red-50 border-red-300 text-red-900',
      info: 'bg-blue-50 border-blue-300 text-blue-900',
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

          {/* ============================================================ */}
          {/* ABOVE THE FOLD - Lead Story + Key Metrics */}
          {/* ============================================================ */}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            <div className="md:col-span-8">
              <Article
                headline="Titan Posts Exceptional January Margins as Services Surges"
                byline="Benefique Fractional CFO Analysis"
              >
                <p className="first-letter:text-4xl md:first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                  <Dateline location={CONFIG.location} /> The Titan Group enters the final week of January
                  with {formatCurrency(cashData.current)} in combined cash and {cashData.daysOnHand} days of runway,
                  marking a {cashData.changePct}% increase from month-end December. The business is demonstrating
                  strong operational execution with consolidated EBITDA margin at {consolidated.ebitdaPct}%.
                </p>

                <p className="mt-3">
                  At {monthProgress}% through the month, consolidated revenue stands at {formatCurrency(consolidated.revenue)} with
                  a projected full-month total of {formatCurrency(consolidated.revenueProjected)}. The standout story is the
                  dramatic margin improvement — EBITDA has swung from negative {formatCurrency(Math.abs(consolidated.ebitdaPrior))} in
                  December to positive {formatCurrency(consolidated.ebitda)} this month.
                </p>

                <PullQuote
                  quote="Services is carrying the month with 69% gross margins and 43% EBITDA. Distribution's 35% revenue decline needs verification — likely timing rather than trend."
                  attribution="CFO Analysis"
                />

                <p>
                  Year-over-year, January 2026 revenue is flat versus January 2025 ({formatCurrency(ytdComparison.current.revenue)} vs {formatCurrency(ytdComparison.prior.revenue)}),
                  but profitability has transformed: EBITDA improved from negative {formatCurrency(Math.abs(ytdComparison.prior.ebitda))} to
                  positive {formatCurrency(ytdComparison.current.ebitda)} — a {formatCurrency(ytdComparison.current.ebitda - ytdComparison.prior.ebitda)} swing.
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
                  Cash up {formatCurrency(cashData.change)} (+{cashData.changePct}%) since Dec 27
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
                    <Bar dataKey="services" stackId="a" fill="#166534" name="Services" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-[10px] text-stone-500 mt-1">*January projected based on {monthProgress}% month complete</p>
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
                  subtext="Trailing 12 Months"
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
                    TTM EBITDA Margin: {consolidated.ttmEbitdaPct}% + Est. Growth: ~9%
                  </p>
                  <p className="text-[10px] mt-1">
                    {summaryMetrics.ruleOf40TTM >= 40 ? 'Healthy balance of growth and profit' :
                     summaryMetrics.ruleOf40TTM >= 25 ? 'Acceptable - monitor trajectory' :
                     'Below target - focus on growth or margins'}
                  </p>
                </AlertBox>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: SEASONAL COMPARISON */}
          {/* ============================================================ */}

          <SectionHeader title="Seasonal Comparison" subtitle="January 2026 vs January 2025 — Same Period Analysis" />

          <div className="mb-6">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-800">
                  <th className="py-2 text-left font-serif font-bold">Metric</th>
                  <th className="py-2 text-right font-serif font-bold">Jan 2025</th>
                  <th className="py-2 text-right font-serif font-bold">Jan 2026</th>
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
              Key Insight: Revenue is flat YoY, but gross profit nearly doubled and EBITDA swung from -$24K to +$157K.
              This reflects improved operational efficiency and better margin management.
            </p>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: CONSOLIDATED VIEW */}
          {/* ============================================================ */}

          <SectionHeader title="Consolidated View" subtitle="Combined Distribution + Services Performance" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <StatBox label="Combined Cash" value={formatCurrency(consolidated.cash)} trend={cashData.changePct} />
            <StatBox label="MTD Revenue" value={formatCurrency(consolidated.revenue)} subtext={`Proj: ${formatCurrency(consolidated.revenueProjected)}`} />
            <StatBox label="MTD EBITDA" value={formatCurrency(consolidated.ebitda)} subtext={`${consolidated.ebitdaPct}% margin`} />
            <StatBox label="TTM Revenue" value={formatCurrency(consolidated.ttmRevenue)} />
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
                    <p className="text-[9px] uppercase text-stone-500">TTM DSCR</p>
                    <p className="font-bold text-lg">{entity.dscr.toFixed(2)}x</p>
                  </div>
                </div>

                <div className="text-[11px] text-stone-700 space-y-1">
                  <p><strong>Revenue MTD:</strong> {formatCurrency(entity.revenue)} → Proj: {formatCurrency(entity.revenueProjected)}</p>
                  <p><strong>vs Prior Month:</strong> {formatCurrency(entity.revenuePrior)} ({entity.revenue > entity.revenuePrior ? '+' : ''}{Math.round((entity.revenue - entity.revenuePrior) / entity.revenuePrior * 100)}%)</p>
                  <p><strong>Working Capital:</strong> DSO {entity.dso}d / DIO {entity.dio}d / DPO {entity.dpo}d</p>
                  <p><strong>CCC:</strong> <span className={entity.ccc < 0 ? 'text-green-700 font-medium' : entity.ccc > 60 ? 'text-amber-600' : ''}>{entity.ccc} days</span></p>
                  <p><strong>AR:</strong> {formatCurrency(entity.ar)} / <strong>AP:</strong> {formatCurrency(entity.ap)}</p>
                  {entity.inventory > 100000 && <p><strong>Inventory:</strong> {formatCurrency(entity.inventory)}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Intercompany Position */}
          <div className="bg-stone-100 p-4 mb-6 border border-stone-300">
            <h4 className="font-serif font-bold text-sm mb-2">Intercompany Position</h4>
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
              Note: 94% of Distribution AR and 98% of Services AP is intercompany. External working capital is healthy.
            </p>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: AR/AP ANALYSIS */}
          {/* ============================================================ */}

          <SectionHeader title="Receivables & Payables Analysis" subtitle="Aging, Concentration, and Collection Status" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* AR Aging */}
            <div>
              <h4 className="font-serif font-bold text-sm mb-3">Accounts Receivable Aging</h4>
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
              <h5 className="font-serif font-bold text-xs mt-4 mb-2">Top 3 Customers</h5>
              <div className="space-y-1">
                {topCustomers.map((cust, idx) => (
                  <div key={idx} className="flex justify-between text-[10px] p-1 bg-stone-50">
                    <span>
                      {cust.name}
                      {cust.isIntercompany && <span className="ml-1 px-1 bg-blue-100 text-blue-700 text-[8px] rounded">INTERCO</span>}
                    </span>
                    <span className="font-medium">{formatCurrency(cust.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AP Aging */}
            <div>
              <h4 className="font-serif font-bold text-sm mb-3">Accounts Payable Aging</h4>
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
              <h5 className="font-serif font-bold text-xs mt-4 mb-2">Top 3 Vendors</h5>
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
              <h4 className="font-serif font-bold text-sm mb-3">January Comparison</h4>
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-stone-300">
                    <th className="py-1 text-left">Metric</th>
                    <th className="py-1 text-right">Jan 2025</th>
                    <th className="py-1 text-right">Jan 2026</th>
                    <th className="py-1 text-right">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone-200">
                    <td className="py-1">Revenue</td>
                    <td className="py-1 text-right text-stone-500">{formatCurrency(ytdComparison.prior.revenue)}</td>
                    <td className="py-1 text-right">{formatCurrency(ytdComparison.current.revenue)}</td>
                    <td className="py-1 text-right text-green-700">+0.3%</td>
                  </tr>
                  <tr className="border-b border-stone-200">
                    <td className="py-1">Gross Profit</td>
                    <td className="py-1 text-right text-stone-500">{formatCurrency(ytdComparison.prior.grossProfit)}</td>
                    <td className="py-1 text-right">{formatCurrency(ytdComparison.current.grossProfit)}</td>
                    <td className="py-1 text-right text-green-700">+81.6%</td>
                  </tr>
                  <tr className="border-b border-stone-200">
                    <td className="py-1">EBITDA</td>
                    <td className="py-1 text-right text-red-600">{formatCurrency(ytdComparison.prior.ebitda)}</td>
                    <td className="py-1 text-right">{formatCurrency(ytdComparison.current.ebitda)}</td>
                    <td className="py-1 text-right text-green-700">+$181K</td>
                  </tr>
                  <tr>
                    <td className="py-1">Net Income</td>
                    <td className="py-1 text-right text-red-600">{formatCurrency(ytdComparison.prior.netIncome)}</td>
                    <td className="py-1 text-right">{formatCurrency(ytdComparison.current.netIncome)}</td>
                    <td className="py-1 text-right text-green-700">+$180K</td>
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
                *2026 projection based on Jan run rate. Actual will vary with seasonality.
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
                  <Bar dataKey="grossMargin" fill="#166534" name="Gross Margin" />
                  <Line type="monotone" dataKey="ebitdaMargin" stroke="#1e3a5f" strokeWidth={2} name="EBITDA Margin" dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-stone-500 mt-1">*January projected based on {monthProgress}% month complete</p>
            </div>

            <div className="border border-stone-300 p-3">
              <h4 className="font-serif font-bold text-sm mb-2">Rule of 40 Trend (Monthly)</h4>
              <ResponsiveContainer width="100%" height={150}>
                <ComposedChart data={ruleOf40Data}>
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} domain={[-60, 150]} />
                  <Tooltip />
                  <ReferenceLine y={40} stroke="#166534" strokeDasharray="5 5" label={{ value: 'Target: 40', fontSize: 9, fill: '#166534' }} />
                  <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />
                  <Bar dataKey="score" name="Rule of 40 Score">
                    {ruleOf40Data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.score >= 40 ? '#166534' : entry.score >= 25 ? '#d97706' : '#dc2626'} />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-stone-500 mt-1">Rule of 40 = MoM Revenue Growth % + EBITDA Margin %</p>
            </div>
          </div>

          {/* TTM Rule of 40 Breakdown */}
          <div className="bg-stone-50 p-4 border border-stone-300 mb-6">
            <h4 className="font-serif font-bold text-sm mb-3">TTM Rule of 40 Breakdown</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-[10px] text-stone-500 uppercase">TTM Revenue Growth</p>
                <p className="text-2xl font-bold">~9%</p>
                <p className="text-[9px] text-stone-500">YoY estimate</p>
              </div>
              <div className="text-2xl font-bold self-center">+</div>
              <div>
                <p className="text-[10px] text-stone-500 uppercase">TTM EBITDA Margin</p>
                <p className="text-2xl font-bold">{consolidated.ttmEbitdaPct}%</p>
                <p className="text-[9px] text-stone-500">{formatCurrency(consolidated.ttmEbitda)} / {formatCurrency(consolidated.ttmRevenue)}</p>
              </div>
            </div>
            <div className="text-center mt-3 pt-3 border-t border-stone-300">
              <p className="text-[10px] text-stone-500 uppercase">TTM Rule of 40 Score</p>
              <p className={`text-3xl font-bold ${summaryMetrics.ruleOf40TTM >= 40 ? 'text-green-700' : summaryMetrics.ruleOf40TTM >= 25 ? 'text-amber-600' : 'text-red-600'}`}>
                {summaryMetrics.ruleOf40TTM}
              </p>
              <p className="text-[9px] text-stone-500 mt-1">
                {summaryMetrics.ruleOf40TTM >= 40 ? 'HEALTHY - Strong balance' :
                 summaryMetrics.ruleOf40TTM >= 25 ? 'ACCEPTABLE - Room for improvement' :
                 'BELOW TARGET - Focus needed'}
              </p>
            </div>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: EXPENSE WATCH */}
          {/* ============================================================ */}

          <SectionHeader title="Expense Watch" subtitle="Variance Analysis vs. 4-Month Trailing Average" />

          <div className="mb-6">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-800">
                  <th className="py-2 text-left font-serif font-bold">Category</th>
                  <th className="py-2 text-left font-serif font-bold">Entity</th>
                  <th className="py-2 text-right font-serif font-bold">Current</th>
                  <th className="py-2 text-right font-serif font-bold">4-Mo Avg</th>
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
                    <td className={`py-2 text-right font-medium ${spike.variance > 0 ? 'text-red-600' : 'text-green-700'}`}>
                      {spike.variance > 0 ? '+' : ''}{spike.variance}%
                    </td>
                    <td className="py-2 text-center">
                      <span className={`px-2 py-1 text-[9px] font-bold rounded ${
                        spike.status === 'SPIKE' ? 'bg-red-100 text-red-700' :
                        spike.status === 'REVERSAL' ? 'bg-blue-100 text-blue-700' :
                        spike.status === 'LOW' ? 'bg-amber-100 text-amber-700' :
                        'bg-stone-100 text-stone-700'
                      }`}>
                        {spike.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[10px] text-stone-500 mt-2 italic">
              Note: Services payroll shows $53K wages vs $15K average — verify if this includes catch-up entries, bonuses, or misclassification.
              Distribution rent at $1.9K vs $12.5K average needs confirmation.
            </p>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: OWNER DRAWS */}
          {/* ============================================================ */}

          <SectionHeader title="Owner Distributions" subtitle="Partner Draws and Equity Movement" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-stone-50 border border-stone-200">
              <p className="text-[10px] uppercase text-stone-500">MTD Draws</p>
              <p className="font-bold text-2xl">{formatCurrency(ownerDraws.mtdTotal)}</p>
              <p className="text-[10px] text-stone-500">{ownerDraws.mtdPctOfIncome}% of MTD Net Income</p>
              <p className={`text-[9px] mt-1 ${ownerDraws.mtdPctOfIncome < 30 ? 'text-green-600' : ownerDraws.mtdPctOfIncome < 60 ? 'text-amber-600' : 'text-red-600'}`}>
                {ownerDraws.mtdPctOfIncome < 30 ? 'Conservative' : ownerDraws.mtdPctOfIncome < 60 ? 'Moderate' : 'High'}
              </p>
            </div>
            <div className="text-center p-4 bg-stone-50 border border-stone-200">
              <p className="text-[10px] uppercase text-stone-500">Cumulative Distributions</p>
              <p className="font-bold text-2xl">{formatCurrency(ownerDraws.totalCumulative)}</p>
              <p className="text-[10px] text-stone-500">TTM Total</p>
            </div>
            <div className="p-4 bg-stone-50 border border-stone-200">
              <p className="text-[10px] uppercase text-stone-500 mb-2">By Partner</p>
              {ownerDraws.partners.map((partner) => (
                <div key={partner.name} className="flex justify-between text-[11px] mb-1">
                  <span>{partner.name}</span>
                  <span className="font-medium">{formatCurrency(partner.mtd)} MTD / {formatCurrency(partner.cumulative)} TTM</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SECTION: ACTION ITEMS */}
          {/* ============================================================ */}

          <SectionHeader title="Action Items" subtitle="Items Requiring Attention" />

          <div className="mb-6">
            {actionItems.map((item, idx) => (
              <div key={idx} className={`flex items-start gap-3 p-3 mb-2 border-l-4 ${
                item.urgency === 'HIGH' ? 'border-red-500 bg-red-50' :
                item.urgency === 'MEDIUM' ? 'border-amber-500 bg-amber-50' :
                'border-stone-300 bg-stone-50'
              }`}>
                <span className="font-bold text-stone-400">#{item.priority}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.item}</p>
                  <p className="text-[10px] text-stone-500">{item.entity}</p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-1 rounded ${
                  item.urgency === 'HIGH' ? 'bg-red-200 text-red-800' :
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
                <p className="mt-1"><strong>Next Edition:</strong> Saturday, February 1, 2026</p>
              </div>
            </div>

            {/* Audit Trail */}
            <div className="mt-4 p-2 bg-stone-50 border border-stone-200 text-[8px] text-stone-400">
              <p className="font-bold mb-1">Audit Trail - Key Figures</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <span>Cash: {formatCurrency(consolidated.cash)}</span>
                <span>AR: {formatCurrency(consolidated.ar)}</span>
                <span>AP: {formatCurrency(consolidated.ap)}</span>
                <span>Inventory: {formatCurrency(consolidated.inventory)}</span>
                <span>MTD Revenue: {formatCurrency(consolidated.revenue)}</span>
                <span>MTD EBITDA: {formatCurrency(consolidated.ebitda)}</span>
                <span>TTM Revenue: {formatCurrency(consolidated.ttmRevenue)}</span>
                <span>TTM DSCR: {consolidated.dscr.toFixed(2)}x</span>
              </div>
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
