/**
 * Calculate Monthly EMI using standard formula:
 * E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * where:
 * P = Principal loan amount
 * r = Monthly interest rate (annual rate / 12 / 100)
 * n = Loan tenure in months
 */
export const calculateEMI = (principal, annualRate, tenureMonths) => {
  const P = Number(principal) || 0;
  const annual = Number(annualRate) || 0;
  const n = Number(tenureMonths) || 0;

  if (P <= 0 || n <= 0) return 0;
  if (annual <= 0) return Math.round(P / n);

  const r = annual / 12 / 100;
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
};

/**
 * Calculate full loan metrics
 */
export const calculateLoanSummary = (principal, annualRate, tenureMonths, customEMI = null) => {
  const P = Number(principal) || 0;
  const annual = Number(annualRate) || 0;
  const n = Number(tenureMonths) || 0;

  const emi = customEMI ? Number(customEMI) : calculateEMI(P, annual, n);
  const totalPayment = emi * n;
  const totalInterest = Math.max(0, totalPayment - P);

  return {
    monthlyEMI: emi,
    totalPayment,
    totalInterest,
    principalAmount: P,
    interestRatio: totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0,
    principalRatio: totalPayment > 0 ? (P / totalPayment) * 100 : 0,
  };
};

/**
 * Generate month-by-month amortization schedule
 */
export const generateAmortizationSchedule = (principal, annualRate, tenureMonths, startDate = new Date()) => {
  const P = Number(principal) || 0;
  const annual = Number(annualRate) || 0;
  const n = Number(tenureMonths) || 0;
  const r = annual / 12 / 100;
  const emi = calculateEMI(P, annual, n);

  let remainingBalance = P;
  let totalPaidInterest = 0;
  let totalPaidPrincipal = 0;
  const schedule = [];

  const start = new Date(startDate);

  for (let month = 1; month <= n; month++) {
    if (remainingBalance <= 0) break;

    const interestForMonth = Math.round(remainingBalance * r);
    let principalForMonth = emi - interestForMonth;

    if (month === n || principalForMonth > remainingBalance) {
      principalForMonth = remainingBalance;
    }

    const currentEMI = principalForMonth + interestForMonth;
    remainingBalance = Math.max(0, remainingBalance - principalForMonth);
    totalPaidInterest += interestForMonth;
    totalPaidPrincipal += principalForMonth;

    const paymentDate = new Date(start.getFullYear(), start.getMonth() + month, start.getDate());

    schedule.push({
      monthNumber: month,
      date: paymentDate.toISOString().split('T')[0],
      displayDate: paymentDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      emiAmount: currentEMI,
      principal: principalForMonth,
      interest: interestForMonth,
      remainingBalance,
      totalInterestPaid: totalPaidInterest,
      totalPrincipalPaid: totalPaidPrincipal,
    });
  }

  return schedule;
};

/**
 * Calculate Prepayment Savings Impact
 */
export const calculatePrepaymentSavings = (outstanding, annualRate, remainingMonths, prepaymentAmount, regularEMI) => {
  const P = Number(outstanding) || 0;
  const annual = Number(annualRate) || 0;
  const n = Number(remainingMonths) || 0;
  const prepay = Number(prepaymentAmount) || 0;
  const emi = Number(regularEMI) || calculateEMI(P, annual, n);
  const r = annual / 12 / 100;

  if (P <= 0 || prepay <= 0) {
    return {
      newTenure: n,
      monthsSaved: 0,
      interestSaved: 0,
    };
  }

  const newPrincipal = Math.max(0, P - prepay);
  if (newPrincipal === 0) {
    const originalInterest = (emi * n) - P;
    return {
      newTenure: 0,
      monthsSaved: n,
      interestSaved: Math.max(0, originalInterest),
    };
  }

  // Calculate new tenure with same EMI
  // n = -log(1 - (P*r/EMI)) / log(1 + r)
  let newTenure = n;
  if (emi > newPrincipal * r) {
    newTenure = Math.ceil(-Math.log(1 - (newPrincipal * r) / emi) / Math.log(1 + r));
  }

  const originalTotalInterest = Math.max(0, (emi * n) - P);
  const newTotalInterest = Math.max(0, (emi * newTenure) - newPrincipal);
  const interestSaved = Math.max(0, originalTotalInterest - newTotalInterest);
  const monthsSaved = Math.max(0, n - newTenure);

  return {
    newTenure,
    monthsSaved,
    interestSaved: Math.round(interestSaved),
  };
};
