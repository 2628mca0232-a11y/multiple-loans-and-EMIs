import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { LoanProvider, useLoans } from './context/LoanContext';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';

// Views
import { DashboardView } from './components/dashboard/DashboardView';
import { LoanList } from './components/loans/LoanList';
import { PaymentCalendarView } from './components/calendar/PaymentCalendarView';
import { EmiCalculatorView } from './components/calculator/EmiCalculatorView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { AlertsCenterView } from './components/alerts/AlertsCenterView';
import { SettingsView } from './components/settings/SettingsView';

// Modals
import { LoanFormModal } from './components/loans/LoanFormModal';
import { LoanDetailModal } from './components/loans/LoanDetailModal';
import { PrepayModal } from './components/loans/PrepayModal';
import { ConfirmDialog } from './components/common/ConfirmDialog';

const AppContent = () => {
  const {
    loans,
    stats,
    alerts,
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
  } = useLoans();

  // Navigation State: 'landing' | 'dashboard' | 'loans' | 'calendar' | 'calculator' | 'analytics' | 'alerts' | 'academic' | 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);
  const [viewingLoan, setViewingLoan] = useState(null);
  const [prepayingLoan, setPrepayingLoan] = useState(null);
  const [deletingLoanId, setDeletingLoanId] = useState(null);

  // Handlers
  const handleOpenAddModal = (presetData = null) => {
    setEditingLoan(presetData && presetData.id ? presetData : null);
    setIsAddModalOpen(true);
  };

  const handleEditLoan = (loan) => {
    setEditingLoan(loan);
    setIsAddModalOpen(true);
  };

  const handleSaveLoan = (loanData) => {
    if (editingLoan && editingLoan.id) {
      updateLoan(editingLoan.id, loanData);
    } else {
      addLoan(loanData);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingLoanId) {
      deleteLoan(deletingLoanId);
      if (viewingLoan?.id === deletingLoanId) {
        setViewingLoan(null);
      }
      setDeletingLoanId(null);
    }
  };

  const handleCalculatorExport = (calculatedLoan) => {
    handleOpenAddModal(calculatedLoan);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => handleOpenAddModal()}
        onToggleMobileMenu={() => setIsDrawerOpen(true)}
      />

      {/* Main Body with Responsive Sidebar */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenAddModal={() => handleOpenAddModal()}
          />
        </div>

        {/* Dynamic Page View Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12">
          {activeTab === 'dashboard' && (
            <DashboardView
              loans={loans}
              stats={stats}
              onOpenAddModal={() => handleOpenAddModal()}
              onViewLoan={(loan) => setViewingLoan(loan)}
              onMarkPaid={(id) => markEmiPaid(id)}
              onEditLoan={handleEditLoan}
              onDeleteLoan={(id) => setDeletingLoanId(id)}
              onNavigateTab={(tab) => setActiveTab(tab)}
              currency={settings.currency}
            />
          )}

          {activeTab === 'loans' && (
            <LoanList
              loans={loans}
              onOpenAddModal={() => handleOpenAddModal()}
              onViewDetails={(loan) => setViewingLoan(loan)}
              onMarkPaid={(id) => markEmiPaid(id)}
              onEdit={handleEditLoan}
              onDelete={(id) => setDeletingLoanId(id)}
              currency={settings.currency}
            />
          )}

          {activeTab === 'calendar' && (
            <PaymentCalendarView
              loans={loans}
              onMarkPaid={(id) => markEmiPaid(id)}
              onViewLoan={(loan) => setViewingLoan(loan)}
              currency={settings.currency}
            />
          )}

          {activeTab === 'calculator' && (
            <EmiCalculatorView
              onExportToNewLoan={handleCalculatorExport}
              currency={settings.currency}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              loans={loans}
              stats={stats}
              currency={settings.currency}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsCenterView
              alerts={alerts}
              loans={loans}
              onDismissAlert={dismissAlert}
              onMarkPaid={(id) => markEmiPaid(id)}
              onViewLoan={(loan) => setViewingLoan(loan)}
              currency={settings.currency}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              settings={settings}
              onUpdateSettings={updateSettings}
              onResetDemoData={resetDemoData}
              onClearAllData={clearAllData}
              onExportData={exportData}
              onImportData={importData}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Mobile Navigation & Slide Drawer */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => handleOpenAddModal()}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      {/* Modals Layer */}
      <LoanFormModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingLoan(null);
        }}
        onSubmit={handleSaveLoan}
        initialData={editingLoan}
        currency={settings.currency}
      />

      <LoanDetailModal
        isOpen={!!viewingLoan}
        onClose={() => setViewingLoan(null)}
        loan={viewingLoan}
        onMarkPaid={(id) => markEmiPaid(id)}
        onOpenPrepay={(loan) => {
          setViewingLoan(null);
          setPrepayingLoan(loan);
        }}
        onEdit={(loan) => {
          setViewingLoan(null);
          handleEditLoan(loan);
        }}
        onDelete={(id) => {
          setViewingLoan(null);
          setDeletingLoanId(id);
        }}
        currency={settings.currency}
      />

      <PrepayModal
        isOpen={!!prepayingLoan}
        onClose={() => setPrepayingLoan(null)}
        loan={prepayingLoan}
        onPrepay={prepayLoan}
        currency={settings.currency}
      />

      <ConfirmDialog
        isOpen={!!deletingLoanId}
        onClose={() => setDeletingLoanId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Loan Account?"
        message="Are you sure you want to remove this loan from your dashboard? This will also remove its associated payment records."
        confirmText="Delete Loan"
        variant="danger"
      />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <LoanProvider>
        <AppContent />
      </LoanProvider>
    </ToastProvider>
  );
}
