import { useState } from "react";
import { v4 as uuid } from "uuid";
import type { CategoryRule, EntityConfig, EntityId } from "../types";

interface Props {
  entity: EntityId;
  entityConfig: EntityConfig;
  rules: CategoryRule[];
  onChange: (rules: CategoryRule[]) => void;
}

export default function RulesEditor({ entity, entityConfig, rules, onChange }: Props) {
  const [match, setMatch] = useState("");
  const [category, setCategory] = useState(entityConfig.categories[0]);

  function addRule() {
    if (!match.trim()) return;
    onChange([...rules, { id: uuid(), entity, match: match.trim(), category }]);
    setMatch("");
  }

  function removeRule(id: string) {
    onChange(rules.filter((r) => r.id !== id));
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Categorisation rules — description contains → category
      </h3>
      <p className="text-xs text-slate-500">
        Rules apply top of the list first. Add a rule once and every future import (and the
        transactions already imported) get categorised automatically.
      </p>
      <div className="flex gap-2 flex-wrap items-end">
        <label className="text-sm">
          <span className="block text-slate-600 dark:text-slate-400 mb-1">Description contains</span>
          <input
            value={match}
            onChange={(e) => setMatch(e.target.value)}
            placeholder="e.g. woolworths"
            className="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 bg-white dark:bg-slate-950"
          />
        </label>
        <label className="text-sm">
          <span className="block text-slate-600 dark:text-slate-400 mb-1">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 bg-white dark:bg-slate-950"
          >
            {entityConfig.categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={addRule}
          className="bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white text-sm font-medium px-3 py-1.5 rounded"
        >
          Add rule
        </button>
      </div>

      <div className="max-h-72 overflow-auto text-sm divide-y divide-slate-100 dark:divide-slate-800">
        {rules.map((r) => (
          <div key={r.id} className="flex justify-between items-center py-1.5">
            <span>
              <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                {r.match}
              </code>{" "}
              → {r.category}
            </span>
            <button
              onClick={() => removeRule(r.id)}
              className="text-slate-400 hover:text-red-600 text-xs"
            >
              remove
            </button>
          </div>
        ))}
        {rules.length === 0 && <p className="text-slate-400 py-2">No rules yet.</p>}
      </div>
    </div>
  );
}
