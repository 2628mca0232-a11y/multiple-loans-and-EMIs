import React, { useState } from 'react';
import {
  Wallet,
  Bell,
  Plus,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Settings as SettingsIcon,
} from 'lucide-react';
import { useLoans } from '../../context/LoanContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';

export const Navbar = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  onToggleMobileMenu,
}) => {
  const { stats, alerts, unreadAlertsCount, settings } = useLoans();
  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-30 glass-nav border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  EMI<span className="text-blue-600">ease</span>
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-400 font-medium truncate max-w-xs -mt-0.5">
                Smart Multiple Loan & EMI Manager
              </p>
            </div>
          </button>
        </div>

        {/* Center: Clean Tagline / Spacer */}
        <div className="hidden lg:flex items-center text-xs font-semibold text-slate-500">
          <span>One Dashboard. Every Loan. Zero EMI Confusion.</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Stats Pill (Desktop) */}
          <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 bg-slate-100/80 rounded-xl border border-slate-200/60 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Total EMI / Mo</span>
              <span className="font-bold text-slate-900">{formatCurrency(stats.totalMonthlyEMI, settings.currency)}</span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Active Loans</span>
              <span className="font-bold text-blue-600">{stats.totalActiveLoans}</span>
            </div>
          </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
                className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                aria-label="Notifications"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>

              {/* Dropdown Menu */}
              {showAlertsDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowAlertsDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-fadeIn">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900">EMI Notifications & Alerts</h4>
                        {unreadAlertsCount > 0 && (
                          <Badge variant="danger" size="sm">{unreadAlertsCount} new</Badge>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setShowAlertsDropdown(false);
                          setActiveTab('alerts');
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        View All
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {alerts.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-xs">
                          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                          No pending EMI alerts right now!
                        </div>
                      ) : (
                        alerts.slice(0, 4).map((alert) => (
                          <div
                            key={alert.id}
                            onClick={() => {
                              setShowAlertsDropdown(false);
                              setActiveTab('alerts');
                            }}
                            className="p-3.5 hover:bg-slate-50/80 transition-colors cursor-pointer flex gap-3 items-start"
                          >
                            <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                              alert.type === 'overdue' ? 'bg-rose-100 text-rose-600' :
                              alert.type === 'due_today' ? 'bg-amber-100 text-amber-600' :
                              alert.type === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {alert.type === 'paid' ? <CheckCircle2 className="w-4 h-4" /> :
                               alert.type === 'overdue' ? <AlertTriangle className="w-4 h-4" /> :
                               <Clock className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">{alert.title}</p>
                              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">{alert.message}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Quick Settings Icon */}
            <button
              onClick={() => setActiveTab('settings')}
              className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Settings & Data Management"
              aria-label="Settings"
            >
              <SettingsIcon className="w-5 h-5" />
            </button>

            {/* Add Loan Button */}
            <Button
              onClick={onOpenAddModal}
              icon={Plus}
              size="sm"
              className="hidden sm:inline-flex shadow-sm shadow-blue-500/20"
            >
              Add Loan
            </Button>
        </div>
      </div>
    </header>
  );
};
