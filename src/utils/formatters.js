// Format currency in Indian Rupees (INR) or selected currency
export const formatCurrency = (amount, currency = 'INR') => {
  const numericAmount = Number(amount) || 0;
  
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(numericAmount);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

// Compact currency formatting (e.g. ₹1.25L, ₹6.42L, ₹28.5K)
export const formatCompactCurrency = (amount, currency = 'INR') => {
  const num = Number(amount) || 0;
  const symbol = currency === 'INR' ? '₹' : '$';
  
  if (currency === 'INR') {
    if (num >= 10000000) {
      return `${symbol}${(num / 10000000).toFixed(2)} Cr`;
    }
    if (num >= 100000) {
      return `${symbol}${(num / 100000).toFixed(2)} L`;
    }
    if (num >= 1000) {
      return `${symbol}${(num / 1000).toFixed(1)}k`;
    }
    return `${symbol}${num}`;
  }
  
  if (num >= 1000000) {
    return `${symbol}${(num / 1000000).toFixed(2)}M`;
  }
  if (num >= 1000) {
    return `${symbol}${(num / 1000).toFixed(1)}k`;
  }
  return `${symbol}${num}`;
};

// Format percentages
export const formatPercent = (rate) => {
  return `${Number(rate || 0).toFixed(1)}%`;
};

// Format standard date string (e.g., "15 Sep 2026")
export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Get ordinal suffix for dates (e.g. 15th, 1st, 2nd, 3rd)
export const getOrdinalSuffix = (day) => {
  const d = parseInt(day, 10);
  if (isNaN(d)) return day;
  if (d > 3 && d < 21) return `${d}th`;
  switch (d % 10) {
    case 1:  return `${d}st`;
    case 2:  return `${d}nd`;
    case 3:  return `${d}rd`;
    default: return `${d}th`;
  }
};

// Calculate next upcoming date for a day-of-month due date
export const getNextDueDate = (dueDay, referenceDate = new Date()) => {
  const today = new Date(referenceDate);
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();
  
  const day = parseInt(dueDay, 10) || 1;
  
  // If due day is later this month or today
  if (day >= currentDay) {
    return new Date(currentYear, currentMonth, day);
  } else {
    // Due date next month
    return new Date(currentYear, currentMonth + 1, day);
  }
};

// Calculate days remaining until next due date
export const getDaysRemaining = (dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
