import React from 'react';
import {
  LayoutDashboard,
  CreditCard,
  PlusCircle,
  CalendarDays,
  Calculator,
  PieChart,
  BellRing,
  Settings as SettingsIcon,
} from 'lucide-react';
import { useLoans } from '../../context/LoanContext';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export const Sidebar = ({ activeTab, setActiveTab, onOpenAddModal }) => {
  const { stats, unreadAlertsCount, settings } = useLoans();

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'loans', label: 'My Loans', icon: CreditCard, count: stats.totalActiveLoans },
    { id: 'calendar', label: 'EMI Calendar', icon: CalendarDays },
    { id: 'calculator', label: 'EMI Calculator', icon: Calculator },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    {
      id: 'alerts',
      label: 'EMI Alerts',
      icon: BellRing,
      badge: unreadAlertsCount > 0 ? unreadAlertsCount : null,
      badgeColor: 'bg-rose-500 text-white',
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 shrink-0 select-none">
      {/* Navigation Links */}
      <div className="p-4 space-y-5 overflow-y-auto">
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Main Menu
          </p>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-blue-700/60 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold animate-pulse ${
                      item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button: Add Loan */}
        <div>
          <button
            onClick={onOpenAddModal}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/80 hover:bg-blue-100/60 transition-all cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <span>Add New Loan</span>
          </button>
        </div>

        {/* Dedicated Settings & Preferences Section */}
        <div className="space-y-1 pt-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Preferences & Data
          </p>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 border border-slate-200/80 bg-slate-50/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <SettingsIcon className={`w-4 h-4 ${activeTab === 'settings' ? 'text-white' : 'text-slate-600'}`} />
              <span>Settings</span>
            </div>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                activeTab === 'settings'
                  ? 'bg-blue-700/60 text-white'
                  : 'bg-slate-200/80 text-slate-600'
              }`}
            >
              Data
            </span>
          </button>
        </div>
      </div>

      {/* Sidebar Bottom: Summary Card */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/70">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Debt</span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              {formatPercent(stats.overallRepaidPercentage)} Repaid
            </span>
          </div>

          <div>
            <p className="text-base font-extrabold text-slate-900 leading-tight">
              {formatCurrency(stats.totalOutstanding, settings.currency)}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Across {stats.totalActiveLoans} active accounts
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(5, stats.overallRepaidPercentage))}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
