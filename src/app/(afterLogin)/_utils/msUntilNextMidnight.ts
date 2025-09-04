export function msUntilNextMidnight(): number {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0); // 오늘 자정+24h = 내일 00:00
  return next.getTime() - now.getTime();
}
