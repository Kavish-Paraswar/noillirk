export const TIERS = {
  grounded: { name: 'Outer Edge', score: 20, emoji: '🧭', color: '#8fa3c4', blurb: 'A popularity extreme. Move toward the center.' },
  treetop: { name: 'Off-Center', score: 40, emoji: '🟠', color: '#ff9f43', blurb: 'Still outside the sweet spot.' },
  kite: { name: 'Balanced', score: 60, emoji: '⚖️', color: '#4de3ff', blurb: 'Closer to the middle.' },
  cloud: { name: 'Near Middle', score: 80, emoji: '☁️', color: '#79dd9a', blurb: 'Almost at the midpoint.' },
  skyhigh: { name: 'Bullseye', score: 100, emoji: '🎯', color: '#ffd166', blurb: 'The fifth answer. Perfectly in the middle.' },
  miss: { name: 'No Lift', score: 0, emoji: '⬛', color: '#7d93b8', blurb: 'No accepted answer this round.' },
};

export const BANDS = [
  { min: 0, max: 139, tier: 'grounded', name: 'Outer Edge', text: 'Every climb starts away from the midpoint.' },
  { min: 140, max: 279, tier: 'treetop', name: 'Off-Center', text: 'You are moving toward the middle.' },
  { min: 280, max: 419, tier: 'kite', name: 'Balanced', text: 'Your answers are finding the center.' },
  { min: 420, max: 559, tier: 'cloud', name: 'Near Middle', text: 'You are close to the sweet spot.' },
  { min: 560, max: 700, tier: 'skyhigh', name: 'Midillion', text: 'You read the room and found the middle.' },
];

export const ROUND_MS = 25_000;
export const PREVIEW_MS = 3_000;
export const ROUNDS = 7;
export const bandFor = score => [...BANDS].reverse().find(b => score >= b.min) || BANDS[0];
export const normalize = value => String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '');
export function etDate(now = Date.now()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(now));
}
export function resetAt(date) {
  return Date.parse(`${date}T00:00:00Z`) + 86_400_000;
}
export function distance(a, b, limit = Infinity) {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  let row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const next = [i];
    for (let j = 1; j <= b.length; j += 1) next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (Math.min(...next) > limit) return limit + 1;
    row = next;
  }
  return row[b.length];
}
export function matchAnswer(input, answers) {
  const key = normalize(input);
  if (!key || key.length > 256) return null;
  const entries = answers.flatMap(a => [a.answer, ...(a.aliases || [])].map(word => ({ word, a, key: normalize(word) })));
  const exact = entries.find(e => e.key === key);
  if (exact) return { ...exact.a, correction: false };
  const allowance = key.length < 5 ? 0 : key.length < 9 ? 1 : 2;
  const candidates = entries.map(e => ({ ...e, d: distance(key, e.key, allowance) })).filter(e => e.d <= allowance).sort((a, b) => a.d - b.d);
  if (candidates.length && (!candidates[1] || candidates[0].d < candidates[1].d || candidates[0].a.answer === candidates[1].a.answer)) return { ...candidates[0].a, correction: true };
  return null;
}
export function shareText(day, results) {
  const score = results.reduce((s, r) => s + r.score, 0);
  const emoji = { grounded: '🧭', treetop: '🟠', kite: '⚖️', cloud: '☁️', skyhigh: '🎯', miss: '⬛' };
  return `MIDILLION #${day}\n${score}/700 · +${(score * 10).toLocaleString('en-US')}m\n${results.map(r => emoji[r.tier] || '⬛').join('')}`;
}
