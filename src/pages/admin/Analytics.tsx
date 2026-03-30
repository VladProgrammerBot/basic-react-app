import { useAnalytics } from "../../hooks/useAnalytics";
import { 
  AnalyticCard,
  AverageSessionsCard,
  TopDevicesCard,
  TopFunctionsCard,
  TopActiveUsersCard,
  HourlyEventAverageCard,
  SessionsByDayCard,
  EventsByDayCard,
  LastDayHourlyEventsCard
} from "./AnalyticCard";

export const Analytics = () => {
  const { analytics, osTopList } = useAnalytics();

  return (
    <div className="flex gap-4 p-4 flex-wrap">
      <p className="font-bold text-3xl w-full">Analytics</p>
      {analytics && (
        <>
          <div className="flex gap-4 w-full">
            <AnalyticCard title="AverageEventsCard">
              <p className="text-3xl font-bold">{analytics.averageEventsPerDay}</p>
            </AnalyticCard>
            <AverageSessionsCard analytics={analytics} />
          </div>
          <div className="flex gap-4 w-full">
            <TopDevicesCard osTopList={osTopList} />
            <TopFunctionsCard analytics={analytics} />
          </div>
          <div className="flex gap-4 w-full">
            <TopActiveUsersCard analytics={analytics} />
            <HourlyEventAverageCard analytics={analytics} />
          </div>
          <div className="flex gap-4 w-full">
            <SessionsByDayCard analytics={analytics} />
            <EventsByDayCard analytics={analytics} />
          </div>
          <LastDayHourlyEventsCard analytics={analytics} />
        </>
      )}
    </div>
  );
};
