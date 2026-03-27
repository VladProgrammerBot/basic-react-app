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

  function getOS(ua: string) {
      if (/Windows NT/i.test(ua)) return "Windows";
      if (/Android/i.test(ua)) return "Android";
      if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
      if (/Mac OS X/i.test(ua)) return "macOS";
      if (/Linux/i.test(ua)) return "Linux";
  
      return "Unknown OS";
    }
  
    const osTopList = () => {
      const os = new Map<string, number>()
  
      analytics?.topDevices.forEach((data) => {
        const osName = getOS(data.device)
        const currentCount = os.get(osName) || 0
        os.set(osName, currentCount + data.session_count)
      });
  
      return Array.from(os)
    };

  return { analytics, osTopList };
};
