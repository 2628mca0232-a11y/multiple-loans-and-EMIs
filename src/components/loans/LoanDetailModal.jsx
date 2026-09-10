import React, { useState } from 'react';
import {
  Calendar,
  Percent,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Edit3,
  Trash2,
  TrendingDown,
  Building2,
  FileText,
  CreditCard,
  Layers,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import { formatCurrency, formatPercent, formatDate, getOrdinalSuffix } from '../../utils/formatters';
import { generateAmortizationSchedule } from '../../utils/emiCalculations';

export const LoanDetailModal = ({
  isOpen,
  onClose,
  loan,
  onMarkPaid,
  onOpenPrepay,
  onEdit,
  onDelete,
  currency = 'INR',
}) => {
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'schedule'

  if (!loan) return null;

  const principal = Number(loan.principal) || 0;
  const outstanding = Number(loan.outstanding) || 0;
  const repaid = Math.max(0, principal - outstanding);
  const repaidPct = principal > 0 ? Math.round((repaid / principal) * 100) : 0;

  // Projected Amortization Schedule
  const schedule = generateAmortizationSchedule(
    outstanding > 0 ? outstanding : principal,
    loan.interestRate,
    loan.remainingMonths || 12,
    new Date()
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={loan.name}
      subtitle={`${loan.bankName || 'General Bank'} • ${loan.category}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Top Header Card / Banner */}
        <div
          className="p-5 sm:p-6 rounded-2xl text-white relative overflow-hidden shadow-md"
          style={{
            background: `linear-gradient(135deg, ${loan.color || '#1e3a8a'} 0%, #0f172a 100%)`,
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                  {loan.category}
                </span>
                {loan.isCurrentMonthPaid ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                    Paid for this cycle
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/40">
                    Due {getOrdinalSuffix(loan.dueDay)} of month
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                {formatCurrency(outstanding, currency)}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Current Outstanding Balance (Original: {formatCurrency(principal, currency)})
              </p>
            </div>

            {/* Quick Actions in Banner */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                size="sm"
                variant="success"
                onClick={() => onOpenPrepay(loan)}
                icon={Zap}
                className="shadow-sm"
              >
                Prepay / Extra
              </Button>
              {!loan.isCurrentMonthPaid && (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => onMarkPaid(loan.id)}
                  icon={CheckCircle2}
                >
                  Mark EMI Paid
                </Button>
              )}
            </div>
          </div>

          {/* Repayment Progress Bar */}
          <div className="mt-6 pt-4 border-t border-white/15 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-200">
              <span>{formatCurrency(repaid, currency)} Repaid</span>
              <span className="font-bold text-white">{repaidPct}% Paid Off</span>
              <span>{formatCurrency(outstanding, currency)} Remaining</span>
            </div>
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(3, repaidPct)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 6 Key Financial Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Monthly EMI</span>
            <span className="text-sm font-black text-slate-900 mt-0.5 block">
              {formatCurrency(loan.emiAmount, currency)}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Interest Rate</span>
            <span className="text-sm font-black text-blue-600 mt-0.5 block">
              {formatPercent(loan.interestRate)} p.a.
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Due Day</span>
            <span className="text-sm font-black text-slate-900 mt-0.5 block">
              {getOrdinalSuffix(loan.dueDay)}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Remaining Tenure</span>
            <span className="text-sm font-black text-slate-900 mt-0.5 block">
              {loan.remainingMonths || 0} Months
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Tenure</span>
            <span className="text-sm font-black text-slate-900 mt-0.5 block">
              {loan.tenureMonths} Months
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Start Date</span>
            <span className="text-sm font-bold text-slate-900 mt-0.5 block">
              {formatDate(loan.startDate)}
            </span>
          </div>
        </div>

        {/* Notes if any */}
        {loan.notes && (
          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/70 text-xs text-blue-950 flex items-start gap-2.5">
            <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-blue-900">Notes & Purpose:</span>
              <p className="mt-0.5 text-blue-800">{loan.notes}</p>
            </div>
          </div>
        )}

        {/* Tabs: Payment History vs Future Amortization Schedule */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('history')}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'history'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Payment History ({loan.paymentHistory?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'schedule'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Projected Amortization Schedule
              </button>
            </div>
          </div>

          {/* History View */}
          {activeTab === 'history' && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              {!loan.paymentHistory || loan.paymentHistory.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No payment records logged yet. Click "Mark EMI Paid" to register a payment.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">EMI Amount</th>
                        <th className="py-3 px-4">Principal</th>
                        <th className="py-3 px-4">Interest</th>
                        <th className="py-3 px-4">Method / Notes</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {loan.paymentHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {formatDate(item.date)}
                          </td>
                          <td className="py-3 px-4 font-extrabold text-slate-900">
                            {formatCurrency(item.amount, currency)}
                          </td>
                          <td className="py-3 px-4 text-emerald-600 font-semibold">
                            {formatCurrency(item.principal, currency)}
                          </td>
                          <td className="py-3 px-4 text-rose-500 font-semibold">
                            {formatCurrency(item.interest, currency)}
                          </td>
                          <td className="py-3 px-4 text-slate-500">
                            {item.paymentMethod || 'Online'}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Badge variant="success" size="sm">
                              <CheckCircle2 className="w-3 h-3" /> Paid
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Schedule View */}
          {activeTab === 'schedule' && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="max-h-72 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200 sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Month</th>
                      <th className="py-2.5 px-3">EMI</th>
                      <th className="py-2.5 px-3">Principal</th>
                      <th className="py-2.5 px-3">Interest</th>
                      <th className="py-2.5 px-3 text-right">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {schedule.slice(0, 24).map((row) => (
                      <tr key={row.monthNumber} className="hover:bg-slate-50/60">
                        <td className="py-2 px-3 text-slate-400 font-medium">{row.monthNumber}</td>
                        <td className="py-2 px-3 font-semibold text-slate-800">{row.displayDate}</td>
                        <td className="py-2 px-3 font-bold text-slate-900">{formatCurrency(row.emiAmount, currency)}</td>
                        <td className="py-2 px-3 text-emerald-600">{formatCurrency(row.principal, currency)}</td>
                        <td className="py-2 px-3 text-rose-500">{formatCurrency(row.interest, currency)}</td>
                        <td className="py-2 px-3 text-right font-semibold text-slate-700">
                          {formatCurrency(row.remainingBalance, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-2.5 bg-slate-50 text-[11px] text-slate-500 text-center border-t border-slate-200">
                Showing upcoming projected amortization schedule
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Edit3}
              onClick={() => {
                onClose();
                onEdit(loan);
              }}
            >
              Edit Loan
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => {
                onClose();
                onDelete(loan.id);
              }}
            >
              Delete
            </Button>
          </div>

          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
