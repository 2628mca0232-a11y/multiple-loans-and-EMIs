import React from 'react';
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/formatters';

export const MiniCalendar = ({
  loans = [],
  onViewFullCalendar,
  currency = 'INR',
}) => {
  const today = new Date();
  const currentMonth = today.toLocaleString('en-IN', { month: 'long' });
  const currentYear = today.getFullYear();

  // Days in month
  const totalDays = new Date(currentYear, today.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, today.getMonth(), 1).getDay();

  // Map due dates
  const emiByDay = {};
  loans.forEach((loan) => {
    const day = loan.dueDay;
    if (!emiByDay[day]) {
      emiByDay[day] = [];
    }
    emiByDay[day].push(loan);
  });

  return (
    <Card padding="p-5 sm:p-6" className="shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {currentMonth} {currentYear}
              </h3>
              <p className="text-xs text-slate-500">EMI Schedule Snapshot</p>
            </div>
          </div>
          {onViewFullCalendar && (
            <button
              onClick={onViewFullCalendar}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Full Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Calendar Grid Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 text-xs">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8 rounded-lg" />
          ))}

          {Array.from({ length: totalDays }).map((_, i) => {
            const dayNum = i + 1;
            const isToday = dayNum === today.getDate();
            const dayLoans = emiByDay[dayNum] || [];
            const hasLoans = dayLoans.length > 0;

            let dotColor = 'bg-blue-600';
            let bgStyle = isToday ? 'bg-blue-50/80 font-bold border border-blue-200' : 'hover:bg-slate-100';

            if (hasLoans) {
              const allPaid = dayLoans.every((l) => l.isCurrentMonthPaid);
              const anyOverdue = dayLoans.some((l) => !l.isCurrentMonthPaid && dayNum < today.getDate());

              if (allPaid) {
                dotColor = 'bg-emerald-500';
              } else if (anyOverdue) {
                dotColor = 'bg-rose-500';
              } else {
                dotColor = 'bg-amber-500';
              }
            }

            return (
              <div
                key={dayNum}
                className={`h-8 rounded-lg flex flex-col items-center justify-center relative transition-colors cursor-pointer ${bgStyle}`}
                title={
                  hasLoans
                    ? dayLoans.map((l) => `${l.name}: ${formatCurrency(l.emiAmount, currency)}`).join('\n')
                    : undefined
                }
                onClick={onViewFullCalendar}
              >
                <span className={`text-[11px] ${isToday ? 'text-blue-600 font-extrabold' : 'text-slate-700'}`}>
                  {dayNum}
                </span>
                {hasLoans && (
                  <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${dotColor}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-around text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Paid EMI
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          Upcoming
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          Overdue
        </span>
      </div>
    </Card>
  );
};
