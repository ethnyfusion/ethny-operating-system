export function getServerEnv() {
  return {
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    adminAccessToken: process.env.VINARIA_ADMIN_ACCESS_TOKEN,
    notificationEmail:
      process.env.VINARIA_ORDER_NOTIFICATION_EMAIL ?? "orders@ethny.be",
    dataRetentionDays: Number(process.env.VINARIA_DATA_RETENTION_DAYS ?? 365),
  };
}
