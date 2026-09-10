import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ArrowRight, Check } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const UpcomingEmiList = ({
  upcomingEmis,
  onMarkPaid,
  onViewLoan,
  onViewAll,
  currency = 'INR',
}) => {
  return (
    <Card padding="p-5 sm:p-6" className="shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Upcoming EMI Payments</h3>
            <p className="text-xs text-slate-500">Payments scheduled for this billing cycle</p>
          </div>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {upcomingEmis.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
            All loan EMIs for this period are settled!
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingEmis.slice(0, 4).map((loan) => {
              const isPaid = loan.isCurrentMonthPaid;
              const isOverdue = loan.status === 'overdue';
              const isDueToday = loan.daysLeft === 0 && !isPaid;
              const isDueSoon = loan.daysLeft > 0 && loan.daysLeft <= 3 && !isPaid;

              return (
                <div
                  key={loan.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isPaid
                      ? 'bg-emerald-50/40 border-emerald-200/60'
                      : isOverdue
                      ? 'bg-rose-50/50 border-rose-200/80'
                      : isDueToday
                      ? 'bg-amber-50/60 border-amber-200/80'
                      : 'bg-white hover:bg-slate-50 border-slate-200/80'
                  }`}
                >
                  {/* Left: Info */}
                  <div
                    onClick={() => onViewLoan && onViewLoan(loan)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: loan.color || '#3b82f6' }}
                      />
                      <h4 className="text-sm font-bold text-slate-900 truncate hover:text-blue-600 transition-colors">
                        {loan.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-medium truncate">
                        • {loan.bankName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 mt-1.5 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">
                        Due: {formatDate(loan.nextDueDate)}
                      </span>
                      <span>•</span>
                      {isPaid ? (
                        <Badge variant="success" size="sm">
                          <Check className="w-3 h-3" /> Paid
                        </Badge>
                      ) : isOverdue ? (
                        <Badge variant="danger" size="sm">
                          <AlertTriangle className="w-3 h-3" /> Overdue by {Math.abs(loan.daysLeft)}d
                        </Badge>
                      ) : isDueToday ? (
                        <Badge variant="warning" size="sm">
                          <Clock className="w-3 h-3" /> Due Today
                        </Badge>
                      ) : (
                        <Badge variant="indigo" size="sm">
                          <Clock className="w-3 h-3" /> In {loan.daysLeft} days
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Right: Amount & Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">EMI Amount</span>
                      <span className="text-base font-extrabold text-slate-900">
                        {formatCurrency(loan.emiAmount, currency)}
                      </span>
                    </div>

                    {isPaid ? (
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100/80 px-3 py-1.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Settled</span>
                      </div>
                    ) : (
                      <Button
                        size="xs"
                        variant={isOverdue ? 'danger' : isDueToday || isDueSoon ? 'primary' : 'outline'}
                        onClick={() => onMarkPaid(loan.id)}
                        className="shadow-xs font-semibold py-1.5"
                      >
                        Mark as Paid
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
        <span>Showing upcoming loans</span>
        <span>Marking as paid reduces remaining balance automatically</span>
      </div>
    </Card>
  );
};
