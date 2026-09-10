import React, { useState, useRef } from 'react';
import {
  Settings as SettingsIcon,
  RotateCcw,
  Trash2,
  Download,
  Upload,
  Globe,
  Bell,
  ShieldCheck,
  Smartphone,
  Mail,
  Sparkles,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const SettingsView = ({
  settings,
  onUpdateSettings,
  onResetDemoData,
  onClearAllData,
  onExportData,
  onImportData,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        if (content) {
          onImportData(content);
        }
      } catch (err) {
        console.error('File read error', err);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
          Application Settings & Data Control
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage currency standards, prototype simulation alerts, and demo data presets
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Regional & Preferences */}
        <Card padding="p-5 sm:p-6" className="bg-white border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">Regional & Currency Standards</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Display Currency
              </label>
              <select
                value={settings.currency || 'INR'}
                onChange={(e) => onUpdateSettings({ currency: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="INR">Indian Rupee (INR ₹) – Lakhs/Crores Standard</option>
                <option value="USD">US Dollar (USD $)</option>
                <option value="EUR">Euro (EUR €)</option>
                <option value="GBP">British Pound (GBP £)</option>
              </select>
              <p className="text-xs text-slate-400 mt-1">
                Default Indian Lakhs/Crores numbering format for financial precision.
              </p>
            </div>
          </div>
        </Card>

        {/* 2. Notification Simulation Preferences */}
        <Card padding="p-5 sm:p-6" className="bg-white border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">Alert & Reminder Channels</h3>
          </div>

          <div className="space-y-3 text-xs">
            {/* Toggle 1: Push / In-App */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="font-bold text-slate-800 block">Proactive In-App Badges</span>
                  <span className="text-slate-400">Display due date warnings 3 days prior</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.notificationsEnabled !== false}
                onChange={(e) => onUpdateSettings({ notificationsEnabled: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            {/* Toggle 2: Email Simulation */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-600" />
                <div>
                  <span className="font-bold text-slate-800 block">Email Digest Simulation</span>
                  <span className="text-slate-400">Monthly loan statement breakdown</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailAlerts !== false}
                onChange={(e) => onUpdateSettings({ emailAlerts: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            {/* Toggle 3: WhatsApp Simulation */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="font-bold text-slate-800 block">WhatsApp Due Reminder (Concept)</span>
                  <span className="text-slate-400">Automated WhatsApp alert on EMI due morning</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.whatsappAlerts === true}
                onChange={(e) => onUpdateSettings({ whatsappAlerts: e.target.checked })}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Demo Data & Persistence Controls */}
      <Card padding="p-5 sm:p-6" className="bg-white border-slate-200/90 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Presentation & Data Persistence Controls
              </h3>
              <p className="text-xs text-slate-500">
                Essential tools for presentation evaluations and testing custom scenarios
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Reset Demo Loans */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Reset Demo Data</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Restores the 4 realistic Indian loans (Personal, Education, Car, Credit Card)
              </p>
            </div>
            <Button
              variant="outline"
              size="xs"
              icon={RotateCcw}
              onClick={() => setShowResetConfirm(true)}
              className="w-full justify-center"
            >
              Reset to Demo
            </Button>
          </div>

          {/* Export JSON */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Export Portfolio</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Download your current loan list and payment history as a JSON backup
              </p>
            </div>
            <Button
              variant="secondary"
              size="xs"
              icon={Download}
              onClick={onExportData}
              className="w-full justify-center"
            >
              Export JSON
            </Button>
          </div>

          {/* Import JSON */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Import Backup</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Load loans from a previously exported JSON backup file
              </p>
            </div>
            <Button
              variant="secondary"
              size="xs"
              icon={Upload}
              onClick={() => fileInputRef.current?.click()}
              className="w-full justify-center"
            >
              Import JSON
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
          </div>

          {/* Clear All */}
          <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/30 flex flex-col justify-between space-y-3">
            <div>
              <span className="font-bold text-xs text-rose-900 block">Clear All Loans</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Wipe all records to test clean zero-state and onboarding flows
              </p>
            </div>
            <Button
              variant="danger"
              size="xs"
              icon={Trash2}
              onClick={() => setShowClearConfirm(true)}
              className="w-full justify-center"
            >
              Clear All Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={onResetDemoData}
        title="Reset to Demo Data?"
        message="This will replace any custom loans with the default 4 realistic demo accounts (Personal Loan, Education Loan, Car Loan, Credit Card EMI)."
        confirmText="Reset Now"
        variant="primary"
      />

      <ConfirmDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={onClearAllData}
        title="Clear All Loan Data?"
        message="Are you sure you want to remove all loans from local storage? This will allow you to test the empty onboarding flow."
        confirmText="Clear All"
        variant="danger"
      />
    </div>
  );
};
