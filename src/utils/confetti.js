import confetti from 'canvas-confetti';

export const triggerPaymentCelebration = () => {
  try {
    // Left burst
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#10b981', '#3b82f6', '#6366f1', '#f59e0b']
    });
    // Right burst
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#10b981', '#3b82f6', '#6366f1', '#f59e0b']
    });
  } catch {
    // Graceful fallback if canvas is unsupported
  }
};
