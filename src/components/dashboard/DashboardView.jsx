import React from 'react';
import {
  CreditCard,
  Coins,
  TrendingDown,
  Calendar,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';
import { StatCard } from './StatCard';
import { UpcomingEmiList } from './UpcomingEmiList';
import { MiniCalendar } from './MiniCalendar';
import { DebtHealthMeter } from './DebtHealthMeter';
import { LoanCard } from './LoanCard';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const DashboardView = ({
  loans,
  stats,
  onOpenAddModal,
  onViewLoan,
  onMarkPaid,
  onEditLoan,
  onDeleteLoan,
  onNavigateTab,
  currency = 'INR',
}) => {
  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Add Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Smart Loan & EMI Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time consolidation of all your loans, monthly installments, and upcoming dues
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            icon={Plus}
            size="md"
            onClick={onOpenAddModal}
            className="shadow-sm shadow-blue-500/20"
          >
            Add New Loan
          </Button>
        </div>
      </div>

      {/* 4 Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Active Loans */}
        <StatCard
          title="Total Active Loans"
          value={`${stats.totalActiveLoans} Accounts`}
          subtitle="All loans tracked in dashboard"
          icon={CreditCard}
          color="blue"
          trend={{ label: 'Portfolio Health', value: 'Active', positive: true }}
          onClick={() => onNavigateTab('loans')}
        />

        {/* 2. Total Monthly EMI */}
        <StatCard
          title="Total Monthly EMI"
          value={formatCurrency(stats.totalMonthlyEMI, currency)}
          subtitle="Monthly debt payment commitment"
          icon={Coins}
          color="indigo"
          trend={{ label: 'Installments/mo', value: `${stats.totalActiveLoans} EMIs`, positive: true }}
          onClick={() => onNavigateTab('calendar')}
        />

        {/* 3. Total Outstanding Debt */}
        <StatCard
          title="Total Outstanding"
          value={formatCurrency(stats.totalOutstanding, currency)}
          subtitle={`Original: ${formatCurrency(stats.totalPrincipal, currency)}`}
          icon={TrendingDown}
          color="amber"
          trend={{
            label: 'Repaid Ratio',
            value: `${Math.round(stats.overallRepaidPercentage)}% Repaid`,
            positive: true,
          }}
          onClick={() => onNavigateTab('analytics')}
        />

        {/* 4. Next EMI Due */}
        <StatCard
          title="Next EMI Due"
          value={
            stats.nextEmiDue
              ? formatCurrency(stats.nextEmiDue.emiAmount, currency)
              : 'None'
          }
          subtitle={
            stats.nextEmiDue
              ? `${stats.nextEmiDue.name} – ${formatDate(stats.nextEmiDue.nextDueDate)}`
              : 'All EMIs settled'
          }
          icon={Calendar}
          color={stats.nextEmiDue?.daysLeft <= 0 ? 'rose' : 'emerald'}
          trend={{
            label: 'Due Status',
            value: stats.nextEmiDue
              ? stats.nextEmiDue.isCurrentMonthPaid
                ? 'Paid'
                : stats.nextEmiDue.daysLeft === 0
                ? 'Due Today'
                : `In ${stats.nextEmiDue.daysLeft} days`
              : 'Settled',
            positive: stats.nextEmiDue ? stats.nextEmiDue.daysLeft > 0 : true,
          }}
          onClick={() => onNavigateTab('calendar')}
        />
      </div>

      {/* Debt Health & Payoff Velocity Banner */}
      <DebtHealthMeter stats={stats} currency={currency} />

      {/* Middle Section: Upcoming EMIs (Left) & Mini Calendar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <UpcomingEmiList
            upcomingEmis={stats.upcomingEmis}
            onMarkPaid={onMarkPaid}
            onViewLoan={onViewLoan}
            onViewAll={() => onNavigateTab('loans')}
            currency={currency}
          />
        </div>

        <div className="lg:col-span-5">
          <MiniCalendar
            loans={loans}
            onViewFullCalendar={() => onNavigateTab('calendar')}
            currency={currency}
          />
        </div>
      </div>

      {/* Bottom Section: Loan Overview Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900">All Active Loans Overview</h3>
            <p className="text-xs text-slate-500">
              Overview of all active borrowings with remaining tenure and repayment progress
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateTab('loans')}
            className="text-xs font-semibold"
          >
            Manage Loans ({loans.length})
          </Button>
        </div>

        {loans.length === 0 ? (
          <EmptyState onAction={onOpenAddModal} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loans.map((loan) => (
              <LoanCard
                key={loan.id}
                loan={loan}
                onViewDetails={onViewLoan}
                onMarkPaid={onMarkPaid}
                onEdit={onEditLoan}
                onDelete={onDeleteLoan}
                currency={currency}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
