import React, { useState } from 'react';
import { Zap, TrendingDown, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { calculatePrepaymentSavings } from '../../utils/emiCalculations';
import { formatCurrency } from '../../utils/formatters';

export const PrepayModal = ({
  isOpen,
  onClose,
  loan,
  onPrepay,
  currency = 'INR',
}) => {
  const [prepayAmount, setPrepayAmount] = useState('');
  const [notes, setNotes] = useState('Extra principal prepayment');

  if (!loan) return null;

  const currentOutstanding = Number(loan.outstanding) || 0;
  const numericPrepay = Math.min(currentOutstanding, Math.max(0, Number(prepayAmount) || 0));

  // Calculate savings preview
  const savings = calculatePrepaymentSavings(
    currentOutstanding,
    loan.interestRate,
    loan.remainingMonths || 12,
    numericPrepay,
    loan.emiAmount
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numericPrepay <= 0) return;

    onPrepay(loan.id, numericPrepay, notes);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Prepay / Lump-Sum Payment"
      subtitle={`Make an extra principal payment for "${loan.name}" to reduce overall interest`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Loan Summary Snippet */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block font-semibold uppercase">Current Balance</span>
            <span className="text-sm font-black text-slate-900">
              {formatCurrency(currentOutstanding, currency)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block font-semibold uppercase">Monthly EMI</span>
            <span className="text-sm font-bold text-slate-900">
              {formatCurrency(loan.emiAmount, currency)}
            </span>
          </div>
        </div>

        {/* Prepayment input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Prepayment Amount (₹) *
          </label>
          <input
            type="number"
            min="1"
            max={currentOutstanding}
            placeholder="e.g. 25000"
            value={prepayAmount}
            onChange={(e) => setPrepayAmount(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900"
          />
          <div className="flex gap-2 mt-2">
            {[10000, 25000, 50000].map((quick) => (
              <button
                key={quick}
                type="button"
                onClick={() => setPrepayAmount(String(Math.min(currentOutstanding, quick)))}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
              >
                +₹{quick.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Savings Impact Card */}
        {numericPrepay > 0 && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-900 to-slate-900 text-white space-y-3 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Projected Savings Impact</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <span className="text-[10px] text-slate-300 uppercase font-semibold block">Interest Saved</span>
                <span className="text-base font-black text-emerald-300 mt-0.5 block">
                  {formatCurrency(savings.interestSaved, currency)}
                </span>
              </div>
              <div className="p-2.5 bg-white/10 rounded-xl">
                <span className="text-[10px] text-slate-300 uppercase font-semibold block">Time Saved</span>
                <span className="text-base font-black text-blue-300 mt-0.5 block">
                  {savings.monthsSaved} Months
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-tight">
              New Remaining Balance: <strong>{formatCurrency(currentOutstanding - numericPrepay, currency)}</strong>
            </p>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Payment Notes / Reference
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="success"
            disabled={numericPrepay <= 0}
            icon={Zap}
          >
            Apply Prepayment
          </Button>
        </div>
      </form>
    </Modal>
  );
};
