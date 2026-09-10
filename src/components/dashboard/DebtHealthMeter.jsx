import React from 'react';
import { ShieldCheck, TrendingUp, AlertCircle, Percent, Zap } from 'lucide-react';
import { Card } from '../common/Card';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export const DebtHealthMeter = ({ stats, currency = 'INR' }) => {
  const repaidPct = Math.round(stats.overallRepaidPercentage || 0);

  // Assess Debt Health Level
  let healthRating = 'Good';
  let ratingColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  let tip = 'You have a healthy repayment pace. Consider prepaying the highest-interest loan to save more on interest.';

  if (repaidPct < 25) {
    healthRating = 'Early Stage';
    ratingColor = 'text-blue-600 bg-blue-50 border-blue-200';
    tip = 'Your loan portfolio is in early repayment. Setting auto-debit on salary day helps maintain an untarnished credit score.';
  } else if (repaidPct > 60) {
    healthRating = 'Excellent';
    ratingColor = 'text-emerald-700 bg-emerald-100 border-emerald-300';
    tip = 'Over half of your total debt is paid off! You are close to financial freedom on multiple accounts.';
  }

  return (
    <Card padding="p-5 sm:p-6" className="bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white shadow-md border-slate-800">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left text & stats */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Debt Repayment Health & Velocity
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${ratingColor}`}>
              {healthRating}
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {formatCurrency(stats.totalRepaid, currency)} Repaid of {formatCurrency(stats.totalPrincipal, currency)}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              {tip}
            </p>
          </div>

          {/* Quick Metrics Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Outstanding</span>
              <span className="text-sm font-bold text-white mt-0.5 block">
                {formatCurrency(stats.totalOutstanding, currency)}
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Monthly EMI Total</span>
              <span className="text-sm font-bold text-blue-400 mt-0.5 block">
                {formatCurrency(stats.totalMonthlyEMI, currency)}
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active Loans</span>
              <span className="text-sm font-bold text-amber-400 mt-0.5 block">
                {stats.totalActiveLoans} Accounts
              </span>
            </div>
          </div>
        </div>

        {/* Right: Progress Circle / Bar */}
        <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10 w-full lg:w-48 shrink-0">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400 transition-all duration-1000 ease-out"
                strokeDasharray={`${repaidPct}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-white">{repaidPct}%</span>
              <span className="text-[9px] uppercase font-bold text-slate-400">Repaid</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400 font-medium mt-2 text-center">
            {stats.totalActiveLoans > 0 ? 'Overall Portfolio Progress' : 'No Active Loans'}
          </span>
        </div>
      </div>
    </Card>
  );
};
