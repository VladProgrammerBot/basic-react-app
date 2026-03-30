import { BarList } from "@/components/analytics/BarList";
import { LineChart } from "@/components/analytics/LineChart";
import type { Analytics } from "../../hooks/useAnalytics";

export const AnalyticCard = ({ children, title, className }: { children: React.ReactNode, title: string, className?: string }) => (
  <div className={`p-4 bg-neutral-800 border border-neutral-700 rounded-xl ${className || ''}`}>
    <p>{title}</p>
    {children}
  </div>
);

export const AverageSessionsCard = ({ analytics }: { analytics: Analytics }) => (
  <AnalyticCard title="Average sessions per day">
    <p className="text-3xl font-bold w-fit">{analytics.averageSessionsPerDay}</p>
  </AnalyticCard>
);

export const TopDevicesCard = ({ osTopList }: { osTopList: () => [string, number][] }) => (
  <AnalyticCard title="Top Devices" className="w-1/2">
    <BarList
      data={osTopList().map(([device, session_count]) => ({
        name: device,
        value: session_count,
      }))}
    />
  </AnalyticCard>
);

export const TopFunctionsCard = ({ analytics }: { analytics: Analytics }) => (
  <AnalyticCard title="Top Functions" className="w-1/2">
    <BarList
      data={analytics.topFunctions.map(({ type, event_count }) => ({
        name: type,
        value: event_count,
      }))}
    />
  </AnalyticCard>
);

export const TopActiveUsersCard = ({ analytics }: { analytics: Analytics }) => (
  <AnalyticCard title="Top Active Users" className="w-1/2">
    <BarList
      data={analytics.topActiveUsers.map(({ username, session_count }) => ({
        name: username,
        value: session_count,
      }))}
    />
  </AnalyticCard>
);

export const HourlyEventAverageCard = ({ analytics }: { analytics: Analytics }) => (
  <AnalyticCard title="Hourly Event Average" className="w-1/2">
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
  </AnalyticCard>
);

export const SessionsByDayCard = ({ analytics }: { analytics: Analytics }) => (
  <AnalyticCard title="Sessions by Day" className="w-1/2">
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
  </AnalyticCard>
);

export const EventsByDayCard = ({ analytics }: { analytics: Analytics }) => (
  <AnalyticCard title="Events by Day" className="w-1/2">
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
  </AnalyticCard>
);

export const LastDayHourlyEventsCard = ({ analytics }: { analytics: Analytics }) => (
  <AnalyticCard title="Last Day Hourly Events" className="w-1/2">
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
  </AnalyticCard>
);
