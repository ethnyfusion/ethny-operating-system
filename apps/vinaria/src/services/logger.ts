type SafeLogContext = {
  orderReference?: string;
  status?: string;
  provider?: string;
  event?: string;
};

export function logOperationalEvent(message: string, context: SafeLogContext = {}) {
  console.info(`[vinaria] ${message}`, context);
}
