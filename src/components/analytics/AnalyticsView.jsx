import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  CreditCard,
  Percent,
  Coins,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { formatCurrency, formatPercent, formatCompactCurrency } from '../../utils/formatters';

export const AnalyticsView = ({ loans, stats, currency = 'INR' }) => {
  // Chart 1: EMI Distribution
  const emiDistributionData = loans.map((loan) => ({
    name: loan.name,
    value: Number(loan.emiAmount) || 0,
    color: loan.color || '#3b82f6',
  }));

  // Chart 2: Outstanding Balance by Loan
  const outstandingData = loans.map((loan) => ({
    name: loan.name.length > 12 ? loan.name.substring(0, 10) + '...' : loan.name,
    fullName: loan.name,
    outstanding: Number(loan.outstanding) || 0,
    principal: Number(loan.principal) || 0,
    repaid: Math.max(0, (Number(loan.principal) || 0) - (Number(loan.outstanding) || 0)),
  }));

  // Chart 3: Paid vs Outstanding Overall
  const paidVsOutstandingData = [
    { name: 'Amount Repaid', value: stats.totalRepaid, color: '#10b981' },
    { name: 'Outstanding Debt', value: stats.totalOutstanding, color: '#f59e0b' },
  ];

  // Average Interest Rate
  const totalWeight = loans.reduce((acc, l) => acc + (l.outstanding || 0), 0);
  const weightedRate = totalWeight > 0
    ? loans.reduce((acc, l) => acc + ((l.outstanding || 0) * (l.interestRate || 0)), 0) / totalWeight
    : 0;

  // Debt Strategy Recommendations
  // Avalanche = Highest Interest First
  const highestInterestLoan = [...loans].sort((a, b) => b.interestRate - a.interestRate)[0] || null;
  // Snowball = Lowest Balance First
  const lowestBalanceLoan = [...loans].filter(l => l.outstanding > 0).sort((a, b) => a.outstanding - b.outstanding)[0] || null;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
          Financial Analytics & Debt Insights
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Deep dive into your loan portfolio distribution, interest liabilities, and payoff velocity
        </p>
      </div>

      {/* 4 Summary Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Monthly EMI Burden */}
        <Card padding="p-5" className="bg-white border-slate-200/90 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Monthly EMI Burden</span>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {formatCurrency(stats.totalMonthlyEMI, currency)}
          </p>
          <span className="text-xs text-slate-500 block mt-1">
            Committed across {stats.totalActiveLoans} active accounts
          </span>
        </Card>

        {/* 2. Highest EMI Loan */}
        <Card padding="p-5" className="bg-white border-slate-200/90 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Highest Monthly EMI</span>
          <p className="text-2xl font-black text-blue-600 mt-1">
            {stats.highestEmiLoan ? formatCurrency(stats.highestEmiLoan.emiAmount, currency) : '₹0'}
          </p>
          <span className="text-xs text-slate-500 block mt-1 truncate">
            {stats.highestEmiLoan ? stats.highestEmiLoan.name : 'None'}
          </span>
        </Card>

        {/* 3. Highest Outstanding */}
        <Card padding="p-5" className="bg-white border-slate-200/90 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Highest Debt Account</span>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {stats.highestOutstandingLoan ? formatCurrency(stats.highestOutstandingLoan.outstanding, currency) : '₹0'}
          </p>
          <span className="text-xs text-slate-500 block mt-1 truncate">
            {stats.highestOutstandingLoan ? stats.highestOutstandingLoan.name : 'None'}
          </span>
        </Card>

        {/* 4. Weighted Interest Rate */}
        <Card padding="p-5" className="bg-white border-slate-200/90 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Portfolio Avg Interest Rate</span>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {formatPercent(weightedRate)} p.a.
          </p>
          <span className="text-xs text-slate-500 block mt-1">
            Weighted across total debt
          </span>
        </Card>
      </div>

      {/* Row 1 Charts: EMI Distribution & Paid vs Outstanding */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut: EMI Distribution */}
        <Card padding="p-5 sm:p-6" className="bg-white border-slate-200/90 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Monthly EMI Distribution by Loan</h3>
            <p className="text-xs text-slate-500">How your monthly budget is allocated across loans</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emiDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {emiDistributionData.map((entry, idx) => (
                    <Cell key={`emi-cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => formatCurrency(val, currency)}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend
                  verticalAlign="bottom"
                  formatter={(val) => <span className="text-xs text-slate-700">{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Donut: Paid vs Outstanding */}
        <Card padding="p-5 sm:p-6" className="bg-white border-slate-200/90 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Overall Portfolio: Paid vs Outstanding</h3>
            <p className="text-xs text-slate-500">Total repaid principal compared to remaining debt</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paidVsOutstandingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {paidVsOutstandingData.map((entry, idx) => (
                    <Cell key={`paid-cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => formatCurrency(val, currency)}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend
                  verticalAlign="bottom"
                  formatter={(val) => <span className="text-xs text-slate-700">{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 2 Chart: Outstanding Balances vs Principal Comparison */}
      <Card padding="p-5 sm:p-6" className="bg-white border-slate-200/90 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Loan Balances: Repaid vs Remaining Outstanding</h3>
          <p className="text-xs text-slate-500">Side-by-side comparison for each individual borrowing account</p>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={outstandingData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => formatCompactCurrency(val, currency)} />
              <Tooltip
                formatter={(val) => formatCurrency(val, currency)}
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="repaid" name="Amount Repaid" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outstanding" name="Remaining Outstanding" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Smart Repayment Strategy Recommendations (Design Thinking Feature) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <Sparkles className="w-5 h-5" />
          <h3 className="text-base font-bold uppercase tracking-wider text-white">
            Smart Debt Reduction Strategy Advisor
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Avalanche Strategy */}
          <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-amber-300">
                1. Debt Avalanche Method (Recommended for Maximum Savings)
              </span>
              <span className="text-[10px] bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded-full border border-amber-300/30">
                Saves Interest
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Target extra payments to the loan with the highest interest rate:{' '}
              <strong className="text-white font-bold">
                {highestInterestLoan ? `${highestInterestLoan.name} (${formatPercent(highestInterestLoan.interestRate)})` : 'None'}
              </strong>
              . This minimizes total finance charges over time.
            </p>
          </div>

          {/* Snowball Strategy */}
          <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-blue-300">
                2. Debt Snowball Method (Psychological Momentum)
              </span>
              <span className="text-[10px] bg-blue-400/20 text-blue-200 px-2 py-0.5 rounded-full border border-blue-300/30">
                Quick Wins
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Pay off the smallest outstanding loan first:{' '}
              <strong className="text-white font-bold">
                {lowestBalanceLoan ? `${lowestBalanceLoan.name} (${formatCurrency(lowestBalanceLoan.outstanding, currency)})` : 'None'}
              </strong>
              . Eliminating an account quickly frees up monthly cash flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
