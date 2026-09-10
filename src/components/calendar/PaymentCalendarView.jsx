import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  CreditCard,
  Check,
  Zap,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatCurrency, formatDate, getOrdinalSuffix } from '../../utils/formatters';

export const PaymentCalendarView = ({
  loans,
  onMarkPaid,
  onViewLoan,
  currency = 'INR',
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString('en-IN', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Navigation
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const goToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDay(now.getDate());
  };

  // Map loans to due dates in current month
  const loanByDay = {};
  loans.forEach((loan) => {
    const dueDay = Math.min(daysInMonth, loan.dueDay);
    if (!loanByDay[dueDay]) loanByDay[dueDay] = [];
    loanByDay[dueDay].push(loan);
  });

  // Selected Day Details
  const selectedDayLoans = loanByDay[selectedDay] || [];

  // Monthly stats
  const totalMonthDue = loans.reduce((acc, curr) => acc + (Number(curr.emiAmount) || 0), 0);
  const paidCount = loans.filter((l) => l.isCurrentMonthPaid).length;
  const pendingCount = loans.length - paidCount;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            EMI Payment Calendar
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Visual schedule of all your monthly EMI obligations, due dates, and settlement statuses
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={goToToday}>
            Today
          </Button>
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-sm font-bold text-slate-900 min-w-[130px] text-center">
              {monthName} {year}
            </span>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Month Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="p-4" className="shadow-xs bg-white border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Due This Month</span>
          <span className="text-xl font-black text-slate-900 mt-0.5 block">
            {formatCurrency(totalMonthDue, currency)}
          </span>
        </Card>
        <Card padding="p-4" className="shadow-xs bg-emerald-50/50 border-emerald-200/80">
          <span className="text-[10px] uppercase font-bold text-emerald-700 block">Settled EMIs</span>
          <span className="text-xl font-black text-emerald-700 mt-0.5 block">
            {paidCount} of {loans.length} Paid
          </span>
        </Card>
        <Card padding="p-4" className="shadow-xs bg-amber-50/50 border-amber-200/80">
          <span className="text-[10px] uppercase font-bold text-amber-700 block">Pending Due EMIs</span>
          <span className="text-xl font-black text-amber-700 mt-0.5 block">
            {pendingCount} Loans Pending
          </span>
        </Card>
      </div>

      {/* Main Grid: Calendar on Left (2/3), Day Details Drawer on Right (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6">
          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[72px] sm:min-h-[88px] rounded-xl bg-slate-50/50" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isToday =
                dayNum === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();
              const isSelected = dayNum === selectedDay;
              const dayLoans = loanByDay[dayNum] || [];
              const hasLoans = dayLoans.length > 0;

              return (
                <div
                  key={dayNum}
                  onClick={() => setSelectedDay(dayNum)}
                  className={`min-h-[72px] sm:min-h-[88px] p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/30'
                      : isToday
                      ? 'border-blue-300 bg-blue-50/20'
                      : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                        isToday
                          ? 'bg-blue-600 text-white'
                          : isSelected
                          ? 'text-blue-600 font-extrabold'
                          : 'text-slate-700'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {hasLoans && (
                      <span className="text-[10px] font-bold text-slate-500">
                        {dayLoans.length} {dayLoans.length === 1 ? 'EMI' : 'EMIs'}
                      </span>
                    )}
                  </div>

                  {/* Loan Pills on Day */}
                  <div className="space-y-1 mt-1 overflow-hidden">
                    {dayLoans.slice(0, 2).map((loan) => {
                      const isPaid = loan.isCurrentMonthPaid;
                      return (
                        <div
                          key={loan.id}
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded truncate border ${
                            isPaid
                              ? 'bg-emerald-100/80 text-emerald-800 border-emerald-200'
                              : 'bg-blue-100/80 text-blue-900 border-blue-200'
                          }`}
                          title={`${loan.name}: ${formatCurrency(loan.emiAmount, currency)}`}
                        >
                          {loan.name}
                        </div>
                      );
                    })}
                    {dayLoans.length > 2 && (
                      <div className="text-[9px] font-bold text-slate-400 pl-1">
                        +{dayLoans.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calendar Status Legend */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-around flex-wrap gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Green = Paid EMI</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Blue = Upcoming EMI</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span>Red = Overdue EMI</span>
            </div>
          </div>
        </div>

        {/* Right Details Panel for Selected Day */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {getOrdinalSuffix(selectedDay)} {monthName} {year}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedDayLoans.length === 0
                    ? 'No payments scheduled for this date'
                    : `${selectedDayLoans.length} loan payment(s) due`}
                </p>
              </div>
            </div>

            {selectedDayLoans.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                No EMI due on this day. Select a highlighted date from the calendar to inspect loan dues.
              </div>
            ) : (
              <div className="space-y-4 mt-4">
                {selectedDayLoans.map((loan) => (
                  <div
                    key={loan.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{loan.name}</h4>
                        <p className="text-xs text-slate-500">{loan.bankName} • {loan.category}</p>
                      </div>
                      <span className="text-sm font-black text-slate-900">
                        {formatCurrency(loan.emiAmount, currency)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                      <span>Status:</span>
                      {loan.isCurrentMonthPaid ? (
                        <Badge variant="success" size="sm">
                          <CheckCircle2 className="w-3 h-3" /> Paid
                        </Badge>
                      ) : (
                        <Badge variant="warning" size="sm">
                          <Clock className="w-3 h-3" /> Due for Payment
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => onViewLoan(loan)}
                      >
                        Loan Details
                      </Button>
                      {!loan.isCurrentMonthPaid && (
                        <Button
                          size="xs"
                          variant="primary"
                          onClick={() => onMarkPaid(loan.id)}
                        >
                          Mark Paid
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 text-center">
            Clicking any day updates this inspector panel
          </div>
        </div>
      </div>
    </div>
  );
};
