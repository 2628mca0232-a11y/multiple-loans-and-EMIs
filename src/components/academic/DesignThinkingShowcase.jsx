import React, { useState } from 'react';
import {
  Lightbulb,
  Target,
  Rocket,
  CheckCircle2,
  TrendingUp,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Layers,
  Sparkles,
  Users,
  Award,
  HelpCircle,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const DesignThinkingShowcase = ({ onLaunchPrototype }) => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'problem',
      step: '01',
      title: 'Problem Statement',
      tagline: 'The Core Human Friction',
      icon: HelpCircle,
      color: 'from-rose-500 to-red-600',
    },
    {
      id: 'users',
      step: '02',
      title: 'Target Users',
      tagline: 'Empathy & Personas',
      icon: Users,
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'solution',
      step: '03',
      title: 'Proposed Final Solution',
      tagline: 'The Value Proposition',
      icon: Lightbulb,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'prototype',
      step: '04',
      title: 'Working Prototype',
      tagline: 'Live Interactive System',
      icon: LayoutDashboard,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      id: 'features',
      step: '05',
      title: 'Key Features',
      tagline: 'Functional Innovations',
      icon: Layers,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'benefits',
      step: '06',
      title: 'Expected Benefits',
      tagline: 'Measurable Impact',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'conclusion',
      step: '07',
      title: 'Conclusion',
      tagline: 'Project Summary & Vision',
      icon: Award,
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Academic Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Design Thinking & Entrepreneurship CA-1 Showcase</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              EMIease: Project Evaluation Deck
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal leading-relaxed">
              A comprehensive presentation walkthrough detailing the problem discovery, target demographics, innovative solution architecture, interactive prototype, and evaluated benefits.
            </p>
          </div>

          <Button
            onClick={onLaunchPrototype}
            size="lg"
            variant="primary"
            icon={ArrowRight}
            className="shrink-0 shadow-lg shadow-blue-500/30 font-bold"
          >
            Launch Interactive Prototype
          </Button>
        </div>
      </div>

      {/* Stage Stepper Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = activeStage === idx;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(idx)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all text-left shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {stage.step}
              </div>
              <div>
                <span className="text-xs font-bold block">{stage.title}</span>
                <span
                  className={`text-[10px] block -mt-0.5 ${
                    isActive ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {stage.tagline}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Presentation Canvas */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8 min-h-[420px]">
        {/* Stage 1: Problem Statement */}
        {activeStage === 0 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <Badge variant="danger" size="lg">Stage 01 • Define</Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                1. Problem Statement
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200 text-rose-950 space-y-3">
              <h3 className="text-lg font-bold text-rose-900">
                The Core Friction
              </h3>
              <blockquote className="text-base sm:text-lg font-medium italic leading-relaxed text-slate-800 border-l-4 border-rose-500 pl-4">
                "Managing multiple loans and EMI payments is difficult because users must keep track of different due dates, EMI amounts, interest rates, and outstanding balances across different lenders. This creates confusion, increases the risk of missed payments, and makes financial planning difficult."
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-xs text-rose-600 block uppercase">Friction Point 1</span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">Scattered Due Dates</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Dates fall on 5th, 10th, 15th, and 20th across disparate banks, causing cognitive overload.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-xs text-rose-600 block uppercase">Friction Point 2</span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">Penalty & CIBIL Damage</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Forgetting a single installment attracts hefty late fees and reduces credit scoreworthiness.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-xs text-rose-600 block uppercase">Friction Point 3</span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">Zero Consolidated Visibility</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Borrowers lack a single accurate metric for their total fixed monthly debt burden.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stage 2: Target Users */}
        {activeStage === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <Badge variant="warning" size="lg">Stage 02 • Empathize</Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                2. Target Users & User Personas
              </h2>
            </div>

            <p className="text-sm text-slate-600">
              Through empathy interviews and borrower journey mapping, we identified 5 core user segments:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'College Students & Graduates',
                  desc: 'Managing education loans alongside credit card EMIs for laptops or study equipment.',
                  icon: Users,
                  color: 'bg-blue-50 text-blue-700',
                },
                {
                  title: 'Salaried Employees',
                  desc: 'Handling simultaneous personal loans, vehicle loans, and gadget EMIs on a monthly budget.',
                  icon: Users,
                  color: 'bg-indigo-50 text-indigo-700',
                },
                {
                  title: 'Families & Homeowners',
                  desc: 'Overseeing large long-term Home Loans alongside car financing and family commitments.',
                  icon: Users,
                  color: 'bg-emerald-50 text-emerald-700',
                },
                {
                  title: 'Small Business Owners',
                  desc: 'Tracking equipment loans, working capital credit lines, and commercial installments.',
                  icon: Users,
                  color: 'bg-amber-50 text-amber-700',
                },
                {
                  title: 'Anyone Managing Multiple EMIs',
                  desc: 'Any borrower seeking a single organized dashboard to eliminate financial stress.',
                  icon: Users,
                  color: 'bg-purple-50 text-purple-700',
                },
              ].map((user, idx) => {
                const Icon = user.icon;
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${user.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">{user.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{user.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stage 3: Proposed Final Solution */}
        {activeStage === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <Badge variant="primary" size="lg">Stage 03 • Ideate & Define</Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                3. Proposed Final Solution
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950 space-y-3">
              <h3 className="text-lg font-bold text-blue-900">
                The Solution Architecture
              </h3>
              <blockquote className="text-base sm:text-lg font-medium italic leading-relaxed text-slate-800 border-l-4 border-blue-600 pl-4">
                "EMIease is a centralized loan management platform that brings all loans and EMI information into one dashboard, provides payment reminders, tracks repayment progress, and visualizes the user's overall debt situation."
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-blue-600 uppercase">Unified Command</span>
                <p className="text-xs text-slate-600">
                  Consolidates all lending institutions (HDFC, SBI, ICICI, Axis, etc.) into one zero-confusion dashboard.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-emerald-600 uppercase">Proactive Reminders</span>
                <p className="text-xs text-slate-600">
                  Smart due-date engine alerts users ahead of schedule to ensure 100% on-time payment compliance.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-indigo-600 uppercase">Repayment Velocity</span>
                <p className="text-xs text-slate-600">
                  Visual progress meters and payoff simulators help borrowers eliminate debt faster with smart strategies.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-amber-600 uppercase">Zero Friction & Privacy</span>
                <p className="text-xs text-slate-600">
                  Stores data client-side with localStorage without requiring bank credentials or invasive database tracking.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stage 4: Prototype */}
        {activeStage === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <Badge variant="indigo" size="lg">Stage 04 • Prototype</Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                4. Functional Interactive Prototype
              </h2>
            </div>

            <p className="text-sm text-slate-600">
              The prototype is fully built and functioning with realistic Indian lending data, interactive calculations, and full local persistence:
            </p>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg text-white">Interactive Prototype Demo Flows</h3>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/30 font-bold">
                  Presentation Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white/10 rounded-xl">
                  <strong>1. View 4 Realistic Loans:</strong> Personal Loan, Education Loan, Car Loan, and Credit Card EMI.
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <strong>2. 1-Click EMI Settlement:</strong> Mark an EMI as paid with confetti feedback and balance recalculation.
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <strong>3. Add & Edit Loans:</strong> Real-time EMI calculation assistant and validation.
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <strong>4. Visual Analytics:</strong> Interactive Recharts graphs and debt payoff strategy recommendations.
                </div>
              </div>

              <Button
                onClick={onLaunchPrototype}
                size="md"
                variant="primary"
                icon={ArrowRight}
                className="w-full justify-center mt-2 shadow-lg"
              >
                Launch Prototype Now
              </Button>
            </div>
          </div>
        )}

        {/* Stage 5: Key Features */}
        {activeStage === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <Badge variant="primary" size="lg">Stage 05 • Key Features</Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                5. Key Features Architecture
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Centralized Loan Dashboard', desc: 'Summary cards for active loans, total monthly EMI, total outstanding debt, and next EMI due.' },
                { title: 'EMI Tracking & Settlement', desc: '1-click "Mark as Paid" with instant principal deduction and payment history logging.' },
                { title: 'Due-Date Calendar', desc: 'Monthly calendar view with color-coded status badges (Green=Paid, Blue=Upcoming, Red=Overdue).' },
                { title: 'Smart EMI Reminders', desc: 'Proactive notification engine highlighting overdue payments and upcoming dues.' },
                { title: 'Loan-wise Progress', desc: 'Visual progress meters showing repaid amounts, remaining balance, and tenure countdown.' },
                { title: 'EMI & Prepayment Calculator', desc: 'Simulate loan scenarios and discover savings from lump-sum prepayments.' },
                { title: 'Analytics & Charts', desc: 'Visual charts for EMI distribution, loan balance comparisons, and payoff strategy optimization.' },
                { title: 'Payment History', desc: 'Detailed payment log with dates, principal components, interest components, and payment modes.' },
                { title: 'Local Data Storage & Export', desc: 'Fast, private localStorage persistence with JSON backup export and import.' },
              ].map((feat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <h3 className="font-bold text-xs text-slate-900">{feat.title}</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stage 6: Expected Benefits */}
        {activeStage === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <Badge variant="success" size="lg">Stage 06 • Expected Benefits</Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                6. Expected Benefits & Value Created
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Reduces EMI Confusion',
                  desc: 'Consolidates scattered loan terms and dues into one unified dashboard.',
                  icon: Sparkles,
                },
                {
                  title: 'Helps Avoid Missed Payments',
                  desc: 'Prevents costly late fee penalties and protects borrower CIBIL credit scores.',
                  icon: ShieldCheck,
                },
                {
                  title: 'Saves Time & Cognitive Effort',
                  desc: 'No need to log into multiple banking apps and portals each month.',
                  icon: CheckCircle2,
                },
                {
                  title: 'Provides Complete Financial Visibility',
                  desc: 'Accurately displays total monthly fixed obligations and remaining debt.',
                  icon: TrendingUp,
                },
                {
                  title: 'Easy-to-Understand Repayment Progress',
                  desc: 'Motivates borrowers with clear visual progress bars and repayment milestones.',
                  icon: Award,
                },
                {
                  title: 'Organizes Multiple Loans in One Place',
                  desc: 'Structured category management for Education, Personal, Car, and Home loans.',
                  icon: LayoutDashboard,
                },
              ].map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex items-start gap-3.5">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-emerald-950">{benefit.title}</h3>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stage 7: Conclusion */}
        {activeStage === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <Badge variant="purple" size="lg">Stage 07 • Conclusion</Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                7. Conclusion
              </h2>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white space-y-4 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Summary & Academic Takeaway
              </h3>
              <blockquote className="text-base sm:text-lg font-medium italic leading-relaxed text-indigo-100 border-l-4 border-amber-400 pl-4">
                "EMIease transforms scattered loan information into a simple, organized, and easy-to-understand dashboard, helping users manage multiple EMIs more effectively."
              </blockquote>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={onLaunchPrototype}
                  size="md"
                  variant="primary"
                  icon={ArrowRight}
                  className="shadow-md"
                >
                  Explore Working Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <Button
            variant="secondary"
            size="sm"
            disabled={activeStage === 0}
            onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
          >
            Previous Stage
          </Button>

          <span className="text-xs text-slate-400 font-semibold">
            Stage {activeStage + 1} of {stages.length}
          </span>

          {activeStage < stages.length - 1 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setActiveStage((prev) => Math.min(stages.length - 1, prev + 1))}
            >
              Next Stage
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              onClick={onLaunchPrototype}
              icon={ArrowRight}
            >
              Launch Live App
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
