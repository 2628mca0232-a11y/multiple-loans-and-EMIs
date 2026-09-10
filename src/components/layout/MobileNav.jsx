import React from 'react';
import {
  LayoutDashboard,
  CreditCard,
  PlusCircle,
  CalendarDays,
  Menu,
  X,
  Calculator,
  PieChart,
  BellRing,
  Settings,
  Lightbulb,
  Home,
} from 'lucide-react';
import { useLoans } from '../../context/LoanContext';

export const MobileNav = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const { unreadAlertsCount } = useLoans();

  const bottomItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'loans', label: 'Loans', icon: CreditCard },
    { id: 'add_action', label: 'Add', icon: PlusCircle, isAction: true },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'menu_toggle', label: 'More', icon: Menu, isToggle: true },
  ];

  return (
    <>
      {/* Bottom Navigation Bar (Mobile & Tablet) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                onClick={onOpenAddModal}
                className="flex flex-col items-center justify-center -mt-5 cursor-pointer focus:outline-none"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 active:scale-95 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold text-slate-600 mt-0.5">
                  {item.label}
                </span>
              </button>
            );
          }

          if (item.isToggle) {
            return (
              <button
                key={item.id}
                onClick={() => setIsDrawerOpen(true)}
                className="relative flex flex-col items-center justify-center py-1 px-3 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
                {unreadAlertsCount > 0 && (
                  <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                )}
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors cursor-pointer ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Slide-out Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-10 flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    E
                  </div>
                  <span className="font-extrabold text-lg text-slate-900">EMIease</span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                  { id: 'loans', label: 'My Loans', icon: CreditCard },
                  { id: 'calendar', label: 'EMI Calendar', icon: CalendarDays },
                  { id: 'calculator', label: 'EMI Calculator', icon: Calculator },
                  { id: 'analytics', label: 'Analytics', icon: PieChart },
                  { id: 'alerts', label: 'EMI Alerts', icon: BellRing, badge: unreadAlertsCount },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsDrawerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                        item.highlight
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500 font-medium">
                Built by Dev Mahur for EMIease
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
