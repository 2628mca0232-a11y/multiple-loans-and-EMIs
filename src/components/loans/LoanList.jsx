import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  LayoutGrid,
  List as ListIcon,
  ArrowUpDown,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trash2,
  Edit3,
  Eye,
} from 'lucide-react';
import { LoanCard } from '../dashboard/LoanCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';
import { LOAN_CATEGORIES } from '../../data/demoData';
import { formatCurrency, formatPercent, getOrdinalSuffix, formatDate } from '../../utils/formatters';

export const LoanList = ({
  loans,
  onOpenAddModal,
  onViewDetails,
  onMarkPaid,
  onEdit,
  onDelete,
  currency = 'INR',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('dueDay'); // 'dueDay' | 'emiHigh' | 'outstandingHigh' | 'rateHigh'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Filter & Sort
  const filteredLoans = useMemo(() => {
    return loans
      .filter((loan) => {
        const matchesCat = selectedCategory === 'All' || loan.category === selectedCategory;
        const matchesQuery =
          loan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (loan.bankName && loan.bankName.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCat && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'emiHigh') return (b.emiAmount || 0) - (a.emiAmount || 0);
        if (sortBy === 'outstandingHigh') return (b.outstanding || 0) - (a.outstanding || 0);
        if (sortBy === 'rateHigh') return (b.interestRate || 0) - (a.interestRate || 0);
        return (a.dueDay || 1) - (b.dueDay || 1); // default dueDay
      });
  }, [loans, selectedCategory, searchQuery, sortBy]);

  const totalFilteredEMI = filteredLoans.reduce((acc, curr) => acc + (Number(curr.emiAmount) || 0), 0);
  const totalFilteredOutstanding = filteredLoans.reduce((acc, curr) => acc + (Number(curr.outstanding) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Add */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            My Loan Portfolio
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage, filter, and track all your active borrowings, EMIs, and repayment schedules
          </p>
        </div>

        <Button onClick={onOpenAddModal} icon={Plus} size="md" className="shadow-sm shadow-blue-500/20">
          Add New Loan
        </Button>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        <div className="px-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Active Loans</span>
          <span className="text-xl font-extrabold text-slate-900 mt-0.5 block">{filteredLoans.length} Accounts</span>
        </div>
        <div className="px-2 sm:border-l border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Filtered Monthly EMI</span>
          <span className="text-xl font-extrabold text-blue-600 mt-0.5 block">
            {formatCurrency(totalFilteredEMI, currency)}
          </span>
        </div>
        <div className="px-2 sm:border-l border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Outstanding Debt</span>
          <span className="text-xl font-extrabold text-slate-900 mt-0.5 block">
            {formatCurrency(totalFilteredOutstanding, currency)}
          </span>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search loans by name or bank..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        {/* Sort & View Switches */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="dueDay">Sort by: Due Date (Earliest)</option>
              <option value="emiHigh">Sort by: Highest Monthly EMI</option>
              <option value="outstandingHigh">Sort by: Highest Outstanding</option>
              <option value="rateHigh">Sort by: Highest Interest Rate</option>
            </select>
          </div>

          {/* View Switcher Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['All', ...LOAN_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loan List Body */}
      {filteredLoans.length === 0 ? (
        <EmptyState
          title="No matching loans found"
          description={
            searchQuery || selectedCategory !== 'All'
              ? 'Try adjusting your search filters or selected category.'
              : 'You have not added any loans yet. Click below to add your first loan!'
          }
          onAction={onOpenAddModal}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLoans.map((loan) => (
            <LoanCard
              key={loan.id}
              loan={loan}
              onViewDetails={onViewDetails}
              onMarkPaid={onMarkPaid}
              onEdit={onEdit}
              onDelete={onDelete}
              currency={currency}
            />
          ))}
        </div>
      ) : (
        /* Detailed Table View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-600 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Loan / Lender</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Monthly EMI</th>
                  <th className="py-3.5 px-4">Outstanding</th>
                  <th className="py-3.5 px-4">Interest</th>
                  <th className="py-3.5 px-4">Due Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: loan.color || '#3b82f6' }}
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{loan.name}</p>
                          <p className="text-slate-400 text-[11px]">{loan.bankName || 'General Bank'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{loan.category}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                      {formatCurrency(loan.emiAmount, currency)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {formatCurrency(loan.outstanding, currency)}
                      <span className="text-[10px] text-slate-400 block">
                        of {formatCurrency(loan.principal, currency)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-blue-600">
                      {formatPercent(loan.interestRate)}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {getOrdinalSuffix(loan.dueDay)} of month
                    </td>
                    <td className="py-3.5 px-4">
                      {loan.isCurrentMonthPaid ? (
                        <Badge variant="success" size="sm">
                          <CheckCircle2 className="w-3 h-3" /> Paid
                        </Badge>
                      ) : (
                        <Badge variant="indigo" size="sm">
                          <Clock className="w-3 h-3" /> Pending
                        </Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => onViewDetails(loan)}
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => onEdit(loan)}
                          title="Edit Loan"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => onDelete(loan.id)}
                          className="text-rose-500 hover:text-rose-700"
                          title="Delete Loan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
