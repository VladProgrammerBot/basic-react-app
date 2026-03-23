import { useEffect, useState } from "react";
import { fetchApi } from "./folders/useApi";

export interface Analytics {
  avgSessionsPerDay: number;
  avgEventsCountInOneDay: number;
  topMostPopularDevices: {
    type: string;
    count: number;
  }[];
  topMostPopularFunctions: {
    type: string;
    count: number;
  }[];
  topMostActiveUsers: {
    username: string;
    sessions: number;
  }[];
  daysSessionsCount: {
    day: number;
    sessions: number;
  }[];
  daysEventsCount: {
    day: number;
    events: number;
  }[];
  hoursAverageEventsCount: {
    hour: number;
    events: number;
  }[];
  hoursLastDayEventsCount: {
    hour: number;
    events: number;
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
