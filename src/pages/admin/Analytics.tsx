import { useAnalytics } from "../../hooks/useAnalytics";
import { 
  StatCard,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
        </div>
        
        {analytics && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Avg Events/Day" 
                value={analytics.averageEventsPerDay}
                icon="lightning"
                color="blue"
              />
              <StatCard 
                title="Avg Sessions/Day" 
                value={analytics.averageSessionsPerDay}
                icon="users"
                color="purple"
              />
              <StatCard 
                title="Number of notes" 
                value={analytics.numberOfNotes}
                icon="user"
                color="emerald"
              />
              <StatCard 
                title="Number of relations" 
                value={analytics.numberOfRelations}
                icon="device"
                color="orange"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <TopDevicesCard osTopList={osTopList} />
              <TopFunctionsCard analytics={analytics} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <TopActiveUsersCard analytics={analytics} />
              <HourlyEventAverageCard analytics={analytics} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <SessionsByDayCard analytics={analytics} />
              <EventsByDayCard analytics={analytics} />
            </div>

            <LastDayHourlyEventsCard analytics={analytics} />
          </>
        )}
      </div>
    </div>
  );
};
