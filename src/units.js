// Each unit: sq ft value of ONE unit
export const UNITS = [
  { key: 'sqft',   label: 'Sq Feet',      short: 'sq ft',  sqft: 1 },
  { key: 'sqyd',   label: 'Sq Yards',     short: 'sq yd',  sqft: 9 },
  { key: 'sqm',    label: 'Sq Meters',    short: 'sq m',   sqft: 10.7639104 },
  { key: 'cent',   label: 'Cents',        short: 'cent',   sqft: 435.6 },
  { key: 'ground', label: 'Ground',       short: 'ground', sqft: 2400 },
  { key: 'guntha', label: 'Guntha',       short: 'guntha', sqft: 1089 },
  { key: 'kuli',   label: 'Kuli (Kuzhi)', short: 'kuli',   sqft: 144 },
  { key: 'ma',     label: 'Ma',           short: 'ma',     sqft: 14400 },
  { key: 'are',    label: 'Are',          short: 'are',    sqft: 1076.39104 },
  { key: 'acre',   label: 'Acres',        short: 'acre',   sqft: 43560 },
  { key: 'hectare',label: 'Hectares',     short: 'ha',     sqft: 107639.104 },
];

export const convert = (value, fromKey) => {
  const from = UNITS.find((u) => u.key === fromKey);
  const inSqft = value * from.sqft;
  return UNITS.map((u) => ({ ...u, result: inSqft / u.sqft }));
};

export const fmt = (n) => {
  if (!isFinite(n)) return '0';
  const s = parseFloat(n.toFixed(4)).toString();
  const [i, d] = s.split('.');
  const withCommas = i.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return d ? `${withCommas}.${d}` : withCommas;
};
