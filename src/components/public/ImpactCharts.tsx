"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
} from "recharts";

/* ─── Growth Chart ───────────────────────────────────────── */

const growthData = [
  { week: "W1 Jan", kg: 120 },
  { week: "W2 Jan", kg: 210 },
  { week: "W3 Jan", kg: 185 },
  { week: "W4 Jan", kg: 340 },
  { week: "W1 Feb", kg: 420 },
  { week: "W2 Feb", kg: 390 },
  { week: "W3 Feb", kg: 510 },
  { week: "W4 Feb", kg: 680 },
  { week: "W1 Mar", kg: 730 },
  { week: "W2 Mar", kg: 820 },
  { week: "W3 Mar", kg: 910 },
  { week: "W4 Mar", kg: 1050 },
];

const CustomTooltipGrowth = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F2A24] border border-[#16C47F]/40 rounded-xl p-3 shadow-xl">
        <p className="text-[#A7D7C5] text-xs mb-1">{label}</p>
        <p className="text-[#22FF88] font-bold text-lg">{payload[0].value} kg</p>
      </div>
    );
  }
  return null;
};

export function GrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#16C47F" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#16C47F" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(22,196,127,0.08)" />
        <XAxis
          dataKey="week"
          tick={{ fill: "#5A8A78", fontSize: 11 }}
          axisLine={{ stroke: "rgba(22,196,127,0.1)" }}
          tickLine={false}
          interval={2}
        />
        <YAxis
          tick={{ fill: "#5A8A78", fontSize: 11 }}
          axisLine={{ stroke: "rgba(22,196,127,0.1)" }}
          tickLine={false}
          tickFormatter={(v) => `${v}`}
        />
        <Tooltip content={<CustomTooltipGrowth />} />
        <Area
          type="monotone"
          dataKey="kg"
          stroke="#16C47F"
          strokeWidth={2.5}
          fill="url(#greenGrad)"
          dot={false}
          activeDot={{ r: 6, fill: "#22FF88", strokeWidth: 2, stroke: "#071A17" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ─── District Bar Chart ─────────────────────────────────── */

const districtData = [
  { district: "Tamalanrea", kg: 2840, fill: "#16C47F" },
  { district: "Panakkukang", kg: 2210, fill: "#0EA572" },
  { district: "Rappocini",  kg: 1980, fill: "#0C8B63" },
  { district: "Makassar",   kg: 1540, fill: "#0A6E4E" },
  { district: "Ujung Pandang", kg: 1120, fill: "#085A3E" },
];

const CustomTooltipDistrict = ({ active, payload }: { active?: boolean; payload?: { value: number; payload: { district: string } }[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F2A24] border border-[#16C47F]/40 rounded-xl p-3 shadow-xl">
        <p className="text-[#A7D7C5] text-xs mb-1">{payload[0].payload.district}</p>
        <p className="text-[#22FF88] font-bold text-lg">{payload[0].value.toLocaleString("id-ID")} kg</p>
      </div>
    );
  }
  return null;
};

export function DistrictChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={districtData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(22,196,127,0.08)" vertical={false} />
        <XAxis
          dataKey="district"
          tick={{ fill: "#5A8A78", fontSize: 10 }}
          axisLine={{ stroke: "rgba(22,196,127,0.1)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#5A8A78", fontSize: 11 }}
          axisLine={{ stroke: "rgba(22,196,127,0.1)" }}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltipDistrict />} />
        <Bar dataKey="kg" radius={[6, 6, 0, 0]}>
          {districtData.map((entry, idx) => (
            <Cell key={idx} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ─── Category Pie Chart ─────────────────────────────────── */

const categoryData = [
  { name: "Smartphone",  value: 3840, color: "#22FF88" },
  { name: "Laptop",      value: 2620, color: "#16C47F" },
  { name: "Kabel",       value: 1890, color: "#0EA572" },
  { name: "TV / Monitor", value: 1240, color: "#0A6E4E" },
  { name: "Lainnya",     value: 810,  color: "#085A3E" },
];

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent }: { cx: number; cy: number; midAngle: number; outerRadius: number; percent: number }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 24;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.06) return null;
  return (
    <text x={x} y={y} fill="#A7D7C5" textAnchor="middle" dominantBaseline="central" fontSize={11}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function CategoryChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="48%"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={3}
          dataKey="value"
          labelLine={false}
          label={renderCustomLabel}
        >
          {categoryData.map((entry, idx) => (
            <Cell key={idx} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-[#0F2A24] border border-[#16C47F]/40 rounded-xl p-3 shadow-xl">
                  <p className="text-[#A7D7C5] text-xs mb-1">{payload[0].name}</p>
                  <p className="text-[#22FF88] font-bold">{payload[0].value?.toLocaleString("id-ID")} kg</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "11px", color: "#A7D7C5", paddingTop: "8px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
