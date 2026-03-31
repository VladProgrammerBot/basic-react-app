import { useEffect, useState } from "react";
import { fetchApi } from "./folders/useApi";

export interface Analytics {
  averageSessionsPerDay: number;
  averageEventsPerDay: number;
  numberOfNotes: number;
  numberOfRelations: number;

  topDevices: {
    device: string;
    session_count: number;
  }[];

  topFunctions: {
    type: string;
    event_count: number;
  }[];

  topActiveUsers: {
    username: string;
    session_count: number;
  }[];

  sessionsByDay: {
    day: string;
    session_count: number;
  }[];

  eventsByDay: {
    day: string;
    event_count: number;
  }[];

  hourlyEventAverage: {
    hour: number;
    events: number;
  }[];

  lastDayHourlyEvents: {
    hour: number;
    event_count: number;
  }[];
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  const statCards = analytics
    ? [
        {
          title: "Avg Events/Day",
          value: analytics.averageEventsPerDay,
          icon: "lightning",
          color: "blue",
        },
        {
          title: "Avg Sessions/Day",
          value: analytics.averageSessionsPerDay,
          icon: "users",
          color: "purple",
        },
        {
          title: "Number of notes",
          value: analytics.numberOfNotes,
          icon: "user",
          color: "emerald",
        },
        {
          title: "Number of relations",
          value: analytics.numberOfRelations,
          icon: "device",
          color: "orange",
        },
      ]
    : [];

  const lineChartConfigs = analytics
    ? [
        {
          key: "hourlyEventAverage",
          title: "Hourly Event Average",
          index: "hour",
          categories: ["events"],
          xAxisLabel: "Hour",
          yAxisLabel: "Events",
          data: analytics.hourlyEventAverage,
        },
        {
          key: "sessionsByDay",
          title: "Sessions by Day",
          index: "day",
          categories: ["session_count"],
          xAxisLabel: "Day",
          yAxisLabel: "Sessions",
          data: analytics.sessionsByDay,
        },
        {
          key: "eventsByDay",
          title: "Events by Day",
          index: "day",
          categories: ["event_count"],
          xAxisLabel: "Day",
          yAxisLabel: "Events",
          data: analytics.eventsByDay,
        },
        {
          key: "lastDayHourlyEvents",
          title: "Last 24 Hours Activity",
          index: "hour",
          categories: ["event_count"],
          xAxisLabel: "Hour",
          yAxisLabel: "Events",
          data: analytics.lastDayHourlyEvents,
        },
      ]
    : [];

  useEffect(() => {
    getAnalytics();
  }, []);

  const getAnalytics = () => {
    fetchApi({
      method: "POST",
      path: "/analytics",
      auth: true,
      onSuccess: (data) => {
        console.log(data);

        setAnalytics(data);
      },
    });
  };

  function getOS(ua: string) {
    if (/Windows NT/i.test(ua)) return "Windows";
    if (/Android/i.test(ua)) return "Android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
    if (/Mac OS X/i.test(ua)) return "macOS";
    if (/Linux/i.test(ua)) return "Linux";

    return "Unknown OS";
  }

  const osTopList = () => {
    const os = new Map<string, number>();

    analytics?.topDevices.forEach((data) => {
      const osName = getOS(data.device);
      const currentCount = os.get(osName) || 0;
      os.set(osName, currentCount + data.session_count);
    });

    return Array.from(os);
  };

  const barListConfigs = analytics
    ? [
        {
          key: "topDevices",
          title: "Top Devices",
          data: osTopList().map(([name, value]) => ({ name, value })),
        },
        {
          key: "topFunctions",
          title: "Top Functions",
          data: analytics.topFunctions.map(({ type, event_count }) => ({
            name: type,
            value: event_count,
          })),
        },
        {
          key: "topActiveUsers",
          title: "Most Active Users",
          data: analytics.topActiveUsers.map(({ username, session_count }) => ({
            name: username,
            value: session_count,
          })),
        },
      ]
    : [];

  return { analytics, statCards, lineChartConfigs, barListConfigs };
};
