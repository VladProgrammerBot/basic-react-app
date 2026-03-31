import { useAnalytics } from "../../hooks/useAnalytics";
import { StatCard, BarListCard, LineChartCard } from "./AnalyticCard";

export const Analytics = () => {
  const { statCards, lineChartConfigs, barListConfigs } = useAnalytics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4">
        <h1 className="text-4xl mb-4 w-full font-bold text-white">
          Analytics Dashboard
        </h1>
        {statCards.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
        {barListConfigs.map(({ key, ...config }) => (
          <BarListCard key={key} {...config} />
        ))}
        {lineChartConfigs.map((chart) => {
          return <LineChartCard {...chart} key={chart.title} />;
        })}
      </div>
    </div>
  );
};
