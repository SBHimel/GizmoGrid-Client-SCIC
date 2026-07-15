"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { FiTerminal } from "react-icons/fi";

const COLORS = [
  "#10b981", // Approved
  "#f59e0b", // Pending
  "#ef4444", // Suspended
];

interface ChartsDashboardProps {
  userDistribution: {
    name: string;
    value: number;
    fill: string;
  }[];

  productStatus: {
    name: string;
    value: number;
  }[];

  growthData: {
    month: string;
    Users: number;
    Products: number;
  }[];
}

export default function ChartsDashboard({
  userDistribution = [],
  productStatus = [],
  growthData = [],
}: ChartsDashboardProps) {
  return (
    <section className="space-y-6">
      <div className="border-l-4 border-cyan-500 pl-4">
        <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
          System Data Analytics
        </h2>
        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
          Real-time status of the platform modules
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Distribution */}
        <div className="bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 backdrop-blur-xl lg:col-span-2">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-1.5">
            <FiTerminal className="text-cyan-500" /> User Roles Allocation
          </h3>
          <div className="h-64 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userDistribution}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  cursor={{ fill: "rgba(6, 182, 212, 0.1)" }}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "12px",
                    color: "#ffffff",
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Status */}
        <div className="bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 backdrop-blur-xl">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-1.5">
            <FiTerminal className="text-emerald-500" /> Product Moderation Status
          </h3>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Pie
                  data={productStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {productStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around text-[10px] font-bold font-mono uppercase mt-2">
            <span className="text-emerald-600 dark:text-emerald-400">Approved (450)</span>
            <span className="text-amber-600 dark:text-amber-400">Pending (65)</span>
            <span className="text-red-600 dark:text-red-400">Suspended (15)</span>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 backdrop-blur-xl lg:col-span-3">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-1.5">
            <FiTerminal className="text-purple-500" /> Platform Growth Index
          </h3>
          <div className="h-64 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    borderRadius: "12px",
                  }}
                />
                <Area type="monotone" dataKey="Users" stroke="#a855f7" fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="Products" stroke="#06b6d4" fill="url(#colorProducts)" />
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}