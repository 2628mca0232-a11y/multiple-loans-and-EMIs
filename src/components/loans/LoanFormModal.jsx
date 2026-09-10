import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, Check, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { LOAN_CATEGORIES, POPULAR_BANKS } from '../../data/demoData';
import { calculateEMI, calculateLoanSummary } from '../../utils/emiCalculations';
import { formatCurrency } from '../../utils/formatters';

export const LoanFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  currency = 'INR',
}) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    name: '',
    category: 'Personal Loan',
    bankName: 'HDFC Bank',
    principal: '',
    outstanding: '',
    interestRate: '',
    emiAmount: '',
    startDate: new Date().toISOString().split('T')[0],
    tenureMonths: 36,
    remainingMonths: 36,
    dueDay: 5,
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'Personal Loan',
        bankName: initialData.bankName || 'HDFC Bank',
        principal: initialData.principal || '',
        outstanding: initialData.outstanding || '',
        interestRate: initialData.interestRate || '',
        emiAmount: initialData.emiAmount || '',
        startDate: initialData.startDate || new Date().toISOString().split('T')[0],
        tenureMonths: initialData.tenureMonths || 36,
        remainingMonths: initialData.remainingMonths || initialData.tenureMonths || 36,
        dueDay: initialData.dueDay || 5,
        notes: initialData.notes || '',
      });
    } else {
      setFormData({
        name: '',
        category: 'Personal Loan',
        bankName: 'HDFC Bank',
        principal: '',
        outstanding: '',
        interestRate: '10.5',
        emiAmount: '',
        startDate: new Date().toISOString().split('T')[0],
        tenureMonths: 36,
        remainingMonths: 36,
        dueDay: 5,
        notes: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  // Handle auto calculation of EMI
  const handleAutoCalculateEMI = () => {
    const P = Number(formData.principal);
    const r = Number(formData.interestRate);
    const n = Number(formData.tenureMonths);

    if (P > 0 && n > 0) {
      const calculated = calculateEMI(P, r, n);
      setFormData((prev) => ({
        ...prev,
        emiAmount: calculated,
        outstanding: prev.outstanding === '' ? P : prev.outstanding,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Loan Name is required';
    if (!formData.principal || Number(formData.principal) <= 0) {
      newErrors.principal = 'Please enter a valid positive principal amount';
    }
    if (formData.outstanding === '' || Number(formData.outstanding) < 0) {
      newErrors.outstanding = 'Please enter a valid outstanding balance';
    }
    if (!formData.interestRate || Number(formData.interestRate) < 0) {
      newErrors.interestRate = 'Please enter a valid interest rate';
    }
    if (!formData.emiAmount || Number(formData.emiAmount) <= 0) {
      newErrors.emiAmount = 'Please enter a valid EMI amount';
    }
    if (!formData.tenureMonths || Number(formData.tenureMonths) <= 0) {
      newErrors.tenureMonths = 'Please enter a valid tenure in months';
    }
    if (!formData.dueDay || Number(formData.dueDay) < 1 || Number(formData.dueDay) > 31) {
      newErrors.dueDay = 'Due day must be between 1 and 31';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      principal: Number(formData.principal),
      outstanding: Number(formData.outstanding || formData.principal),
      interestRate: Number(formData.interestRate),
      emiAmount: Number(formData.emiAmount),
      tenureMonths: Number(formData.tenureMonths),
      remainingMonths: Number(formData.remainingMonths || formData.tenureMonths),
      dueDay: Number(formData.dueDay),
    });

    onClose();
  };

  // Preview metrics
  const previewSummary = calculateLoanSummary(
    Number(formData.principal) || 0,
    Number(formData.interestRate) || 0,
    Number(formData.tenureMonths) || 12,
    Number(formData.emiAmount) || null
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Loan Details' : 'Add New Loan & EMI'}
      subtitle={
        isEditing
          ? 'Update the terms, interest, or remaining balance for this loan'
          : 'Enter your loan details to start tracking due dates and repayment progress'
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Loan Name & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Loan Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Home Loan, MacBook EMI, Car Loan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors.name ? 'border-rose-300 ring-rose-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Loan Type / Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {LOAN_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bank & Start Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Lender / Bank Name
            </label>
            <input
              type="text"
              list="banks-list"
              placeholder="e.g. HDFC Bank, SBI, ICICI"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <datalist id="banks-list">
              {POPULAR_BANKS.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Loan Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Principal & Outstanding */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Principal (Original Loan Amount) (₹) *
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 500000"
              value={formData.principal}
              onChange={(e) => {
                const val = e.target.value;
                setFormData({
                  ...formData,
                  principal: val,
                  outstanding: formData.outstanding === '' ? val : formData.outstanding,
                });
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors.principal ? 'border-rose-300 ring-rose-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
            />
            {errors.principal && <p className="text-xs text-rose-500 mt-1">{errors.principal}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Current Outstanding Balance (₹) *
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 350000"
              value={formData.outstanding}
              onChange={(e) => setFormData({ ...formData, outstanding: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors.outstanding ? 'border-rose-300 ring-rose-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
            />
            {errors.outstanding && <p className="text-xs text-rose-500 mt-1">{errors.outstanding}</p>}
          </div>
        </div>

        {/* Interest Rate & Tenure */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Interest Rate (% p.a.) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 10.5"
              value={formData.interestRate}
              onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors.interestRate ? 'border-rose-300 ring-rose-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
            />
            {errors.interestRate && <p className="text-xs text-rose-500 mt-1">{errors.interestRate}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Total Tenure (Months) *
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 36"
              value={formData.tenureMonths}
              onChange={(e) => {
                const val = e.target.value;
                setFormData({
                  ...formData,
                  tenureMonths: val,
                  remainingMonths: formData.remainingMonths === '' ? val : formData.remainingMonths,
                });
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors.tenureMonths ? 'border-rose-300 ring-rose-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
            />
            {errors.tenureMonths && <p className="text-xs text-rose-500 mt-1">{errors.tenureMonths}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Months Remaining
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 24"
              value={formData.remainingMonths}
              onChange={(e) => setFormData({ ...formData, remainingMonths: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* EMI Amount & Due Day */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Monthly EMI Amount (₹) *
              </label>
              <button
                type="button"
                onClick={handleAutoCalculateEMI}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <Calculator className="w-3 h-3" /> Auto-calculate
              </button>
            </div>
            <input
              type="number"
              min="0"
              placeholder="e.g. 8500"
              value={formData.emiAmount}
              onChange={(e) => setFormData({ ...formData, emiAmount: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors.emiAmount ? 'border-rose-300 ring-rose-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
            />
            {errors.emiAmount && <p className="text-xs text-rose-500 mt-1">{errors.emiAmount}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              EMI Due Date (Day of Month: 1–31) *
            </label>
            <input
              type="number"
              min="1"
              max="31"
              placeholder="e.g. 5, 10, 15"
              value={formData.dueDay}
              onChange={(e) => setFormData({ ...formData, dueDay: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors.dueDay ? 'border-rose-300 ring-rose-200' : 'border-slate-300 focus:ring-blue-500'
              }`}
            />
            {errors.dueDay && <p className="text-xs text-rose-500 mt-1">{errors.dueDay}</p>}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Notes / Purpose (Optional)
          </label>
          <textarea
            rows="2"
            placeholder="e.g. Purchased new laptop for college; zero interest converted by bank"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Live Calculation Preview Banner */}
        {Number(formData.principal) > 0 && Number(formData.emiAmount) > 0 && (
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-blue-900">Summary Projection</span>
              <p className="text-slate-600">
                Total Payment: <strong className="text-slate-900">{formatCurrency(previewSummary.totalPayment, currency)}</strong> (Interest: {formatCurrency(previewSummary.totalInterest, currency)})
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-white px-2 py-1 rounded-lg border border-blue-200">
              {formData.tenureMonths} Payments
            </span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? 'Save Changes' : 'Add Loan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
