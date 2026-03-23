import { useEffect, useState } from "react";
import { fetchApi } from "./folders/useApi";

export interface Analytics {
  averageSessionsPerDay: number;
  averageEventsPerDay: number;

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

  useEffect(() => {
    getAnalytics();
  }, []);

  const getAnalytics = () => {
    fetchApi({
      method: "POST",
      path: "/analytics",
      auth: true,
      onSuccess: (data) => {
        setAnalytics(data);
      },
      onError: (error) => {
        console.error("Analytics error:", error);
      },
    });
  };

  return { analytics };
};
