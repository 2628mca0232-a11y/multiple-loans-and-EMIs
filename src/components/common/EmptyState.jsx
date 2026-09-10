import React from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = CreditCard,
  title = 'No loans found',
  description = 'Add your first loan to start tracking your EMIs, due dates, and repayment progress.',
  actionLabel = 'Add New Loan',
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-xs">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <Button onClick={onAction} icon={Plus} size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
