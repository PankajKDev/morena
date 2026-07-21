"use client";

import { useCallback, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { X } from "lucide-react";

const COLORS = [
  "hsl(220, 90%, 55%)",
  "hsl(0, 85%, 55%)",
  "hsl(140, 75%, 45%)",
  "hsl(25, 90%, 55%)",
  "hsl(270, 80%, 55%)",
  "hsl(185, 80%, 50%)",
  "hsl(335, 85%, 55%)",
  "hsl(85, 75%, 50%)",
  "hsl(240, 70%, 55%)",
  "hsl(40, 90%, 55%)",
  "hsl(160, 75%, 45%)",
  "hsl(350, 85%, 55%)",
];

const RADIAN = Math.PI / 180;

function renderLabel(props: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}) {
  const { cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent = 0 } = props;
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="hsl(var(--foreground))"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-medium"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; payload: { name: string; value: number; total: number } }[];
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-md">
      <p className="font-semibold text-foreground">{d.name}</p>
      <p className="text-muted-foreground tabular-nums">
        {d.value.toLocaleString()} visits ({((d.value / d.total) * 100).toFixed(1)}%)
      </p>
    </div>
  );
}

function PieChartModal({
  title,
  data,
  onClose,
}: {
  title: string;
  data: { name: string; value: number }[];
  onClose: () => void;
}) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg animate-in fade-in zoom-in-95 rounded-2xl border border-border bg-background p-8 shadow-2xl duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X size={16} />
        </button>

        <h3 className="text-xl font-bold tracking-tight mb-6">{title}</h3>

        <div className="flex flex-col items-center">
          <PieChart width={320} height={320}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              dataKey="value"
              nameKey="name"
              strokeWidth={0}
              label={renderLabel}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                  className="outline-none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2 text-sm">
              <span
                className="size-3 shrink-0 rounded-sm"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="truncate text-foreground">{d.name}</span>
              <span className="ml-auto tabular-nums text-muted-foreground">
                {d.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { PieChartModal };
