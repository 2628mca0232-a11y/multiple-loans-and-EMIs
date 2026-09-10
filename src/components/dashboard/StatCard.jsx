import React from 'react';
import { Card } from '../common/Card';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
  onClick,
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50/80',
      text: 'text-blue-600',
      border: 'border-blue-100',
      glow: 'shadow-blue-500/5',
    },
    emerald: {
      bg: 'bg-emerald-50/80',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      glow: 'shadow-emerald-500/5',
    },
    amber: {
      bg: 'bg-amber-50/80',
      text: 'text-amber-600',
      border: 'border-amber-100',
      glow: 'shadow-amber-500/5',
    },
    indigo: {
      bg: 'bg-indigo-50/80',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      glow: 'shadow-indigo-500/5',
    },
    rose: {
      bg: 'bg-rose-50/80',
      text: 'text-rose-600',
      border: 'border-rose-100',
      glow: 'shadow-rose-500/5',
    },
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <Card
      hover={!!onClick}
      onClick={onClick}
      className={`relative overflow-hidden border ${scheme.border} shadow-sm ${onClick ? 'cursor-pointer' : ''}`}
      padding="p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 flex-1 min-w-0">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 leading-tight">
            {title}
          </p>
          <p className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-snug break-words">
            {value}
          </p>
          {subtitle && (
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 flex items-center gap-1.5 pt-0.5 leading-tight">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${scheme.bg} ${scheme.text} flex items-center justify-center shrink-0 shadow-xs ml-1`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">{trend.label}</span>
          <span className={`font-bold ${trend.positive ? 'text-emerald-600' : 'text-slate-700'}`}>
            {trend.value}
          </span>
        </div>
      )}
    </Card>
  );
};
