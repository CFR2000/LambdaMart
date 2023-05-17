const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

type FormatUnit = keyof typeof units;

export const timeFrom = (
  time: { [key in FormatUnit]?: number },
  date = new Date()
) =>
  new Date(
    date.getTime() +
      Object.entries(time)
        .map(([unit, val]) => units[unit as FormatUnit] * val)
        .reduce((a, b) => a + b)
  );

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const tf = new Intl.DateTimeFormat("en");

export const getRelativeTime = (d1: Date, d2: Date = new Date()) => {
  const elapsed = d1.getTime() - d2.getTime();

  // "Math.abs" accounts for both "past" & "future" scenarios
  return Object.entries(units)
    .filter(([unit, val]) => Math.abs(elapsed) > val || unit == "second")
    .map(([unit, val]) =>
      rtf.format(Math.round(elapsed / val), unit as FormatUnit)
    )[0];
};

export const getTime = (d1: Date, d2: Date = new Date()) => {
  const elapsed = d1.getTime() - d2.getTime();
  const getString = (val: number, unit: string) =>
    `${val} ${unit + (val === 1 ? "" : "s")}`;

  // "Math.abs" accounts for both "past" & "future" scenarios
  return Object.entries(units)
    .filter(([unit, val]) => Math.abs(elapsed) > val || unit == "second")
    .map(([unit, val]) => getString(Math.round(elapsed / val), unit))[0];
};
