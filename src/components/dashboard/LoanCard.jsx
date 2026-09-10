import React from 'react';
import {
  GraduationCap,
  Car,
  Home,
  CreditCard,
  User,
  Coins,
  Briefcase,
  ChevronRight,
  MoreVertical,
  Check,
  Calendar,
  Percent,
  Clock,
  Trash2,
  Edit3,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency, formatPercent, getOrdinalSuffix, formatDate } from '../../utils/formatters';

export const LoanCard = ({
  loan,
  onViewDetails,
  onMarkPaid,
  onEdit,
  onDelete,
  currency = 'INR',
}) => {
  // Category Icons
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Education Loan':
        return GraduationCap;
      case 'Vehicle Loan':
        return Car;
      case 'Home Loan':
        return Home;
      case 'Credit Card EMI':
        return CreditCard;
      case 'Business Loan':
        return Briefcase;
      case 'Gold Loan':
        return Coins;
      default:
        return User;
    }
  };

  const Icon = getCategoryIcon(loan.category);
  const principal = Number(loan.principal) || 0;
  const outstanding = Number(loan.outstanding) || 0;
  const repaid = Math.max(0, principal - outstanding);
  const repaidPercentage = principal > 0 ? Math.round((repaid / principal) * 100) : 0;

  return (
    <Card hover className="flex flex-col justify-between border-slate-200/90 shadow-xs relative group">
      <div>
        {/* Top Header: Category & Bank & Actions */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
              style={{ backgroundColor: loan.color || '#3b82f6' }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {loan.name}
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                {loan.bankName || 'General Lender'} • {loan.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(loan)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Edit Loan"
              aria-label="Edit loan"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(loan.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Loan"
              aria-label="Delete loan"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Key Numerical Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Monthly EMI
            </span>
            <span className="text-base font-black text-slate-900 block mt-0.5">
              {formatCurrency(loan.emiAmount, currency)}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Due on {getOrdinalSuffix(loan.dueDay)} of month
            </span>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Outstanding
            </span>
            <span className="text-base font-black text-slate-900 block mt-0.5">
              {formatCurrency(loan.outstanding, currency)}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              of {formatCurrency(loan.principal, currency)}
            </span>
          </div>
        </div>

        {/* Loan Spec Attributes */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-xs text-slate-600">
          <div>
            <span className="text-[10px] text-slate-400 block">Interest</span>
            <span className="font-bold text-slate-800">{formatPercent(loan.interestRate)}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Tenure Left</span>
            <span className="font-bold text-slate-800">{loan.remainingMonths || 0} / {loan.tenureMonths} mo</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Repaid</span>
            <span className="font-bold text-emerald-600">{repaidPercentage}%</span>
          </div>
        </div>

        {/* Repayment Progress Bar */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium text-[11px]">Repayment Progress</span>
            <span className="font-bold text-slate-800 text-[11px]">
              {formatCurrency(repaid, currency)} paid
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(4, Math.min(100, repaidPercentage))}%`,
                backgroundColor: loan.color || '#3b82f6',
              }}
            />
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="xs"
          onClick={() => onViewDetails(loan)}
          className="text-xs font-semibold py-1.5"
        >
          View Details
        </Button>

        {loan.isCurrentMonthPaid ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
            <Check className="w-3.5 h-3.5" />
            Cycle Paid
          </span>
        ) : (
          <Button
            size="xs"
            variant="primary"
            onClick={() => onMarkPaid(loan.id)}
            className="py-1.5 text-xs font-semibold shadow-xs"
          >
            Mark Paid
          </Button>
        )}
      </div>
    </Card>
  );
};
