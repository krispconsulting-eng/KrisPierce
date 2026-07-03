import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../lib/format";

const COLORS = [
  "#1E3A8A",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#A855F7",
  "#0EA5E9",
  "#14B8A6",
  "#F97316",
  "#64748B",
];

interface Props {
  data: { category: string; total: number }[];
}

export default function CategoryChart({ data }: Props) {
  if (!data.length) {
    return (
      <div className="text-sm text-slate-500 dark:text-slate-400 py-8 text-center">
        No spending data yet — import a CSV to see the breakdown.
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={Math.max(220, data.length * 34)}>
      <BarChart data={data} layout="vertical" margin={{ left: 24, right: 24 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} fontSize={12} />
        <YAxis type="category" dataKey="category" width={150} fontSize={12} />
        <Tooltip formatter={(v) => formatCurrency(Number(v))} />
        <Bar dataKey="total" radius={[0, 4, 4, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
