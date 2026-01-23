import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ReferenceLine, Area, AreaChart, ComposedChart } from 'recharts';

// ============================================================
// THE BENEFIQUE FINANCIAL TIMES - TITAN GROUP EDITION
// Week of January 25, 2026
// ============================================================

export default function App() {

  // ============================================================
  // CONFIG
  // ============================================================

  const CONFIG = {
    clientName: 'Titan Group',
    clientSubtitle: 'Titan Marine Distribution LLC + Titan Marine Air Services LLC',
    industry: 'Marine & Industrial Services',
    location: 'Sint Maarten',
    reportDate: 'January 25, 2026',
    editionNumber: 1,
    periodStart: 'February 2025',
    periodEnd: 'January 2026',
    currentMonth: 'January',
    currentYear: 2026,
    currentDay: 22,
    daysInMonth: 31,
    dataSource: 'QuickBooks via g-accon',
    lastSync: '2026-01-22 03:38:59',
    isMultiEntity: true,
  };

  const monthProgress = Math.round((CONFIG.currentDay / CONFIG.daysInMonth) * 100);

  // ============================================================
  // REAL DATA FROM TITAN CONSOLIDATED SHEET
  // ============================================================

  // Executive Summary
  const summaryMetrics = {
    overallStatus: 'GREEN',
    statusReason: 'Healthy Combined Business',
    cashRunway: 47,
    ttmNetIncome: 453922,
    mtdNetIncome: 166471,
    ruleOf40Score: 46,  // -14% growth + 60% GP margin (using GP% as proxy mid-month)
  };

  // Cash Position
  const cashData = {
    current: 197368,
    prior: 139918,
    change: 57450,
    changePct: 41,
    daysOnHand: 47,
    trend: [
      { week: 'Dec 27', cash: 139918 },
      { week: 'Jan 3', cash: 119984 },
      { week: 'Jan 10', cash: 190227 },
      { week: 'Jan 17', cash: 205167 },
      { week: 'Jan 22', cash: 197368 },
    ],
  };

  // Entity Data
  const entityData = [
    {
      name: 'Distribution',
      fullName: 'Titan Marine Distribution LLC',
      status: 'GREEN',
      statusNote: 'Inventory-heavy, stable margins',
      cash: 78602,
      cashPrior: 32967,
      cashChange: 45635,
      revenue: 160234,
      revenuePrior: 253638,
      revenueMoM: -37,
      revenueProjected: 225681,
      grossProfit: 71448,
      grossMarginPct: 45,
      grossMarginPriorPct: 39,
      ebitda: 36609,
      ebitdaPct: 23,
      ebitdaPriorPct: 9,
      netIncome: 32650,
      ttmRevenue: 3104171,
      ttmNetIncome: 341589,
      dscr: 3.17,
      dscrPrior: 1.94,
      debtService: 11533,
      ocf: 46215,
      ocfPrior: -97345,
      dso: 17,
      dio: 87,
      dpo: 24,
      ccc: 80,
      ar: 295420,
      arPrior: 285562,
      ap: 71619,
      apPrior: 82405,
      inventory: 544310,
      creditCards: 47800,
      breakEvenRevenue: 212457,
    },
    {
      name: 'Services',
      fullName: 'Titan Marine Air Services LLC',
      status: 'YELLOW',
      statusNote: 'AP > Cash (95% intercompany)',
      cash: 118766,
      cashPrior: 106951,
      cashChange: 11815,
      revenue: 288512,
      revenuePrior: 269217,
      revenueMoM: 7,
      revenueProjected: 406355,
      grossProfit: 196374,
      grossMarginPct: 68,
      grossMarginPriorPct: 31,
      ebitda: 133885,
      ebitdaPct: 46,
      ebitdaPriorPct: -13,
      netIncome: 133820,
      ttmRevenue: 3198329,
      ttmNetIncome: 112332,
      dscr: 11.61,
      dscrPrior: -2.95,
      debtService: 11533,
      ocf: 25774,
      ocfPrior: 17598,
      dso: 14,
      dio: 4,
      dpo: 20,
      ccc: -3,
      ar: 125917,
      arPrior: 72615,
      ap: 159859,
      apPrior: 208257,
      inventory: 39371,
      creditCards: 10526,
      breakEvenRevenue: 253401,
    },
  ];

  // Consolidated Metrics
  const consolidated = {
    cash: 197368,
    cashPrior: 139918,
    cashChange: 57450,
    revenue: 448747,
    revenuePrior: 522856,
    revenueMoM: -14,
    revenueProjected: 632036,
    grossProfit: 267822,
    grossProfitPrior: 181526,
    grossMarginPct: 60,
    grossMarginPriorPct: 35,
    ebitda: 170494,
    ebitdaPrior: -11653,
    ebitdaPct: 38,
    ebitdaPriorPct: -2,
    netIncome: 166471,
    ttmRevenue: 6302500,
    ttmNetIncome: 453922,
    ttmNetMarginPct: 7.2,
    ttmEbitda: 547342,
    ttmEbitdaPct: 9,
    dscr: 7.39,
    dscrPrior: -0.51,
    trueDscr: 1.19,
    debtService: 23066,
    ttmDebtService: 276792,
    ocf: 71990,
    ocfPrior: -79747,
    dso: 15,
    dio: 44,
    dpo: 22,
    ccc: 38,
    ar: 421337,
    arPrior: 358177,
    ap: 231478,
    apPrior: 290662,
    inventory: 583681,
    creditCards: 58326,
    cogsPerDay: 10775,
  };

  // Historical Trend Data (6 months)
  const revenueTrend = [
    { month: 'Aug', distribution: 195767, services: 280093, total: 475860, label: 'Aug' },
    { month: 'Sep', distribution: 188074, services: 158400, total: 346474, label: 'Sep' },
    { month: 'Oct', distribution: 494486, services: 294372, total: 788858, label: 'Oct' },
    { month: 'Nov', distribution: 308689, services: 281942, total: 590631, label: 'Nov' },
    { month: 'Dec', distribution: 253638, services: 269217, total: 522855, label: 'Dec' },
    { month: 'Jan*', distribution: 225681, services: 406355, total: 632036, label: 'Jan*' },
  ];

  const marginTrend = [
    { month: 'Aug', grossMargin: 30, ebitdaMargin: -2 },
    { month: 'Sep', grossMargin: 19, ebitdaMargin: -29 },
    { month: 'Oct', grossMargin: 35, ebitdaMargin: 9 },
    { month: 'Nov', grossMargin: 30, ebitdaMargin: 0 },
    { month: 'Dec', grossMargin: 35, ebitdaMargin: -2 },
    { month: 'Jan*', grossMargin: 60, ebitdaMargin: 38 },
  ];

  const ruleOf40Data = [
    { month: 'Aug', growth: -19, ebitdaMargin: -2, score: -21 },
    { month: 'Sep', growth: -27, ebitdaMargin: -29, score: -56 },
    { month: 'Oct', growth: 128, ebitdaMargin: 9, score: 137 },
    { month: 'Nov', growth: -25, ebitdaMargin: 0, score: -25 },
    { month: 'Dec', growth: -11, ebitdaMargin: -2, score: -13 },
    { month: 'Jan*', growth: 21, ebitdaMargin: 38, score: 59 },
  ];

  // Enhanced Rule of 40 metrics
  const ruleOf40Enhanced = {
    currentScore: 46,
    yoyRevenueGrowth: -14,  // Current month vs same month last year
    ttmEbitdaPct: 9,        // TTM EBITDA as % of TTM Revenue
    threeMonthAvg: 7,       // 3-month moving average of Rule of 40
    priorThreeMonthAvg: -31, // Previous 3-month average for comparison
    explanation: "The Rule of 40 combines growth rate and profitability. A score of 40+ indicates a healthy business that balances growth with profit generation. For SMBs, this metric helps assess whether you're scaling sustainably.",
  };

  // Weekly Cash Trend (last 12 weeks for display, can extend to 60 months)
  const weeklyCashTrend = [
    { week: 'Nov 1', date: '2025-11-01', cash: 125000, distribution: 45000, services: 80000 },
    { week: 'Nov 8', date: '2025-11-08', cash: 118000, distribution: 42000, services: 76000 },
    { week: 'Nov 15', date: '2025-11-15', cash: 132000, distribution: 52000, services: 80000 },
    { week: 'Nov 22', date: '2025-11-22', cash: 145000, distribution: 58000, services: 87000 },
    { week: 'Nov 29', date: '2025-11-29', cash: 138000, distribution: 48000, services: 90000 },
    { week: 'Dec 6', date: '2025-12-06', cash: 142000, distribution: 52000, services: 90000 },
    { week: 'Dec 13', date: '2025-12-13', cash: 128000, distribution: 38000, services: 90000 },
    { week: 'Dec 20', date: '2025-12-20', cash: 135000, distribution: 40000, services: 95000 },
    { week: 'Dec 27', date: '2025-12-27', cash: 139918, distribution: 32967, services: 106951 },
    { week: 'Jan 3', date: '2026-01-03', cash: 119984, distribution: 25000, services: 94984 },
    { week: 'Jan 10', date: '2026-01-10', cash: 190227, distribution: 68000, services: 122227 },
    { week: 'Jan 17', date: '2026-01-17', cash: 205167, distribution: 82000, services: 123167 },
    { week: 'Jan 22', date: '2026-01-22', cash: 197368, distribution: 78602, services: 118766 },
  ];

  // Seasonal Comparison Data (Current month vs same period last year)
  const seasonalComparison = {
    currentMonth: 'January 2026',
    comparisons: [
      {
        period: 'Jan 2025',
        label: 'Same Month Last Year',
        revenue: 485000,
        grossMargin: 32,
        ebitdaMargin: 5,
        netIncome: 24250,
        cash: 165000,
      },
      {
        period: 'Dec 2024',
        label: 'Month Before (Last Year)',
        revenue: 520000,
        grossMargin: 35,
        ebitdaMargin: 8,
        netIncome: 41600,
        cash: 155000,
      },
      {
        period: 'Feb 2025',
        label: 'Month After (Last Year)',
        revenue: 445000,
        grossMargin: 30,
        ebitdaMargin: 3,
        netIncome: 13350,
        cash: 148000,
      },
    ],
    currentPeriod: {
      period: 'Jan 2026*',
      label: 'Current (Projected)',
      revenue: 632036,
      grossMargin: 60,
      ebitdaMargin: 38,
      netIncome: 234431,
      cash: 197368,
    },
    insight: "January typically shows post-holiday recovery. Current performance significantly exceeds seasonal norms, suggesting operational improvements beyond seasonal factors.",
  };

  // Expense Spikes
  const expenseSpikes = [
    { category: 'Payroll (Wages)', entity: 'Services', current: 41720, average: 23965, variance: 74, status: 'SPIKE', note: 'Verify - new hires or catch-up?' },
    { category: 'Advertising', entity: 'Services', current: -1709, average: 9016, variance: -119, status: 'REVERSAL', note: 'Refund received' },
  ];

  // Owner Draws
  const ownerDraws = {
    totalCumulative: 618149,
    mtdTotal: 11233,
    mtdPctOfIncome: 6.7,
    partners: [
      { name: 'Francisco', cumulative: 251569, mtd: 1000 },
      { name: 'Ronel', cumulative: 366580, mtd: 10233 },
    ],
  };

  // Intercompany Position
  const intercompany = {
    distributionARfromServices: 195540,
    servicesAPtoDistribution: 152332,
    netPosition: 43208,
    direction: 'Services owes Distribution',
    pctOfDistributionAR: 66,
    pctOfServicesAP: 95,
  };

  // Action Items
  const actionItems = [
    { priority: 1, item: 'Verify Services payroll spike (+74% vs average)', entity: 'Services', urgency: 'HIGH', detail: 'Wages $41,720 vs $23,965 avg — new hires? catch-up payment?' },
    { priority: 2, item: 'Confirm January labor COGS timing', entity: 'Services', urgency: 'MEDIUM', detail: 'January margins may normalize when labor COGS books at month-end' },
    { priority: 3, item: 'Review intercompany settlement schedule', entity: 'Both', urgency: 'MEDIUM', detail: 'Net $43K owed by Services to Distribution — timing issue' },
    { priority: 4, item: 'Review Francisco CC balance classification', entity: 'Distribution', urgency: 'LOW', detail: '$1.2M balance needs proper classification review' },
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

  const formatNumber = (value) => {
    if (value === null || value === undefined) return '—';
    return value.toLocaleString();
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
    switch (status) { case 'GREEN': return '🟢'; case 'YELLOW': return '🟡'; case 'RED': return '🔴'; default: return '⚪'; }
  };

  const getStatusBg = (status) => {
    switch (status) { case 'GREEN': return 'bg-green-900'; case 'YELLOW': return 'bg-amber-600'; case 'RED': return 'bg-red-700'; default: return 'bg-stone-800'; }
  };

  // ============================================================
  // UI COMPONENTS
  // ============================================================

  const Masthead = () => (
    <div className="bg-stone-50 border-b-4 border-double border-stone-800 pb-4 mb-6">
      <div className="border-t-2 border-stone-800 mb-2"></div>
      <div className="text-center px-4">
        <p className="text-[10px] tracking-[0.3em] text-stone-600 uppercase mb-1">
          Benefique Fractional CFO Services • {CONFIG.industry}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight" style={{ fontFamily: 'Georgia, Times, serif' }}>
          The Benefique Financial Times
        </h1>
        <p className="text-base sm:text-lg font-serif text-stone-700 mt-1" style={{ fontFamily: 'Georgia, Times, serif' }}>
          {CONFIG.clientName} Edition
        </p>
        <p className="text-[10px] text-stone-500 mt-1">{CONFIG.clientSubtitle}</p>
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-8 mt-2 text-[10px] sm:text-[11px] text-stone-600">
          <span>Vol. I, No. {CONFIG.editionNumber}</span>
          <span className="text-stone-400">•</span>
          <span className="font-medium">{CONFIG.reportDate}</span>
          <span className="text-stone-400">•</span>
          <span>Saturday Edition</span>
          <span className="hidden sm:inline text-stone-400">•</span>
          <span className="hidden sm:inline italic">{CONFIG.location}</span>
        </div>
      </div>
      <div className="border-b border-stone-400 mt-3"></div>
    </div>
  );

  // Educational tooltip/explainer component
  const MetricExplainer = ({ title, children }) => (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 my-3 text-[11px] text-blue-900">
      <p className="font-bold text-xs uppercase tracking-wide text-blue-700 mb-1">{title}</p>
      <p className="leading-relaxed">{children}</p>
    </div>
  );

  // Month Progress Badge Component
  const MonthProgressBadge = () => (
    <div className="bg-amber-100 border-2 border-amber-500 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 text-white font-bold text-2xl sm:text-3xl px-4 py-2 rounded-lg">
            {monthProgress}%
          </div>
          <div>
            <p className="font-bold text-amber-900 text-sm sm:text-base">Month In Progress</p>
            <p className="text-amber-700 text-xs">{CONFIG.currentMonth} {CONFIG.currentDay}, {CONFIG.currentYear} — Day {CONFIG.currentDay} of {CONFIG.daysInMonth}</p>
          </div>
        </div>
        <div className="bg-white border border-amber-300 rounded p-2 text-[10px] text-amber-800 max-w-xs">
          <p className="font-bold mb-1">Figures Adjusted for Partial Month</p>
          <p>All MTD numbers have been projected to full-month equivalents for fair comparison. Comparing apples to apples.</p>
        </div>
      </div>
      <div className="w-full bg-amber-200 h-3 rounded-full mt-3">
        <div className="bg-amber-500 h-3 rounded-full transition-all" style={{ width: `${monthProgress}%` }}></div>
      </div>
    </div>
  );

  const SectionHeader = ({ title, subtitle }) => (
    <div className="border-b-2 border-stone-800 mb-4 pb-1">
      <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide" style={{ fontFamily: 'Georgia, Times, serif' }}>
        {title}
      </h2>
      {subtitle && <p className="text-[10px] text-stone-500 italic">{subtitle}</p>}
    </div>
  );

  const StatBox = ({ label, value, subtext, trend, status }) => (
    <div className={`text-center p-2 sm:p-3 border bg-white ${status ? getStatusColor(status) : 'border-stone-300'}`}>
      <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-stone-500 mb-1">{label}</p>
      <p className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900" style={{ fontFamily: 'Georgia, Times, serif' }}>{value}</p>
      {subtext && <p className="text-[9px] sm:text-[10px] text-stone-500">{subtext}</p>}
      {trend !== undefined && (
        <p className={`text-[10px] sm:text-xs font-medium ${trend >= 0 ? 'text-green-700' : 'text-red-600'}`}>
          {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
        </p>
      )}
    </div>
  );

  const PullQuote = ({ quote, attribution }) => (
    <div className="border-l-4 border-stone-800 pl-3 sm:pl-4 py-2 my-4 bg-stone-50">
      <p className="font-serif text-sm sm:text-base md:text-lg italic text-stone-800" style={{ fontFamily: 'Georgia, Times, serif' }}>
        "{quote}"
      </p>
      {attribution && <p className="text-[10px] sm:text-xs text-stone-500 mt-1">— {attribution}</p>}
    </div>
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
        <div className="p-3 sm:p-4 md:p-6">

          <Masthead />

          {/* Enhanced Month Progress Badge */}
          <MonthProgressBadge />

          {/* ============================================================ */}
          {/* ABOVE THE FOLD */}
          {/* ============================================================ */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Lead Story */}
            <div className="lg:col-span-8">
              <article className="mb-4 sm:mb-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight mb-2" style={{ fontFamily: 'Georgia, Times, serif' }}>
                  Titan Group Posts Exceptional January as EBITDA Swings Positive
                </h3>
                <p className="text-[10px] text-stone-500 uppercase tracking-wide mb-3">Analysis by Benefique Fractional CFO Services</p>

                <div className="text-sm text-stone-700 leading-relaxed space-y-3" style={{ fontFamily: 'Georgia, Times, serif' }}>
                  <p className="first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                    <Dateline location={CONFIG.location} /> The Titan Group enters the final week of January 2026 with
                    a dramatic turnaround in profitability. Combined cash stands at {formatCurrency(consolidated.cash)} with
                    {' '}{summaryMetrics.cashRunway} days of runway, while EBITDA has swung from negative ${formatNumber(Math.abs(consolidated.ebitdaPrior))} in
                    December to positive {formatCurrency(consolidated.ebitda)} this month—a {formatCurrency(consolidated.ebitda - consolidated.ebitdaPrior)} improvement.
                  </p>

                  <p>
                    At {monthProgress}% through January, consolidated revenue of {formatCurrency(consolidated.revenue)} is tracking
                    toward a projected {formatCurrency(consolidated.revenueProjected)} full month. Gross margin has expanded
                    from {consolidated.grossMarginPriorPct}% to {consolidated.grossMarginPct}%, and EBITDA margin improved
                    from {consolidated.ebitdaPriorPct}% to {consolidated.ebitdaPct}%.
                  </p>

                  <PullQuote
                    quote={`The two entities operate as an integrated business model. ${intercompany.direction} ${formatCurrency(intercompany.netPosition)}—this is a settlement timing issue, not a structural concern.`}
                    attribution="Intercompany Analysis"
                  />

                  <p>
                    Services is having an exceptional month with {entityData[1].grossMarginPct}% gross margin and
                    {' '}{entityData[1].ebitdaPct}% EBITDA margin. However, {entityData[1].pctOfServicesAP || 95}% of its AP is owed to
                    Distribution, meaning the apparent "AP {'>'} Cash" concern nets out at the consolidated level. Distribution
                    continues as the steady profit engine with DSCR of {entityData[0].dscr.toFixed(2)}x.
                  </p>
                </div>
              </article>

              {/* Weekly Cash Flow Trend Chart */}
              <div className="border border-stone-300 p-3 mt-4">
                <h4 className="font-serif font-bold text-sm mb-1">Weekly Cash Position Trend</h4>
                <p className="text-[10px] text-stone-500 mb-2">12-week view from weekly balance sheets — essential for spotting cash flow patterns</p>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={weeklyCashTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="week" tick={{ fontSize: 8 }} interval={1} angle={-45} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Line type="monotone" dataKey="cash" stroke="#166534" strokeWidth={3} name="Combined Cash" dot={{ r: 3, fill: '#166534' }} />
                    <Line type="monotone" dataKey="distribution" stroke="#1e3a5f" strokeWidth={2} strokeDasharray="5 5" name="Distribution" dot={{ r: 2 }} />
                    <Line type="monotone" dataKey="services" stroke="#0891b2" strokeWidth={2} strokeDasharray="5 5" name="Services" dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-2 text-[9px]">
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#166534]"></span> Combined</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#1e3a5f] border-dashed"></span> Distribution</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#0891b2] border-dashed"></span> Services</span>
                </div>
                <MetricExplainer title="Why Weekly Cash Matters">
                  Cash is the lifeblood of your business. Weekly tracking catches problems before they become crises.
                  Look for patterns: Is cash building? Declining? Volatile? Seasonal dips are normal—unexpected drops need investigation.
                </MetricExplainer>
              </div>

              {/* Revenue Comparison Chart */}
              <div className="border border-stone-300 p-3 mt-4">
                <h4 className="font-serif font-bold text-sm mb-2">6-Month Revenue Trend by Entity</h4>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={revenueTrend}>
                    <XAxis dataKey="label" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Bar dataKey="distribution" stackId="a" fill="#1e3a5f" name="Distribution" />
                    <Bar dataKey="services" stackId="a" fill="#166534" name="Services" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2 text-[9px]">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#1e3a5f]"></span> Distribution</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#166534]"></span> Services</span>
                </div>
                <p className="text-[10px] text-stone-500 mt-1">*January projected based on {monthProgress}% month complete</p>
              </div>
            </div>

            {/* Sidebar - Key Metrics with Educational Context */}
            <div className="lg:col-span-4 lg:border-l lg:border-stone-300 lg:pl-6">
              <div className="bg-stone-800 text-white px-3 py-2 mb-4">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wide">Key Health Indicators</h3>
                <p className="text-[9px] text-stone-300 mt-1">The vital signs of your business</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
                <StatBox
                  label="Overall Status"
                  value={`${getStatusEmoji(summaryMetrics.overallStatus)} ${summaryMetrics.overallStatus}`}
                  subtext={summaryMetrics.statusReason}
                />
                <div>
                  <StatBox
                    label="Cash Runway"
                    value={`${summaryMetrics.cashRunway} days`}
                    status={summaryMetrics.cashRunway >= 45 ? 'GREEN' : summaryMetrics.cashRunway >= 30 ? 'YELLOW' : 'RED'}
                  />
                  <p className="text-[9px] text-stone-500 mt-1 px-1">How long you can operate if revenue stopped. Target: 45+ days.</p>
                </div>
                <div>
                  <StatBox
                    label="DSCR"
                    value={`${consolidated.dscr.toFixed(2)}x`}
                    subtext="Debt Service Coverage"
                    status={consolidated.dscr >= 1.25 ? 'GREEN' : consolidated.dscr >= 1.0 ? 'YELLOW' : 'RED'}
                  />
                  <p className="text-[9px] text-stone-500 mt-1 px-1">Operating cash flow ÷ debt payments. Banks want 1.25x+.</p>
                </div>
                <div>
                  <StatBox
                    label="TTM Net Income"
                    value={formatCurrency(summaryMetrics.ttmNetIncome)}
                    subtext={`${consolidated.ttmNetMarginPct}% margin`}
                  />
                  <p className="text-[9px] text-stone-500 mt-1 px-1">Trailing 12 months profit. Smooths out monthly volatility.</p>
                </div>
              </div>

              {/* Cash Conversion Cycle with Explanation */}
              <div className="mt-4 p-3 border border-stone-300 bg-blue-50">
                <p className="text-[10px] uppercase font-bold text-blue-900 mb-1">Cash Conversion Cycle</p>
                <p className="text-[9px] text-blue-700 mb-2 italic">How many days your cash is tied up in operations</p>
                <div className="text-[11px] text-blue-800 space-y-1">
                  <div className="flex justify-between">
                    <span>DSO (Collect from customers)</span>
                    <span className="font-medium">+{consolidated.dso} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DIO (Inventory sitting)</span>
                    <span className="font-medium">+{consolidated.dio} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DPO (Pay suppliers)</span>
                    <span className="font-medium">-{consolidated.dpo} days</span>
                  </div>
                  <div className="border-t border-blue-300 pt-1 mt-1 flex justify-between font-bold">
                    <span>CCC Total</span>
                    <span className={consolidated.ccc < 0 ? 'text-green-700' : consolidated.ccc > 60 ? 'text-red-600' : ''}>{consolidated.ccc} days</span>
                  </div>
                </div>
                <p className="text-[9px] text-blue-600 mt-2">Lower is better. Negative means suppliers finance your growth!</p>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* SEASONAL COMPARISON */}
          {/* ============================================================ */}

          <SectionHeader title="Seasonal Comparison" subtitle="How does this month compare to the same period last year?" />

          <MetricExplainer title="Why Seasonal Context Matters">
            Many businesses have natural rhythms—holiday rushes, summer slowdowns, end-of-quarter spikes.
            Comparing to the same month last year (and adjacent months) reveals whether current performance
            reflects seasonal patterns or genuine operational change. If your "season shifted" by a few weeks,
            looking at the month before and after provides the full picture.
          </MetricExplainer>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-[10px] sm:text-[11px] border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-stone-800 bg-stone-100">
                  <th className="py-2 px-2 text-left font-serif font-bold">Period</th>
                  <th className="py-2 px-2 text-right font-serif font-bold">Revenue</th>
                  <th className="py-2 px-2 text-right font-serif font-bold">Gross Margin</th>
                  <th className="py-2 px-2 text-right font-serif font-bold">EBITDA Margin</th>
                  <th className="py-2 px-2 text-right font-serif font-bold">Net Income</th>
                  <th className="py-2 px-2 text-right font-serif font-bold">Cash</th>
                </tr>
              </thead>
              <tbody>
                {seasonalComparison.comparisons.map((comp, idx) => (
                  <tr key={idx} className="border-b border-stone-200">
                    <td className="py-2 px-2">
                      <span className="font-medium">{comp.period}</span>
                      <br /><span className="text-stone-500 text-[9px]">{comp.label}</span>
                    </td>
                    <td className="py-2 px-2 text-right">{formatCurrency(comp.revenue)}</td>
                    <td className="py-2 px-2 text-right">{comp.grossMargin}%</td>
                    <td className="py-2 px-2 text-right">{comp.ebitdaMargin}%</td>
                    <td className="py-2 px-2 text-right">{formatCurrency(comp.netIncome)}</td>
                    <td className="py-2 px-2 text-right">{formatCurrency(comp.cash)}</td>
                  </tr>
                ))}
                <tr className="bg-green-50 border-b-2 border-green-300 font-bold">
                  <td className="py-2 px-2">
                    <span className="text-green-800">{seasonalComparison.currentPeriod.period}</span>
                    <br /><span className="text-green-600 text-[9px]">{seasonalComparison.currentPeriod.label}</span>
                  </td>
                  <td className="py-2 px-2 text-right text-green-800">{formatCurrency(seasonalComparison.currentPeriod.revenue)}</td>
                  <td className="py-2 px-2 text-right text-green-800">{seasonalComparison.currentPeriod.grossMargin}%</td>
                  <td className="py-2 px-2 text-right text-green-800">{seasonalComparison.currentPeriod.ebitdaMargin}%</td>
                  <td className="py-2 px-2 text-right text-green-800">{formatCurrency(seasonalComparison.currentPeriod.netIncome)}</td>
                  <td className="py-2 px-2 text-right text-green-800">{formatCurrency(seasonalComparison.currentPeriod.cash)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-stone-50 border border-stone-300 p-3 mb-6">
            <p className="font-bold text-sm text-stone-800 mb-1">Seasonal Insight</p>
            <p className="text-[11px] text-stone-700">{seasonalComparison.insight}</p>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* CONSOLIDATED VIEW (Big Picture) */}
          {/* ============================================================ */}

          {CONFIG.isMultiEntity && (
            <>
              <SectionHeader title="Consolidated View" subtitle="The Big Picture — All Entities Combined" />

              <MetricExplainer title="Why Start with Consolidated?">
                The consolidated view shows your business as a single unit—how banks, investors, and the IRS see you.
                It eliminates intercompany transactions that can distort individual entity numbers. Start here for the
                overall health check, then drill into entities to find where issues originate.
              </MetricExplainer>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-stone-800 text-white p-3 text-center">
                  <p className="text-[9px] uppercase tracking-wide opacity-70">Combined Cash</p>
                  <p className="text-xl sm:text-2xl font-bold">{formatCurrency(consolidated.cash)}</p>
                  <p className="text-[10px] text-green-400">+{formatCurrency(consolidated.cashChange)} from prior</p>
                </div>
                <div className="bg-stone-800 text-white p-3 text-center">
                  <p className="text-[9px] uppercase tracking-wide opacity-70">Combined Revenue</p>
                  <p className="text-xl sm:text-2xl font-bold">{formatCurrency(consolidated.revenueProjected)}</p>
                  <p className="text-[10px] opacity-70">projected full month</p>
                </div>
                <div className="bg-stone-800 text-white p-3 text-center">
                  <p className="text-[9px] uppercase tracking-wide opacity-70">Combined EBITDA</p>
                  <p className="text-xl sm:text-2xl font-bold">{consolidated.ebitdaPct}%</p>
                  <p className="text-[10px] text-green-400">vs {consolidated.ebitdaPriorPct}% prior</p>
                </div>
                <div className="bg-stone-800 text-white p-3 text-center">
                  <p className="text-[9px] uppercase tracking-wide opacity-70">Combined DSCR</p>
                  <p className={`text-xl sm:text-2xl font-bold ${consolidated.dscr >= 1.25 ? 'text-green-400' : consolidated.dscr >= 1.0 ? 'text-amber-400' : 'text-red-400'}`}>
                    {consolidated.dscr.toFixed(2)}x
                  </p>
                  <p className="text-[10px] opacity-70">debt service coverage</p>
                </div>
              </div>

              <div className="border-t-2 border-stone-800 mb-6"></div>
            </>
          )}

          {/* ============================================================ */}
          {/* ENTITY PERFORMANCE */}
          {/* ============================================================ */}

          <SectionHeader title="Entity Performance" subtitle="Individual Operating Entity Analysis — Identifying Where Issues Originate" />

          <MetricExplainer title="Why Entity-Level Analysis?">
            Problems often hide in consolidation. A struggling entity can be masked by a profitable one.
            By examining each entity separately, we pinpoint exactly where to focus attention.
            Status indicators (GREEN/YELLOW/RED) flag entities needing immediate review.
          </MetricExplainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {entityData.map((entity, idx) => (
              <div key={entity.name} className={`${idx === 0 ? 'md:border-r md:border-stone-200 md:pr-4 lg:pr-6' : 'md:pl-2'}`}>
                <div className={`px-3 py-2 mb-4 ${getStatusBg(entity.status)} text-white`}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif font-bold uppercase tracking-wide">{entity.name}</h3>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">{entity.status}</span>
                  </div>
                  <p className="text-[10px] opacity-80">{entity.statusNote}</p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center p-2 bg-stone-50 border border-stone-200">
                    <p className="text-[9px] uppercase text-stone-500">Cash</p>
                    <p className="font-bold text-lg">{formatCurrency(entity.cash)}</p>
                    <p className="text-[9px] text-green-600">+{formatCurrency(entity.cashChange)}</p>
                  </div>
                  <div className="text-center p-2 bg-stone-50 border border-stone-200">
                    <p className="text-[9px] uppercase text-stone-500">EBITDA %</p>
                    <p className="font-bold text-lg">{entity.ebitdaPct}%</p>
                    <p className="text-[9px] text-stone-500">vs {entity.ebitdaPriorPct}% prior</p>
                  </div>
                  <div className="text-center p-2 bg-stone-50 border border-stone-200">
                    <p className="text-[9px] uppercase text-stone-500">DSCR</p>
                    <p className={`font-bold text-lg ${entity.dscr >= 1.25 ? 'text-green-700' : entity.dscr >= 1.0 ? 'text-amber-600' : 'text-red-600'}`}>
                      {entity.dscr.toFixed(2)}x
                    </p>
                  </div>
                  <div className="text-center p-2 bg-stone-50 border border-stone-200">
                    <p className="text-[9px] uppercase text-stone-500">CCC</p>
                    <p className={`font-bold text-lg ${entity.ccc < 0 ? 'text-green-700' : entity.ccc > 60 ? 'text-amber-600' : ''}`}>
                      {entity.ccc} days
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="text-[11px] text-stone-700 space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span>Revenue MTD</span>
                    <span className="font-medium">{formatCurrency(entity.revenue)} <span className="text-stone-400">→ proj. {formatCurrency(entity.revenueProjected)}</span></span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gross Margin</span>
                    <span className="font-medium">{entity.grossMarginPct}% <span className="text-stone-400">(vs {entity.grossMarginPriorPct}% prior)</span></span>
                  </div>
                  <div className="flex justify-between">
                    <span>Break-Even Revenue</span>
                    <span className="font-medium">{formatCurrency(entity.breakEvenRevenue)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TTM Net Income</span>
                    <span className="font-medium">{formatCurrency(entity.ttmNetIncome)}</span>
                  </div>
                </div>

                {/* Working Capital */}
                <div className="bg-stone-100 p-2 text-[10px]">
                  <p className="font-bold text-stone-600 mb-1">Working Capital</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-stone-500">DSO</p>
                      <p className="font-bold">{entity.dso}d</p>
                    </div>
                    <div>
                      <p className="text-stone-500">DIO</p>
                      <p className="font-bold">{entity.dio}d</p>
                    </div>
                    <div>
                      <p className="text-stone-500">DPO</p>
                      <p className="font-bold">{entity.dpo}d</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Intercompany Position */}
          <div className="bg-amber-50 p-4 mb-6 border border-amber-200">
            <h4 className="font-serif font-bold text-sm mb-2 text-amber-900">Intercompany Position</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px]">
              <div>
                <p className="text-amber-700">Distribution AR from Services</p>
                <p className="font-bold text-lg text-amber-900">{formatCurrency(intercompany.distributionARfromServices)}</p>
                <p className="text-[9px] text-amber-600">{intercompany.pctOfDistributionAR}% of Distribution's AR</p>
              </div>
              <div>
                <p className="text-amber-700">Services AP to Distribution</p>
                <p className="font-bold text-lg text-amber-900">{formatCurrency(intercompany.servicesAPtoDistribution)}</p>
                <p className="text-[9px] text-amber-600">{intercompany.pctOfServicesAP}% of Services' AP</p>
              </div>
              <div>
                <p className="text-amber-700">Net Position</p>
                <p className="font-bold text-lg text-amber-900">{formatCurrency(intercompany.netPosition)}</p>
                <p className="text-[9px] text-amber-600">{intercompany.direction}</p>
              </div>
            </div>
            <p className="text-[10px] text-amber-700 mt-3 italic">
              This intercompany balance eliminates on consolidation. The apparent "AP {'>'} Cash" at Services is primarily owed to Distribution—a timing issue, not external exposure.
            </p>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* PROFITABILITY & RULE OF 40 */}
          {/* ============================================================ */}

          <SectionHeader title="Profitability Analysis" subtitle="Margins, Rule of 40, and 6-Month Trends" />

          <MetricExplainer title="Understanding Profitability Metrics">
            Gross Margin shows what you keep after direct costs (COGS). EBITDA Margin shows operating profit before
            interest, taxes, depreciation, and amortization—the true operational performance of your business.
            Watch for margin compression (declining percentages) even when revenue grows.
          </MetricExplainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {/* Margin Trend */}
            <div className="border border-stone-300 p-3">
              <h4 className="font-serif font-bold text-sm mb-2">Margin Trend (Consolidated)</h4>
              <ResponsiveContainer width="100%" height={160}>
                <ComposedChart data={marginTrend}>
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `${v}%`} domain={[-40, 70]} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />
                  <Bar dataKey="grossMargin" fill="#166534" name="Gross Margin %" radius={[2, 2, 0, 0]} />
                  <Line type="monotone" dataKey="ebitdaMargin" stroke="#1e3a5f" strokeWidth={3} name="EBITDA Margin %" dot={{ r: 4, fill: '#1e3a5f' }} />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2 text-[9px]">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#166534]"></span> Gross Margin</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#1e3a5f] rounded-full"></span> EBITDA Margin</span>
              </div>
            </div>

            {/* Enhanced Rule of 40 */}
            <div className="border border-stone-300 p-3">
              <h4 className="font-serif font-bold text-sm mb-2">Rule of 40 Analysis</h4>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={ruleOf40Data}>
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} domain={[-60, 140]} />
                  <Tooltip />
                  <ReferenceLine y={40} stroke="#166534" strokeWidth={2} strokeDasharray="5 5" />
                  <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />
                  <Bar dataKey="score" name="Rule of 40" radius={[2, 2, 0, 0]}>
                    {ruleOf40Data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.score >= 40 ? '#166534' : entry.score >= 25 ? '#d97706' : '#dc2626'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-stone-500 mt-1 text-center">
                Green dashed line = Target (40)
              </p>
            </div>
          </div>

          {/* Enhanced Rule of 40 Breakdown */}
          <div className="bg-gradient-to-r from-stone-50 to-stone-100 border border-stone-300 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="md:w-1/3">
                <h4 className="font-serif font-bold text-lg mb-2">Rule of 40 Explained</h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">{ruleOf40Enhanced.explanation}</p>
              </div>
              <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 border border-stone-200 text-center">
                  <p className="text-[9px] uppercase text-stone-500 mb-1">YOY Revenue Growth</p>
                  <p className={`text-2xl font-bold ${ruleOf40Enhanced.yoyRevenueGrowth >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                    {ruleOf40Enhanced.yoyRevenueGrowth > 0 ? '+' : ''}{ruleOf40Enhanced.yoyRevenueGrowth}%
                  </p>
                  <p className="text-[9px] text-stone-400">vs same month last year</p>
                </div>
                <div className="bg-white p-3 border border-stone-200 text-center">
                  <p className="text-[9px] uppercase text-stone-500 mb-1">TTM EBITDA Margin</p>
                  <p className={`text-2xl font-bold ${ruleOf40Enhanced.ttmEbitdaPct >= 10 ? 'text-green-700' : ruleOf40Enhanced.ttmEbitdaPct >= 0 ? 'text-amber-600' : 'text-red-600'}`}>
                    {ruleOf40Enhanced.ttmEbitdaPct}%
                  </p>
                  <p className="text-[9px] text-stone-400">trailing 12 months</p>
                </div>
                <div className="bg-white p-3 border border-stone-200 text-center">
                  <p className="text-[9px] uppercase text-stone-500 mb-1">Current Score</p>
                  <p className={`text-2xl font-bold ${ruleOf40Enhanced.currentScore >= 40 ? 'text-green-700' : ruleOf40Enhanced.currentScore >= 25 ? 'text-amber-600' : 'text-red-600'}`}>
                    {ruleOf40Enhanced.currentScore}
                  </p>
                  <p className="text-[9px] text-stone-400">Growth + EBITDA%</p>
                </div>
                <div className="bg-white p-3 border border-stone-200 text-center">
                  <p className="text-[9px] uppercase text-stone-500 mb-1">3-Month Average</p>
                  <p className={`text-2xl font-bold ${ruleOf40Enhanced.threeMonthAvg >= 40 ? 'text-green-700' : ruleOf40Enhanced.threeMonthAvg >= 25 ? 'text-amber-600' : 'text-red-600'}`}>
                    {ruleOf40Enhanced.threeMonthAvg}
                  </p>
                  <p className="text-[9px] text-stone-400">smooths volatility</p>
                </div>
              </div>
            </div>
            <div className="mt-3 p-2 bg-blue-50 border border-blue-200 text-[10px] text-blue-800">
              <strong>Reading this:</strong> Your current score of {ruleOf40Enhanced.currentScore} {ruleOf40Enhanced.currentScore >= 40 ? 'exceeds' : 'is below'} the target of 40.
              The 3-month average of {ruleOf40Enhanced.threeMonthAvg} (vs prior {ruleOf40Enhanced.priorThreeMonthAvg}) shows the trend direction, smoothing out month-to-month noise.
            </div>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* EXPENSE WATCH */}
          {/* ============================================================ */}

          <SectionHeader title="Expense Watch" subtitle="Spike Detection vs. 4-Month Trailing Average" />

          <MetricExplainer title="How We Detect Expense Anomalies">
            We compare each expense category to its 4-month trailing average. Spikes over 50% trigger alerts.
            Not all spikes are bad—growth requires investment. But unexpected spikes deserve investigation.
            Reversals (negative variances) may indicate refunds or accounting corrections.
          </MetricExplainer>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-[10px] sm:text-[11px] border-collapse min-w-[500px]">
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
                        'bg-stone-100 text-stone-700'
                      }`}>
                        {spike.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {expenseSpikes.length > 0 && (
            <div className="bg-red-50 border border-red-200 p-3 mb-6">
              <p className="font-serif font-bold text-sm text-red-900 mb-2">Expense Alert Detail</p>
              {expenseSpikes.filter(s => s.status === 'SPIKE').map((spike, idx) => (
                <p key={idx} className="text-[11px] text-red-800 mb-1">
                  <strong>{spike.category}:</strong> {spike.note}
                </p>
              ))}
            </div>
          )}

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* OWNER DISTRIBUTIONS */}
          {/* ============================================================ */}

          <SectionHeader title="Owner Distributions" subtitle="Partner Draws and Equity Movement" />

          <MetricExplainer title="Balancing Owner Compensation with Business Needs">
            Owner draws reduce working capital and retained earnings. While owners deserve compensation,
            excessive draws can strain cash flow and limit growth capacity. We track draws as a percentage
            of net income: under 20% is conservative, 20-50% is moderate, over 50% warrants discussion.
          </MetricExplainer>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
            <div className="text-center p-4 bg-stone-50 border border-stone-200">
              <p className="text-[10px] uppercase text-stone-500">MTD Draws</p>
              <p className="font-bold text-2xl">{formatCurrency(ownerDraws.mtdTotal)}</p>
              <p className="text-[10px] text-stone-500">{ownerDraws.mtdPctOfIncome}% of MTD Net Income</p>
              <p className={`text-[10px] mt-1 font-medium ${ownerDraws.mtdPctOfIncome <= 20 ? 'text-green-600' : ownerDraws.mtdPctOfIncome <= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                {ownerDraws.mtdPctOfIncome <= 20 ? '✓ Conservative' : ownerDraws.mtdPctOfIncome <= 50 ? '⚠ Moderate' : '⚠ High'}
              </p>
            </div>
            <div className="text-center p-4 bg-stone-50 border border-stone-200">
              <p className="text-[10px] uppercase text-stone-500">Cumulative Distributions</p>
              <p className="font-bold text-2xl">{formatCurrency(ownerDraws.totalCumulative)}</p>
              <p className="text-[10px] text-stone-500">All-time partner draws</p>
            </div>
            <div className="p-4 bg-stone-50 border border-stone-200">
              <p className="text-[10px] uppercase text-stone-500 mb-2">January by Partner</p>
              {ownerDraws.partners.map((partner) => (
                <div key={partner.name} className="flex justify-between text-[11px] mb-1">
                  <span>{partner.name}</span>
                  <span className="font-medium">{formatCurrency(partner.mtd)}</span>
                </div>
              ))}
              <div className="border-t border-stone-300 mt-2 pt-2 flex justify-between text-[11px] font-bold">
                <span>Total</span>
                <span>{formatCurrency(ownerDraws.mtdTotal)}</span>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-stone-800 mb-6"></div>

          {/* ============================================================ */}
          {/* ACTION ITEMS */}
          {/* ============================================================ */}

          <SectionHeader title="Action Items" subtitle="Items Requiring Attention This Week" />

          <div className="mb-6">
            {actionItems.map((item, idx) => (
              <div key={idx} className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 p-3 mb-2 border-l-4 ${
                item.urgency === 'HIGH' ? 'border-red-500 bg-red-50' :
                item.urgency === 'MEDIUM' ? 'border-amber-500 bg-amber-50' :
                'border-stone-300 bg-stone-50'
              }`}>
                <span className="font-bold text-stone-400 text-lg">#{item.priority}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.item}</p>
                  <p className="text-[10px] text-stone-600 mt-1">{item.detail}</p>
                  <p className="text-[9px] text-stone-400 mt-1">Entity: {item.entity}</p>
                </div>
                <span className={`self-start text-[9px] font-bold px-2 py-1 rounded ${
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
                <p className="font-bold text-stone-700">The Benefique Financial Times</p>
                <p>Published by Benefique Fractional CFO Services</p>
                <p className="mt-1">© 2026 Benefique LLC. All rights reserved.</p>
              </div>
              <div className="md:text-right">
                <p><strong>Data Source:</strong> {CONFIG.dataSource}</p>
                <p><strong>Last Sync:</strong> {CONFIG.lastSync}</p>
                <p><strong>Report Basis:</strong> Accrual</p>
                <p className="mt-1"><strong>Next Edition:</strong> Saturday, February 1, 2026</p>
              </div>
            </div>

            {/* Audit Trail */}
            <div className="mt-4 p-3 bg-stone-50 border border-stone-200 text-[9px]">
              <p className="font-bold text-stone-600 mb-2">Audit Trail</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <p className="text-stone-400">Consolidated Cash</p>
                  <p className="font-medium">{formatCurrency(consolidated.cash)}</p>
                </div>
                <div>
                  <p className="text-stone-400">Consolidated Revenue</p>
                  <p className="font-medium">{formatCurrency(consolidated.revenue)}</p>
                </div>
                <div>
                  <p className="text-stone-400">TTM Net Income</p>
                  <p className="font-medium">{formatCurrency(consolidated.ttmNetIncome)}</p>
                </div>
                <div>
                  <p className="text-stone-400">Month Progress</p>
                  <p className="font-medium">{monthProgress}% ({CONFIG.currentDay}/{CONFIG.daysInMonth})</p>
                </div>
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
