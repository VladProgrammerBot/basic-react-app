import { BarList } from "@/components/analytics/BarList";
import { useAnalytics } from "../../hooks/useAnalytics";
import { LineChart } from "@/components/analytics/LineChart";

export const Analytics = () => {
  const { analytics } = useAnalytics();

  const data = [
    { name: "/home", value: 843 },
    { name: "/imprint", value: 46 },
    { name: "/cancellation", value: 3 },
    { name: "/blocks", value: 108 },
    { name: "/documentation", value: 384 },
  ];

  return (
    <div>
      <h1>Analytics</h1>
      {analytics && (
        <>
        <h2>Average events per day</h2>
        {analytics.averageEventsPerDay}
        <h2>Average sessions per day</h2>
        {analytics.averageSessionsPerDay}
          <h2>Top Devices</h2>
          <BarList
            data={analytics.topDevices.map(({ device, session_count }) => ({
              name: device,
              value: session_count,
            }))}
          />
          <h2>Top Functions</h2>
          <BarList
            data={analytics.topFunctions.map(({ type, event_count }) => ({
              name: type,
              value: event_count,
            }))}
          />
          <h2>Hourly Event Average</h2>
          <LineChart
            className="h-80"
            data={analytics.hourlyEventAverage}
            index="hour"
            categories={["events"]}
            valueFormatter={(number: number) =>
              `$${Intl.NumberFormat("us").format(number).toString()}`
            }
            onValueChange={(v) => console.log(v)}
            xAxisLabel="Hour"
            yAxisLabel="Events"
          />
        </>
      )}
    </div>
  );
};
