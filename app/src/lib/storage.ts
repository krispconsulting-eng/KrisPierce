import type { CategoryRule, EntityId, Transaction } from "../types";

const TX_KEY = (entity: EntityId) => `kp.transactions.${entity}`;
const RULES_KEY = (entity: EntityId) => `kp.rules.${entity}`;

export function loadTransactions(entity: EntityId): Transaction[] {
  const raw = localStorage.getItem(TX_KEY(entity));
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Transaction[];
  } catch {
    return [];
  }
}

export function saveTransactions(entity: EntityId, txns: Transaction[]) {
  localStorage.setItem(TX_KEY(entity), JSON.stringify(txns));
}

export function loadRules(entity: EntityId): CategoryRule[] {
  const raw = localStorage.getItem(RULES_KEY(entity));
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CategoryRule[];
  } catch {
    return [];
  }
}

export function saveRules(entity: EntityId, rules: CategoryRule[]) {
  localStorage.setItem(RULES_KEY(entity), JSON.stringify(rules));
}

export function exportAllData(): string {
  const entities: EntityId[] = ["personal", "business", "household", "charity"];
  const dump: Record<string, unknown> = {};
  for (const e of entities) {
    dump[`transactions.${e}`] = loadTransactions(e);
    dump[`rules.${e}`] = loadRules(e);
  }
  return JSON.stringify(dump, null, 2);
}

export function importAllData(json: string) {
  const dump = JSON.parse(json) as Record<string, unknown>;
  const entities: EntityId[] = ["personal", "business", "household", "charity"];
  for (const e of entities) {
    const txns = dump[`transactions.${e}`];
    const rules = dump[`rules.${e}`];
    if (Array.isArray(txns)) saveTransactions(e, txns as Transaction[]);
    if (Array.isArray(rules)) saveRules(e, rules as CategoryRule[]);
  }
}
