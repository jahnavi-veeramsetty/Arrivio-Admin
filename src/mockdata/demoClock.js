export const DEMO_TODAY = new Date('2026-05-26T09:00:00Z');
export const DEMO_TODAY_ISO = '2026-05-26';

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_PER_HOUR = 1000 * 60 * 60;

export const daysFromToday = (dateStr) =>
  Math.round((new Date(dateStr) - DEMO_TODAY) / MS_PER_DAY);

export const daysSinceDate = (dateStr) =>
  Math.max(0, Math.round((DEMO_TODAY - new Date(dateStr)) / MS_PER_DAY));

export const hoursSinceTimestamp = (isoTimestamp) =>
  Math.max(0, Math.round((DEMO_TODAY - new Date(isoTimestamp)) / MS_PER_HOUR));
