import { BarList } from "@/components/analytics/BarList";
import { LineChart } from "@/components/analytics/LineChart";
import type { JSX } from "react";

const icons: Record<string, JSX.Element> = {
  lightning: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  user: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  device: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

const colorStyles: Record<string, string> = {
  blue: "bg-blue-500/20 border-blue-500/30 text-blue-300",
  purple: "bg-purple-500/20 border-purple-500/30 text-purple-300",
  emerald: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300",
  orange: "bg-orange-500/20 border-orange-500/30 text-orange-300",
};

export const StatCard = ({ title, value, icon, color }: { 
  title: string; 
  value: number; 
  icon: string;
  color: string;
}) => (
  <div className={`rounded-2xl p-5 border flex-1 backdrop-blur-sm ${colorStyles[color]}`}>
    <div className="flex items-center gap-4 justify-between mb-3">
      <span className="text-sm font-medium opacity-80">{title}</span>
      <div className="p-2 rounded-xl bg-white/10">
        {icons[icon]}
      </div>
    </div>
    <p className="text-3xl font-bold">{value.toLocaleString()}</p>
  </div>
);

const ChartCard = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="bg-slate-900/50 border w-[calc(50%_-_0.5rem)] border-slate-700/50 rounded-2xl p-5 backdrop-blur-sm">
    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
      {title}
    </h3>
    {children}
  </div>
);

interface BarListItem {
  name: string;
  value: number;
}

export const BarListCard = ({ title, data }: { title: string; data: BarListItem[] }) => (
  <ChartCard title={title}>
    <BarList data={data} />
  </ChartCard>
);

interface LineChartData {
  [key: string]: string | number;
}

export const LineChartCard = ({
  title,
  data,
  index,
  categories,
  xAxisLabel,
  yAxisLabel,
}: {
  title: string;
  data: LineChartData[];
  index: string;
  categories: string[];
  xAxisLabel: string;
  yAxisLabel: string;
}) => (
  <ChartCard title={title}>
    <LineChart
      className="h-72"
      data={data}
      index={index}
      categories={[...categories]}
      valueFormatter={(number: number) =>
        `${Intl.NumberFormat("us").format(number).toString()}`
      }
      onValueChange={(v) => console.log(v)}
      xAxisLabel={xAxisLabel}
      yAxisLabel={yAxisLabel}
    />
  </ChartCard>
);
