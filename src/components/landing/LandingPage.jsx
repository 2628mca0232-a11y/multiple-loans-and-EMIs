import React from 'react';
import {
  Wallet,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Calendar,
  CreditCard,
  PieChart,
  BellRing,
  Calculator,
  CheckCircle2,
  AlertOctagon,
  TrendingDown,
  Layers,
  ChevronRight,
  Check,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';

export const LandingPage = ({ onLaunchApp, onOpenAcademic, currency = 'INR' }) => {
  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-850 to-indigo-950 text-white p-6 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
        {/* Glow background circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Fintech Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Smart Debt & EMI Management Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
            One Dashboard. Every Loan.{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              Zero EMI Confusion.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Stop juggling scattered banking apps, mismatched due dates, and surprise interest charges.
            <strong> EMIease</strong> centralizes your Education, Home, Vehicle, Personal, and Credit Card loans into one unified intelligent cockpit.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center justify-center pt-4">
            <Button
              onClick={onLaunchApp}
              size="lg"
              variant="primary"
              icon={ArrowRight}
              className="w-full sm:w-auto shadow-xl shadow-blue-500/30 font-bold px-8 py-3.5"
            >
              Start Managing Loans
            </Button>
          </div>

          {/* Key Feature Stats Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-3xl mx-auto border-t border-white/10 text-left">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Single View</span>
              <span className="text-sm font-bold text-white mt-0.5 block">100% Loan Visibility</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Tracking</span>
              <span className="text-sm font-bold text-emerald-400 mt-0.5 block">Zero Missed EMIs</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Prepayment Tool</span>
              <span className="text-sm font-bold text-blue-400 mt-0.5 block">Save Total Interest</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Privacy</span>
              <span className="text-sm font-bold text-amber-400 mt-0.5 block">Local Storage Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Transformation Visualizer: "Scattered Confusion" -> "EMIease Unified Dashboard" */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="indigo" size="md">The Transformation</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            From Scattered Stress to One Unified Command Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            See how EMIease transforms fragmented banking portals into an organized, single-glance dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Left: Problem State (The Struggle) */}
          <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>BEFORE EMIease: The Multiple Loan Struggle</span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-rose-100 flex items-center justify-between">
                  <span className="font-semibold">SBI Education Loan</span>
                  <span className="text-rose-600 font-bold">Due 20th • Missing Login Pin</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-rose-100 flex items-center justify-between">
                  <span className="font-semibold">HDFC Personal Loan</span>
                  <span className="text-rose-600 font-bold">Due 15th • Incurred Late Fee!</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-rose-100 flex items-center justify-between">
                  <span className="font-semibold">ICICI Car Loan</span>
                  <span className="text-rose-600 font-bold">Due 10th • Unknown Balance Left</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-rose-100 flex items-center justify-between">
                  <span className="font-semibold">Credit Card Laptop EMI</span>
                  <span className="text-rose-600 font-bold">Due 5th • 15% Compounded Rate</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-100/60 text-rose-900 text-xs font-medium">
              ❌ Result: Mental stress, scattered spreadsheets, unexpected penalty charges, and zero clarity on total debt.
            </div>
          </div>

          {/* Right: Solution State (EMIease Dashboard) */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>AFTER EMIease: One Single Intelligent Hub</span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span className="font-bold">Total Monthly EMI Obligation</span>
                  </div>
                  <span className="text-emerald-700 font-extrabold text-sm">₹28,500 / mo</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="font-bold">Next EMI Due Today</span>
                  </div>
                  <span className="text-amber-700 font-extrabold text-xs">Vehicle Loan (₹8,500)</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                    <span className="font-bold">Automated Due Calendar</span>
                  </div>
                  <span className="text-blue-700 font-extrabold text-xs">Green/Amber Realtime Indicators</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    <span className="font-bold">Debt Payoff Simulator</span>
                  </div>
                  <span className="text-purple-700 font-extrabold text-xs">Avalanche Interest Optimizer</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-100/60 text-emerald-900 text-xs font-medium">
              ✅ Result: 100% peace of mind, proactive due reminders, accelerated debt payoff, and full financial control.
            </div>
          </div>
        </div>
      </section>

      {/* Section: "Why EMI management is difficult" */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xs space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="danger" size="md">The Core Problem</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Why EMI Management Is So Difficult
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Managing multiple debts is overwhelming because loan data is intentionally fragmented across institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Multiple Different Due Dates',
              desc: 'Loans are due on the 5th, 10th, 15th, and 20th across different banks, making manual tracking mentally exhausting.',
              icon: Calendar,
            },
            {
              title: 'Varying Interest Rates',
              desc: 'Rates fluctuate from 8.5% on Home Loans to 15%+ on credit card EMIs, making it hard to prioritize which to pay first.',
              icon: Percent,
            },
            {
              title: 'Conflicting Loan Tenures',
              desc: 'Tenures span from 6 months for electronics to 20 years for mortgages, muddying your overall debt-free timeline.',
              icon: Clock,
            },
            {
              title: 'Tracking Remaining Balances',
              desc: 'Logging into 4 different banking portals just to check your outstanding principal is tedious and frustrating.',
              icon: TrendingDown,
            },
            {
              title: 'Risk of Missed Payments',
              desc: 'A single missed EMI damages your credit score (CIBIL) and attracts compounding penalty interest charges.',
              icon: AlertOctagon,
            },
            {
              title: 'No Single View of Monthly Burden',
              desc: 'Without a central cockpit, you cannot accurately know your total fixed monthly debt obligations.',
              icon: Layers,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 transition-all space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Cards Showcase */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="primary" size="md">Core Capabilities</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Engineered For Frictionless Debt Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to organize, analyze, and repay your loans faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Centralized Loan Dashboard',
              desc: 'View all your active loans, total monthly EMI burden, and total outstanding debt in one unified dashboard.',
              icon: Wallet,
              tag: 'Dashboard',
            },
            {
              title: 'Interactive EMI Calendar',
              desc: 'Color-coded monthly calendar view indicating settled, upcoming, and overdue payments at a glance.',
              icon: Calendar,
              tag: 'Calendar',
            },
            {
              title: '1-Click Settlement & Confetti',
              desc: 'Mark EMIs as paid in one click with instant principal balance reduction and payment history logging.',
              icon: CheckCircle2,
              tag: 'Tracking',
            },
            {
              title: 'Smart Due Date Alerts',
              desc: 'Proactive reminder notifications generated dynamically for payments due today, soon, or overdue.',
              icon: BellRing,
              tag: 'Alerts',
            },
            {
              title: 'EMI & Prepayment Calculator',
              desc: 'Simulate loan scenarios and discover how lump-sum prepayments save lakhs in interest and shave years off tenure.',
              icon: Calculator,
              tag: 'Calculator',
            },
            {
              title: 'Visual Portfolio Analytics',
              desc: 'Rich charts for EMI distribution, loan balance comparisons, and payoff strategy optimization recommendations.',
              icon: PieChart,
              tag: 'Analytics',
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{feature.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600">
                  <span>Explore Feature</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Target Users Persona Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
            Target Users
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Designed for Anyone Managing Multiple Loans
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Tailored to meet the financial tracking needs of diverse borrower profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              role: 'College Graduates & Students',
              desc: 'Managing education loans alongside new laptop or gadget credit card EMIs as they enter the workforce.',
            },
            {
              role: 'Salaried Professionals',
              desc: 'Balancing vehicle loans, personal loans, and credit cards across multiple salary credit dates.',
            },
            {
              role: 'Families & Homeowners',
              desc: 'Tracking long-term Home Loans, vehicle financing, and family personal loan commitments.',
            },
            {
              role: 'Small Business Owners',
              desc: 'Overseeing equipment financing, working capital loans, and commercial credit card installments.',
            },
          ].map((persona, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-sm text-white">{persona.role}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{persona.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold pt-2">
                <Check className="w-3.5 h-3.5" />
                <span>Zero EMI Confusion</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action Box */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-center space-y-6 shadow-xl shadow-blue-500/20">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Ready to Take Total Control of Your EMIs?
        </h2>
        <p className="text-sm text-blue-100 max-w-xl mx-auto font-normal">
          Test the interactive prototype with pre-loaded realistic Indian loans, live calculators, and financial visualizations.
        </p>

        <div className="flex items-center justify-center pt-2">
          <Button
            onClick={onLaunchApp}
            size="lg"
            variant="dark"
            className="w-full sm:w-auto font-bold bg-slate-900 hover:bg-slate-950 text-white shadow-md px-8 py-3.5"
            icon={ArrowRight}
          >
            Launch Prototype Dashboard
          </Button>
        </div>
      </section>
    </div>
  );
};
