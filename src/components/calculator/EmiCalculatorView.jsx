import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Plus,
  Percent,
  Calendar,
  Layers,
  Sparkles,
  Info,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { calculateLoanSummary, generateAmortizationSchedule } from '../../utils/emiCalculations';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export const EmiCalculatorView = ({ onExportToNewLoan, currency = 'INR' }) => {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10.5);
  const [tenureYears, setTenureYears] = useState(5);
  const [tenureType, setTenureType] = useState('years'); // 'years' | 'months'
  const [customMonths, setCustomMonths] = useState(60);

  const totalMonths = tenureType === 'years' ? tenureYears * 12 : customMonths;

  // Calculation Results
  const summary = useMemo(() => {
    return calculateLoanSummary(amount, rate, totalMonths);
  }, [amount, rate, totalMonths]);

  // Amortization Schedule
  const schedule = useMemo(() => {
    return generateAmortizationSchedule(amount, rate, totalMonths);
  }, [amount, rate, totalMonths]);

  // Donut chart data
  const chartData = [
    { name: 'Principal Amount', value: summary.principalAmount, color: '#3b82f6' },
    { name: 'Total Interest', value: summary.totalInterest, color: '#f59e0b' },
  ];

  const handleAddAsLoan = () => {
    if (onExportToNewLoan) {
      onExportToNewLoan({
        name: `Calculated Loan (₹${(amount / 100000).toFixed(1)}L)`,
        principal: amount,
        outstanding: amount,
        interestRate: rate,
        emiAmount: summary.monthlyEMI,
        tenureMonths: totalMonths,
        remainingMonths: totalMonths,
        dueDay: 5,
        category: 'Personal Loan',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Interactive EMI Calculator
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Simulate loan scenarios, estimate monthly obligations, and visualize total interest
          </p>
        </div>

        <Button
          onClick={handleAddAsLoan}
          icon={Plus}
          size="md"
          className="shadow-sm shadow-blue-500/20"
        >
          Add to My Loans
        </Button>
      </div>

      {/* Main Grid: Inputs (Left) and Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Loan Parameters</h3>
          </div>

          {/* 1. Loan Amount */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase">
                Loan Amount (₹)
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-sm font-black text-slate-900">
                <span>₹</span>
                <input
                  type="number"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="w-32 bg-transparent text-right outline-none font-black pl-1"
                />
              </div>
            </div>
            <input
              type="range"
              min="20000"
              max="5000000"
              step="10000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span>₹20,000</span>
              <span>₹25 Lakhs</span>
              <span>₹50 Lakhs</span>
            </div>
          </div>

          {/* 2. Interest Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase">
                Interest Rate (% p.a.)
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-sm font-black text-blue-600">
                <input
                  type="number"
                  min="1"
                  max="36"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value) || 0)}
                  className="w-16 bg-transparent text-right outline-none font-black pr-1"
                />
                <span>%</span>
              </div>
            </div>
            <input
              type="range"
              min="5"
              max="24"
              step="0.25"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span>5% (Home)</span>
              <span>12% (Personal)</span>
              <span>24% (Card)</span>
            </div>
          </div>

          {/* 3. Tenure */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Loan Tenure
                </label>
                <div className="flex bg-slate-100 rounded-lg p-0.5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setTenureType('years')}
                    className={`px-2 py-0.5 rounded-md cursor-pointer ${
                      tenureType === 'years' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-500'
                    }`}
                  >
                    Years
                  </button>
                  <button
                    type="button"
                    onClick={() => setTenureType('months')}
                    className={`px-2 py-0.5 rounded-md cursor-pointer ${
                      tenureType === 'months' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-500'
                    }`}
                  >
                    Months
                  </button>
                </div>
              </div>

              <span className="text-sm font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1">
                {tenureType === 'years' ? `${tenureYears} Years (${totalMonths} mo)` : `${customMonths} Months`}
              </span>
            </div>

            {tenureType === 'years' ? (
              <>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>1 Year</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </>
            ) : (
              <>
                <input
                  type="range"
                  min="3"
                  max="360"
                  step="3"
                  value={customMonths}
                  onChange={(e) => setCustomMonths(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>3 Months</span>
                  <span>180 Months</span>
                  <span>360 Months</span>
                </div>
              </>
            )}
          </div>

          {/* Quick preset chips */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase text-slate-400 block mb-2">
              Popular Loan Presets
            </span>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: 'Personal Loan ₹2L @ 12.5% (3 Yrs)', p: 200000, r: 12.5, y: 3 },
                { label: 'Education Loan ₹4L @ 9.0% (5 Yrs)', p: 400000, r: 9.0, y: 5 },
                { label: 'Car Loan ₹6L @ 10.5% (5 Yrs)', p: 600000, r: 10.5, y: 5 },
                { label: 'Home Loan ₹25L @ 8.5% (20 Yrs)', p: 2500000, r: 8.5, y: 20 },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setAmount(preset.p);
                    setRate(preset.r);
                    setTenureYears(preset.y);
                    setTenureType('years');
                  }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors border border-slate-200/80 cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Results & Donut Chart (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
              Calculated Monthly Payment
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white">
                {formatCurrency(summary.monthlyEMI, currency)}
              </span>
              <span className="text-xs text-slate-400">/ month</span>
            </div>

            {/* Total Breakdown Cards */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Interest</span>
                <span className="text-lg font-black text-amber-400 mt-0.5 block">
                  {formatCurrency(summary.totalInterest, currency)}
                </span>
                <span className="text-[10px] text-slate-400">{summary.interestRatio.toFixed(1)}% of total</span>
              </div>

              <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Payment</span>
                <span className="text-lg font-black text-blue-300 mt-0.5 block">
                  {formatCurrency(summary.totalPayment, currency)}
                </span>
                <span className="text-[10px] text-slate-400">Principal + Interest</span>
              </div>
            </div>

            {/* Recharts Donut */}
            <div className="h-44 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => formatCurrency(val, currency)}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={28}
                    formatter={(val) => <span className="text-xs text-slate-300">{val}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <Button
              onClick={handleAddAsLoan}
              variant="primary"
              size="md"
              className="w-full justify-center shadow-lg shadow-blue-500/30"
              icon={Plus}
            >
              Add this Loan to Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Projected Amortization Schedule</h3>
            <p className="text-xs text-slate-500">Month-by-month principal and interest breakdown</p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            {totalMonths} Installments
          </span>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-2.5 px-4">#</th>
                  <th className="py-2.5 px-4">Month</th>
                  <th className="py-2.5 px-4">EMI Amount</th>
                  <th className="py-2.5 px-4">Principal Paid</th>
                  <th className="py-2.5 px-4">Interest Paid</th>
                  <th className="py-2.5 px-4 text-right">Remaining Principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedule.slice(0, 36).map((item) => (
                  <tr key={item.monthNumber} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-4 font-semibold text-slate-400">{item.monthNumber}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-800">{item.displayDate}</td>
                    <td className="py-2.5 px-4 font-extrabold text-slate-900">{formatCurrency(item.emiAmount, currency)}</td>
                    <td className="py-2.5 px-4 text-emerald-600 font-semibold">{formatCurrency(item.principal, currency)}</td>
                    <td className="py-2.5 px-4 text-rose-500 font-semibold">{formatCurrency(item.interest, currency)}</td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-800">
                      {formatCurrency(item.remainingBalance, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Required Disclaimer Note */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Note:</strong> This calculator is for demonstration purposes and actual lender calculations may vary depending on processing fees, compounding frequency, and terms.
          </p>
        </div>
      </div>
    </div>
  );
};
