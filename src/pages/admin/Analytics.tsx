import { useAnalytics } from "../../hooks/useAnalytics";

export const Analytics = () => {
  const { analytics } = useAnalytics();

  return (
    <div>
      <h1>Analytics</h1>
      {/* <p>{analytics ? analytics.averageEventsPerDay[0].avg_events_per_day : "Loading..."}</p> */}
      {/* {JSON.stringify(analytics)} */}
    </div>
  );
};
