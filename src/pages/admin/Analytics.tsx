import { BarList } from "@/components/analytics/BarList";
import { useAnalytics } from "../../hooks/useAnalytics";
import { LineChart } from "@/components/analytics/LineChart";
import { AnalyticCard } from "./AnalyticCard";

export const Analytics = () => {
  const { analytics, osTopList } = useAnalytics();

  return (
    <div className="flex gap-4 p-4 flex-wrap">
      <p className="font-bold text-3xl w-full">Analytics</p>
      {analytics && (
        <>
          <AnalyticCard title="AverageEventsCard">
            <p className="text-3xl font-bold">{analytics.averageEventsPerDay}</p>
          </AnalyticCard>
          <h2>Average sessions per day</h2>
          {analytics.averageSessionsPerDay}
          <h2>Top Devices</h2>
          <BarList
            data={osTopList().map(([device, session_count]) => ({
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
          <h2>Top Active Users</h2>
          <BarList
            data={analytics.topActiveUsers.map(
              ({ username, session_count }) => ({
                name: username,
                value: session_count,
              }),
            )}
          />
          <h2>Hourly Event Average</h2>
          <LineChart
            className="h-80"
            data={analytics.hourlyEventAverage}
            index="hour"
            categories={["events"]}
            valueFormatter={(number: number) =>
              `${Intl.NumberFormat("us").format(number).toString()}`
            }
            onValueChange={(v) => console.log(v)}
            xAxisLabel="Hour"
            yAxisLabel="Events"
          />
          <h2>Sessions by Day</h2>
          <LineChart
            className="h-80"
            data={analytics.sessionsByDay}
            index="day"
            categories={["session_count"]}
            valueFormatter={(number: number) =>
              `${Intl.NumberFormat("us").format(number).toString()}`
            }
            onValueChange={(v) => console.log(v)}
            xAxisLabel="Day"
            yAxisLabel="Sessions"
          />
          <h2>Events by Day</h2>
          <LineChart
            className="h-80"
            data={analytics.eventsByDay}
            index="day"
            categories={["event_count"]}
            valueFormatter={(number: number) =>
              `${Intl.NumberFormat("us").format(number).toString()}`
            }
            onValueChange={(v) => console.log(v)}
            xAxisLabel="Day"
            yAxisLabel="Events"
          />
          <h2>Last Day Hourly Events</h2>
          <LineChart
            className="h-80"
            data={analytics.lastDayHourlyEvents}
            index="hour"
            categories={["event_count"]}
            valueFormatter={(number: number) =>
              `${Intl.NumberFormat("us").format(number).toString()}`
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
