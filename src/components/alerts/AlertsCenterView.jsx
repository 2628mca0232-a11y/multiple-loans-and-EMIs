import React, { useState } from 'react';
import {
  BellRing,
  AlertTriangle,
  Clock,
  CheckCircle2,
  X,
  Check,
  Zap,
  Info,
  Sliders,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const AlertsCenterView = ({
  alerts,
  loans,
  onDismissAlert,
  onMarkPaid,
  onViewLoan,
  currency = 'INR',
}) => {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'pending' | 'overdue' | 'paid'

  const filteredAlerts = alerts.filter((alert) => {
    if (filterType === 'pending') return alert.type === 'due_soon' || alert.type === 'due_today';
    if (filterType === 'overdue') return alert.type === 'overdue';
    if (filterType === 'paid') return alert.type === 'paid';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            EMI Alerts & Notifications Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time proactive reminders to ensure you never miss a due date or incur late charges
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All Alerts' },
            { id: 'pending', label: 'Due Soon' },
            { id: 'overdue', label: 'Overdue' },
            { id: 'paid', label: 'Settled' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterType === f.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Academic Prototype Notification Info Card */}
      <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-3 text-xs text-blue-950">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-blue-900">
            Intelligent Date-Aware Notification Engine
          </p>
          <p className="text-blue-800 leading-relaxed">
            In this prototype, alerts are synthesized dynamically based on real calendar dates and repayment records. In production, EMIease triggers automated SMS, WhatsApp, and push notifications 3 days and 1 day prior to due dates.
          </p>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <Card padding="p-12" className="text-center bg-white border-slate-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 opacity-90" />
            <h3 className="text-base font-bold text-slate-800">No Alerts in this Category</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You are all caught up! When upcoming EMIs approach or need your attention, they will show up here.
            </p>
          </Card>
        ) : (
          filteredAlerts.map((alert) => {
            const isOverdue = alert.type === 'overdue';
            const isToday = alert.type === 'due_today';
            const isPaid = alert.type === 'paid';

            let borderStyle = 'border-slate-200 bg-white';
            let iconBox = 'bg-blue-100 text-blue-600';
            let IconComponent = Clock;

            if (isOverdue) {
              borderStyle = 'border-rose-200 bg-rose-50/40';
              iconBox = 'bg-rose-100 text-rose-600';
              IconComponent = AlertTriangle;
            } else if (isToday) {
              borderStyle = 'border-amber-200 bg-amber-50/40';
              iconBox = 'bg-amber-100 text-amber-600';
              IconComponent = Clock;
            } else if (isPaid) {
              borderStyle = 'border-emerald-200 bg-emerald-50/40';
              iconBox = 'bg-emerald-100 text-emerald-600';
              IconComponent = CheckCircle2;
            }

            const associatedLoan = loans.find((l) => l.id === alert.loanId);

            return (
              <Card
                key={alert.id}
                padding="p-4 sm:p-5"
                className={`border shadow-xs transition-all ${borderStyle}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left Icon & Message */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className={`p-2.5 rounded-xl shrink-0 ${iconBox}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900">{alert.title}</h4>
                        {isOverdue && <Badge variant="danger" size="sm">Overdue</Badge>}
                        {isToday && <Badge variant="warning" size="sm">Due Today</Badge>}
                        {isPaid && <Badge variant="success" size="sm">Paid</Badge>}
                        {!isOverdue && !isToday && !isPaid && (
                          <Badge variant="indigo" size="sm">Upcoming</Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        {alert.message}
                      </p>
                      <span className="text-[11px] text-slate-400 block pt-0.5">
                        Lender: {alert.bankName || 'General Bank'} • Amount: {formatCurrency(alert.emiAmount, currency)}
                      </span>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {!isPaid && (
                      <Button
                        size="xs"
                        variant={isOverdue ? 'danger' : 'primary'}
                        onClick={() => onMarkPaid(alert.loanId)}
                        className="font-semibold shadow-xs"
                      >
                        Mark as Paid
                      </Button>
                    )}

                    {associatedLoan && (
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => onViewLoan(associatedLoan)}
                      >
                        View Loan
                      </Button>
                    )}

                    <button
                      onClick={() => onDismissAlert(alert.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                      title="Dismiss Alert"
                      aria-label="Dismiss alert"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
