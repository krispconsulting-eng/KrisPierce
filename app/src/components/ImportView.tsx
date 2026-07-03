import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import type { CategoryRule, EntityId, Transaction } from "../types";
import { parseBankCsv } from "../lib/csv";
import { applyCategorization } from "../lib/categorize";
import { formatCurrency, formatDate } from "../lib/format";

interface Props {
  entity: EntityId;
  rules: CategoryRule[];
  onImport: (txns: Transaction[]) => void;
}

export default function ImportView({ entity, rules, onImport }: Props) {
  const [preview, setPreview] = useState<Transaction[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleText(text: string, name: string) {
    const { rows, errors } = parseBankCsv(text);
    const txns: Transaction[] = rows.map((r) => ({
      id: uuid(),
      entity,
      date: r.date,
      description: r.description,
      amount: r.amount,
      balance: r.balance,
      category: "Other",
      isFee: false,
      source: name,
    }));
    setPreview(applyCategorization(txns, rules));
    setErrors(errors);
    setFileName(name);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((text) => handleText(text, file.name));
  }

  function confirmImport() {
    onImport(preview);
    setPreview([]);
    setErrors([]);
    setFileName("");
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Import bank CSV export
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Export a transaction CSV from your bank (CommBank or ANZ) and upload it here.
          Nothing leaves this browser — data is stored only in this device's local storage.
        </p>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          onChange={onFileChange}
          className="text-sm"
        />
        <details>
          <summary className="text-sm text-slate-500 cursor-pointer">
            Or paste CSV text instead
          </summary>
          <textarea
            className="w-full mt-2 border border-slate-300 dark:border-slate-700 rounded p-2 text-xs font-mono bg-white dark:bg-slate-950"
            rows={6}
            placeholder="01/07/2026,-45.00,WOOLWORTHS 1234,5231.10"
            onChange={(e) => handleText(e.target.value, "pasted")}
          />
        </details>
      </div>

      {errors.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300">
          <div className="font-semibold mb-1">{errors.length} row(s) skipped:</div>
          <ul className="list-disc list-inside">
            {errors.slice(0, 5).map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {preview.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">
              Preview: {preview.length} transaction(s) from {fileName}
            </h3>
            <button
              onClick={confirmImport}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded"
            >
              Confirm import
            </button>
          </div>
          <div className="max-h-80 overflow-auto text-sm">
            <table className="w-full text-left">
              <thead className="text-xs text-slate-500 uppercase sticky top-0 bg-white dark:bg-slate-900">
                <tr>
                  <th className="py-1 pr-2">Date</th>
                  <th className="py-1 pr-2">Description</th>
                  <th className="py-1 pr-2">Category</th>
                  <th className="py-1 pr-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {preview.slice(0, 200).map((t) => (
                  <tr key={t.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="py-1 pr-2 whitespace-nowrap">{formatDate(t.date)}</td>
                    <td className="py-1 pr-2">{t.description}</td>
                    <td className="py-1 pr-2 text-slate-500">{t.category}</td>
                    <td
                      className={`py-1 pr-2 text-right ${
                        t.amount < 0 ? "text-red-600" : "text-emerald-600"
                      }`}
                    >
                      {formatCurrency(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
