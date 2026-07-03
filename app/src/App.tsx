import { useEffect, useMemo, useState } from "react";
import type { EntityId, Transaction } from "./types";
import { ENTITIES, entityConfig } from "./lib/entities";
import { loadRules, loadTransactions, saveRules, saveTransactions, exportAllData, importAllData } from "./lib/storage";
import { applyCategorization, defaultRulesFor } from "./lib/categorize";
import Dashboard from "./components/Dashboard";
import ImportView from "./components/ImportView";
import TransactionsTable from "./components/TransactionsTable";
import FeeFinder from "./components/FeeFinder";
import Subscriptions from "./components/Subscriptions";
import DebtPayoffCalculator from "./components/DebtPayoffCalculator";
import Reports from "./components/Reports";
import RulesEditor from "./components/RulesEditor";

type View =
  | "dashboard"
  | "import"
  | "transactions"
  | "fees"
  | "subscriptions"
  | "debt"
  | "reports"
  | "rules";

const VIEWS: { id: View; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "import", label: "Import" },
  { id: "transactions", label: "Transactions" },
  { id: "fees", label: "Fee Finder" },
  { id: "subscriptions", label: "Subscriptions" },
  { id: "debt", label: "Debt Payoff" },
  { id: "reports", label: "Reports" },
  { id: "rules", label: "Rules" },
];

function App() {
  const [entity, setEntity] = useState<EntityId>("personal");
  const [view, setView] = useState<View>("dashboard");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [rules, setRules] = useState(loadRules("personal"));

  useEffect(() => {
    const loadedRules = loadRules(entity).length ? loadRules(entity) : defaultRulesFor(entity);
    setRules(loadedRules);
    saveRules(entity, loadedRules);
    const txns = loadTransactions(entity);
    setTransactions(applyCategorization(txns, loadedRules));
  }, [entity]);

  const config = entityConfig(entity);

  function handleImport(newTxns: Transaction[]) {
    const merged = [...transactions, ...newTxns];
    setTransactions(merged);
    saveTransactions(entity, merged);
  }

  function handleRulesChange(next: typeof rules) {
    setRules(next);
    saveRules(entity, next);
    const recategorized = applyCategorization(transactions, next);
    setTransactions(recategorized);
    saveTransactions(entity, recategorized);
  }

  function handleUpdateCategory(id: string, category: string) {
    const next = transactions.map((t) => (t.id === id ? { ...t, category } : t));
    setTransactions(next);
    saveTransactions(entity, next);
  }

  function handleDelete(ids: string[]) {
    const next = transactions.filter((t) => !ids.includes(t.id));
    setTransactions(next);
    saveTransactions(entity, next);
  }

  function handleExport() {
    const blob = new Blob([exportAllData()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `krispierce-financial-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportBackup(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((text) => {
      importAllData(text);
      const txns = loadTransactions(entity);
      const r = loadRules(entity);
      setRules(r);
      setTransactions(applyCategorization(txns, r));
    });
  }

  const viewsForEntity = useMemo(
    () => (entity === "household" || entity === "personal" ? VIEWS : VIEWS.filter((v) => v.id !== "debt")),
    [entity]
  );

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 no-print">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            KrisPierce Financial Tracker
          </h1>
          <div className="flex gap-2">
            <label className="text-xs text-slate-500 self-center cursor-pointer underline">
              Restore backup
              <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
            </label>
            <button
              onClick={handleExport}
              className="text-xs border border-slate-300 dark:border-slate-700 rounded px-2 py-1"
            >
              Export backup (JSON)
            </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {ENTITIES.map((e) => (
            <button
              key={e.id}
              onClick={() => setEntity(e.id)}
              className={`px-3 py-2 text-sm border-b-2 whitespace-nowrap ${
                entity === e.id
                  ? "border-slate-900 dark:border-emerald-500 font-medium text-slate-900 dark:text-emerald-400"
                  : "border-transparent text-slate-500"
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-2 flex gap-1 flex-wrap no-print">
        {viewsForEntity.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`px-3 py-1.5 text-sm rounded-full ${
              view === v.id
                ? "bg-slate-900 dark:bg-emerald-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <main className="max-w-6xl mx-auto px-4 py-4">
        <div className="text-xs text-slate-500 mb-3 no-print">
          {config.bank} · {config.bookkeeping}
        </div>

        {view === "dashboard" && <Dashboard transactions={transactions} />}
        {view === "import" && (
          <ImportView entity={entity} rules={rules} onImport={handleImport} />
        )}
        {view === "transactions" && (
          <TransactionsTable
            transactions={transactions}
            entityConfig={config}
            onUpdateCategory={handleUpdateCategory}
            onDelete={handleDelete}
          />
        )}
        {view === "fees" && <FeeFinder transactions={transactions} />}
        {view === "subscriptions" && <Subscriptions transactions={transactions} />}
        {view === "debt" && <DebtPayoffCalculator />}
        {view === "reports" && <Reports transactions={transactions} entityConfig={config} />}
        {view === "rules" && (
          <RulesEditor entity={entity} entityConfig={config} rules={rules} onChange={handleRulesChange} />
        )}
      </main>
    </div>
  );
}

export default App;
