import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_LOANS } from '../data/demoData';
import { calculateEMI } from '../utils/emiCalculations';
import { getNextDueDate, getDaysRemaining } from '../utils/formatters';
import { triggerPaymentCelebration } from '../utils/confetti';
import { useToast } from './ToastContext';

const LoanContext = createContext(null);

const STORAGE_KEY = 'emiease_loans_v1';
const SETTINGS_KEY = 'emiease_settings_v1';
const DISMISSED_ALERTS_KEY = 'emiease_dismissed_alerts_v1';

export const LoanProvider = ({ children }) => {
  const { showToast } = useToast();

  // Load Loans from localStorage or seed with default demo loans
  const [loans, setLoans] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading localStorage loans:', e);
    }
    return INITIAL_LOANS;
  });

  // Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      currency: 'INR',
      notificationsEnabled: true,
      emailAlerts: true,
      whatsappAlerts: false,
      theme: 'light',
    };
  });

  // Dismissed Alert IDs
  const [dismissedAlerts, setDismissedAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem(DISMISSED_ALERTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loans));
    } catch (e) {
      console.error('Failed saving loans to localStorage', e);
    }
  }, [loans]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed saving settings to localStorage', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(DISMISSED_ALERTS_KEY, JSON.stringify(dismissedAlerts));
    } catch (e) {
      console.error('Failed saving alerts to localStorage', e);
    }
  }, [dismissedAlerts]);

  // Color palette assignment helper
  const getNextColor = (index) => {
    const palette = ['#3b82f6', '#6366f1', '#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#14b8a6'];
    return palette[index % palette.length];
  };

  // Add Loan
  const addLoan = useCallback((loanData) => {
    const principal = Math.max(0, Number(loanData.principal) || 0);
    const outstanding = Math.max(0, Number(loanData.outstanding || principal) || 0);
    const interestRate = Math.max(0, Number(loanData.interestRate) || 0);
    const tenureMonths = Math.max(1, Number(loanData.tenureMonths) || 12);
    
    // Auto calculate EMI if not manually provided
    const calculatedEmi = calculateEMI(principal, interestRate, tenureMonths);
    const emiAmount = Math.max(0, Number(loanData.emiAmount) || calculatedEmi);
    
    const newLoan = {
      id: `loan-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: loanData.name || 'Untitled Loan',
      category: loanData.category || 'Personal Loan',
      bankName: loanData.bankName || 'General Lender',
      principal,
      outstanding,
      interestRate,
      emiAmount,
      tenureMonths,
      remainingMonths: Number(loanData.remainingMonths) || tenureMonths,
      dueDay: Math.min(31, Math.max(1, Number(loanData.dueDay) || 5)),
      startDate: loanData.startDate || new Date().toISOString().split('T')[0],
      notes: loanData.notes || '',
      color: loanData.color || getNextColor(loans.length),
      isCurrentMonthPaid: false,
      paymentHistory: [],
    };

    setLoans((prev) => [newLoan, ...prev]);
    showToast(`Loan "${newLoan.name}" added successfully!`, 'success');
    return newLoan;
  }, [loans.length, showToast]);

  // Update Loan
  const updateLoan = useCallback((id, updatedFields) => {
    setLoans((prev) =>
      prev.map((loan) => {
        if (loan.id === id) {
          const updated = { ...loan, ...updatedFields };
          // Ensure numerical sanity
          if (updated.principal) updated.principal = Math.max(0, Number(updated.principal));
          if (updated.outstanding) updated.outstanding = Math.max(0, Number(updated.outstanding));
          if (updated.emiAmount) updated.emiAmount = Math.max(0, Number(updated.emiAmount));
          if (updated.interestRate) updated.interestRate = Math.max(0, Number(updated.interestRate));
          if (updated.tenureMonths) updated.tenureMonths = Math.max(1, Number(updated.tenureMonths));
          if (updated.dueDay) updated.dueDay = Math.min(31, Math.max(1, Number(updated.dueDay)));
          return updated;
        }
        return loan;
      })
    );
    showToast('Loan updated successfully!', 'success');
  }, [showToast]);

  // Delete Loan
  const deleteLoan = useCallback((id) => {
    const target = loans.find((l) => l.id === id);
    setLoans((prev) => prev.filter((l) => l.id !== id));
    showToast(`Loan "${target?.name || 'Item'}" deleted.`, 'info');
  }, [loans, showToast]);

  // Mark EMI as Paid
  const markEmiPaid = useCallback((id, paymentDetails = {}) => {
    let loanName = '';
    let amountPaid = 0;

    setLoans((prev) =>
      prev.map((loan) => {
        if (loan.id === id) {
          loanName = loan.name;
          amountPaid = paymentDetails.amount || loan.emiAmount;
          
          // Estimate principal deduction for this payment
          const monthlyRate = (loan.interestRate || 0) / 12 / 100;
          const interestComponent = Math.round(loan.outstanding * monthlyRate);
          const principalComponent = Math.max(0, Math.min(loan.outstanding, amountPaid - interestComponent));
          
          const newOutstanding = Math.max(0, loan.outstanding - principalComponent);
          const newRemainingMonths = Math.max(0, (loan.remainingMonths || 1) - 1);

          const newHistoryRecord = {
            id: `pay-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            amount: amountPaid,
            principal: principalComponent,
            interest: interestComponent,
            status: 'Paid',
            paymentMethod: paymentDetails.method || 'Online Banking',
            notes: paymentDetails.notes || 'Monthly EMI Payment',
          };

          return {
            ...loan,
            outstanding: newOutstanding,
            remainingMonths: newRemainingMonths,
            isCurrentMonthPaid: true,
            lastPaidDate: new Date().toISOString().split('T')[0],
            paymentHistory: [newHistoryRecord, ...(loan.paymentHistory || [])],
          };
        }
        return loan;
      })
    );

    triggerPaymentCelebration();
    showToast(`🎉 Marked EMI of ₹${amountPaid.toLocaleString('en-IN')} as Paid for ${loanName}!`, 'success');
  }, [showToast]);

  // Make Prepayment
  const prepayLoan = useCallback((id, amount, notes = 'Lump sum prepayment') => {
    const prepayAmount = Number(amount) || 0;
    if (prepayAmount <= 0) return;

    let loanName = '';
    setLoans((prev) =>
      prev.map((loan) => {
        if (loan.id === id) {
          loanName = loan.name;
          const newOutstanding = Math.max(0, loan.outstanding - prepayAmount);
          
          const newHistoryRecord = {
            id: `prepay-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            amount: prepayAmount,
            principal: prepayAmount,
            interest: 0,
            status: 'Paid',
            paymentMethod: 'Prepayment / Lump-Sum',
            notes: notes,
          };

          return {
            ...loan,
            outstanding: newOutstanding,
            paymentHistory: [newHistoryRecord, ...(loan.paymentHistory || [])],
          };
        }
        return loan;
      })
    );

    triggerPaymentCelebration();
    showToast(`Lump-sum payment of ₹${prepayAmount.toLocaleString('en-IN')} applied to ${loanName}!`, 'success');
  }, [showToast]);

  // Reset to Demo Data
  const resetDemoData = useCallback(() => {
    setLoans(INITIAL_LOANS);
    setDismissedAlerts([]);
    showToast('Reset back to default realistic demo loans!', 'info');
  }, [showToast]);

  // Clear All Data
  const clearAllData = useCallback(() => {
    setLoans([]);
    setDismissedAlerts([]);
    showToast('All loan data cleared.', 'warning');
  }, [showToast]);

  // Export Data JSON
  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(loans, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `emiease_loans_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Loans data exported successfully!', 'success');
  }, [loans, showToast]);

  // Import Data JSON
  const importData = useCallback((jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (Array.isArray(parsed)) {
        setLoans(parsed);
        showToast(`Successfully imported ${parsed.length} loans!`, 'success');
        return true;
      }
    } catch {
      showToast('Failed to import JSON data. Invalid format.', 'error');
    }
    return false;
  }, [showToast]);

  // Dismiss alert
  const dismissAlert = useCallback((alertId) => {
    setDismissedAlerts((prev) => [...prev, alertId]);
  }, []);

  // Update Settings
  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Settings saved successfully.', 'success');
  }, [showToast]);

  // Computed Aggregations
  const stats = useMemo(() => {
    const activeLoans = loans.filter((l) => (l.outstanding || 0) > 0);
    const totalActiveLoans = activeLoans.length;
    const totalMonthlyEMI = activeLoans.reduce((acc, curr) => acc + (Number(curr.emiAmount) || 0), 0);
    const totalOutstanding = loans.reduce((acc, curr) => acc + (Number(curr.outstanding) || 0), 0);
    const totalPrincipal = loans.reduce((acc, curr) => acc + (Number(curr.principal) || 0), 0);
    const totalRepaid = Math.max(0, totalPrincipal - totalOutstanding);
    const overallRepaidPercentage = totalPrincipal > 0 ? (totalRepaid / totalPrincipal) * 100 : 0;

    // Determine upcoming EMIs with calculated due date & days left
    const upcomingList = activeLoans.map((loan) => {
      const nextDue = getNextDueDate(loan.dueDay);
      const daysLeft = getDaysRemaining(nextDue);
      
      let status = 'upcoming';
      if (loan.isCurrentMonthPaid) {
        status = 'paid';
      } else if (daysLeft < 0) {
        status = 'overdue';
      } else if (daysLeft <= 3) {
        status = 'due_soon';
      }

      return {
        ...loan,
        nextDueDate: nextDue.toISOString().split('T')[0],
        nextDueDateObj: nextDue,
        daysLeft,
        status,
      };
    });

    // Sort by unpaid first, then closest due date
    const sortedUpcoming = [...upcomingList].sort((a, b) => {
      if (a.isCurrentMonthPaid && !b.isCurrentMonthPaid) return 1;
      if (!a.isCurrentMonthPaid && b.isCurrentMonthPaid) return -1;
      return a.daysLeft - b.daysLeft;
    });

    const nextUnpaid = sortedUpcoming.find((item) => !item.isCurrentMonthPaid) || sortedUpcoming[0] || null;

    // Highest EMI Loan
    const highestEmiLoan = [...activeLoans].sort((a, b) => b.emiAmount - a.emiAmount)[0] || null;
    // Highest Outstanding Loan
    const highestOutstandingLoan = [...activeLoans].sort((a, b) => b.outstanding - a.outstanding)[0] || null;

    return {
      totalActiveLoans,
      totalMonthlyEMI,
      totalOutstanding,
      totalPrincipal,
      totalRepaid,
      overallRepaidPercentage,
      upcomingEmis: sortedUpcoming,
      nextEmiDue: nextUnpaid,
      highestEmiLoan,
      highestOutstandingLoan,
    };
  }, [loans]);

  // Dynamically generated Alerts
  const alerts = useMemo(() => {
    const generated = [];

    stats.upcomingEmis.forEach((item) => {
      if (item.status === 'overdue') {
        generated.push({
          id: `alert-overdue-${item.id}`,
          loanId: item.id,
          title: `Overdue EMI: ${item.name}`,
          message: `Your EMI of ₹${item.emiAmount.toLocaleString('en-IN')} for ${item.name} (${item.bankName}) is overdue by ${Math.abs(item.daysLeft)} days.`,
          type: 'overdue',
          date: item.nextDueDate,
          emiAmount: item.emiAmount,
          bankName: item.bankName,
        });
      } else if (item.daysLeft === 0 && !item.isCurrentMonthPaid) {
        generated.push({
          id: `alert-today-${item.id}`,
          loanId: item.id,
          title: `Due Today: ${item.name}`,
          message: `Your EMI of ₹${item.emiAmount.toLocaleString('en-IN')} is due today for ${item.name}.`,
          type: 'due_today',
          date: item.nextDueDate,
          emiAmount: item.emiAmount,
          bankName: item.bankName,
        });
      } else if (item.daysLeft <= 3 && item.daysLeft > 0 && !item.isCurrentMonthPaid) {
        generated.push({
          id: `alert-soon-${item.id}`,
          loanId: item.id,
          title: `Upcoming EMI: ${item.name}`,
          message: `${item.name} EMI of ₹${item.emiAmount.toLocaleString('en-IN')} is due in ${item.daysLeft} days.`,
          type: 'due_soon',
          date: item.nextDueDate,
          emiAmount: item.emiAmount,
          bankName: item.bankName,
        });
      } else if (item.isCurrentMonthPaid) {
        generated.push({
          id: `alert-paid-${item.id}`,
          loanId: item.id,
          title: `EMI Paid: ${item.name}`,
          message: `${item.name} EMI of ₹${item.emiAmount.toLocaleString('en-IN')} has been paid successfully for this cycle.`,
          type: 'paid',
          date: item.lastPaidDate || item.nextDueDate,
          emiAmount: item.emiAmount,
          bankName: item.bankName,
        });
      }
    });

    return generated.filter((a) => !dismissedAlerts.includes(a.id));
  }, [stats.upcomingEmis, dismissedAlerts]);

  return (
    <LoanContext.Provider
      value={{
        loans,
        stats,
        alerts,
        unreadAlertsCount: alerts.filter((a) => a.type !== 'paid').length,
        settings,
        addLoan,
        updateLoan,
        deleteLoan,
        markEmiPaid,
        prepayLoan,
        resetDemoData,
        clearAllData,
        exportData,
        importData,
        dismissAlert,
        updateSettings,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export const useLoans = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useLoans must be used within a LoanProvider');
  }
  return context;
};
