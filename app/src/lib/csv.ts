import Papa from "papaparse";

export interface ParsedRow {
  date: string; // ISO yyyy-mm-dd
  description: string;
  amount: number;
  balance?: number;
}

const DATE_RE_SLASH = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/;
const DATE_RE_DASH = /^(\d{1,2})-(\d{1,2})-(\d{2,4})$/;
const DATE_RE_ISO = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

function parseDate(raw: string): string | null {
  const s = raw.trim();
  let m = s.match(DATE_RE_ISO);
  if (m) {
    const [, y, mo, d] = m;
    return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  m = s.match(DATE_RE_SLASH) ?? s.match(DATE_RE_DASH);
  if (m) {
    // Australian bank exports are DD/MM/YYYY
    let [, d, mo, y] = m;
    if (y.length === 2) y = `20${y}`;
    return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return null;
}

function parseAmount(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, "").replace(/^\((.*)\)$/, "-$1");
  if (cleaned === "" || cleaned === "-") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/**
 * Parses CommBank / ANZ style transaction CSV exports. Both banks export
 * Date, Amount, Description, Balance with no reliable header row, so we
 * detect columns by content rather than by header name.
 */
export function parseBankCsv(text: string): { rows: ParsedRow[]; errors: string[] } {
  const result = Papa.parse<string[]>(text.trim(), { skipEmptyLines: true });
  const errors: string[] = [];
  const rawRows = result.data as string[][];
  if (!rawRows.length) return { rows: [], errors: ["File appears to be empty."] };

  let startIdx = 0;
  const firstRow = rawRows[0];
  const firstCellIsDate = firstRow.some((c) => parseDate(c));
  if (!firstCellIsDate) startIdx = 1; // treat first row as header

  const rows: ParsedRow[] = [];
  for (let i = startIdx; i < rawRows.length; i++) {
    const cells = rawRows[i].map((c) => c?.trim() ?? "");
    if (cells.every((c) => c === "")) continue;

    let date: string | null = null;
    const numericIdx: number[] = [];
    let descIdx = -1;
    let bestDescLen = -1;

    cells.forEach((cell, idx) => {
      if (!date) {
        const d = parseDate(cell);
        if (d) {
          date = d;
          return;
        }
      }
      const n = parseAmount(cell);
      if (n !== null && cell !== "") {
        numericIdx.push(idx);
      } else if (cell.length > bestDescLen) {
        bestDescLen = cell.length;
        descIdx = idx;
      }
    });

    if (!date) {
      errors.push(`Row ${i + 1}: could not find a date column.`);
      continue;
    }
    if (numericIdx.length === 0) {
      errors.push(`Row ${i + 1}: could not find an amount column.`);
      continue;
    }

    const amount = parseAmount(cells[numericIdx[0]]);
    const balance = numericIdx.length > 1 ? parseAmount(cells[numericIdx[1]]) : undefined;
    if (amount === null) continue;

    rows.push({
      date,
      description: cells[descIdx] || "(no description)",
      amount,
      balance: balance ?? undefined,
    });
  }

  return { rows, errors };
}
