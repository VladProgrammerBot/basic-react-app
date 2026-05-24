import { expect, test } from "vitest";
import type { Analytics } from "../useAnalytics";
const token = import.meta.env.VITE_ADMIN_TOKEN;
const api = import.meta.env.VITE_API;

function validateAnalyticsData(data: Analytics) {


expect(data).toMatchObject<Analytics>({
  averageSessionsPerDay: expect.any(Number),
  averageEventsPerDay: expect.any(Number),
  numberOfNotes: 6842,
  numberOfRelations: 6829,

  topDevices: expect.arrayContaining([
    expect.objectContaining({
      device: expect.any(String),
      session_count: expect.any(Number),
    }),
  ]),

  topFunctions: expect.arrayContaining([
    expect.objectContaining({
      type: expect.any(String),
      event_count: expect.any(Number),
    }),
  ]),

  topActiveUsers: expect.arrayContaining([
    expect.objectContaining({
      username: expect.any(String),
      session_count: expect.any(Number),
    }),
  ]),

  sessionsByDay: expect.arrayContaining([
    expect.objectContaining({
      day: expect.any(String),
      session_count: expect.any(Number),
    }),
  ]),

  eventsByDay: expect.arrayContaining([
    expect.objectContaining({
      day: expect.any(String),
      event_count: expect.any(Number),
    }),
  ]),

  hourlyEventAverage: expect.arrayContaining([
    expect.objectContaining({
      hour: expect.any(Number),
      events: expect.any(Number),
    }),
  ]),

  lastDayHourlyEvents: expect.arrayContaining([
    expect.objectContaining({
      hour: expect.any(Number),
      event_count: expect.any(Number),
    }),
  ]),
});
}

test("adds 1 + 2 to equal 3", async () => {
  const response = await fetch(api + "/analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  const data = await response.json();

  validateAnalyticsData(data);
});
