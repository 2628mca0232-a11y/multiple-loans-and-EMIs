import React from 'react';
import { Wallet, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-slate-900">
                EMI<span className="text-blue-600">ease</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-md font-normal leading-relaxed">
              "One Dashboard. Every Loan. Zero EMI Confusion."
            </p>
            <p className="text-xs text-slate-400">
              A comprehensive fintech prototype designed to simplify multiple loan tracking, prevent missed due dates, and provide actionable debt repayment visibility.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Application Views
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-blue-600 cursor-pointer">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('loans')} className="hover:text-blue-600 cursor-pointer">
                  My Loans Directory
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calendar')} className="hover:text-blue-600 cursor-pointer">
                  EMI Due Calendar
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-blue-600 cursor-pointer">
                  EMI & Prepayment Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analytics')} className="hover:text-blue-600 cursor-pointer">
                  Financial Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Overview & Settings
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button onClick={() => setActiveTab('alerts')} className="hover:text-blue-600 cursor-pointer">
                  EMI Alerts Center
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('settings')} className="hover:text-blue-600 cursor-pointer">
                  Settings & Data Backup
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Academic Disclaimers */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-500 space-y-1">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>EMIease – Prototype for Design Thinking & Entrepreneurship</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Academic Prototype – For Demonstration Purposes. This is an academic prototype for loan and EMI organization. It does not provide financial, lending, or investment advice.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <p>© 2026 EMIease. All rights reserved.</p>
            <p className="flex items-center gap-1 font-medium text-slate-600">
              Built by Dev Mahur for EMIease
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
