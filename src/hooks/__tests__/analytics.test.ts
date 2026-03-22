import { expect, test } from "vitest";

test("adds 1 + 2 to equal 3", () => {
  const analyticsData = {
    avgSessionsPerDay: 12.5,
    avgEventsCountInOneDay: 150.2,
    topMostPopularDevices: [{ type: "Mobile", count: 500 }],
    topMostPopularFunctions: [{ type: "Login", count: 1200 }],
    topMostActiveUsers: [{ username: "john_doe", sessions: 45 }],
    daysSessionsCount: [{ day: 1, sessions: 10 }],
    daysEventsCount: [{ day: 1, events: 100 }],
    hoursAverageEventsCount: [{ hour: 12, events: 5.5 }],
    hoursLastDayEventsCount: [{ hour: 23, events: 8 }],
  };

  expect(analyticsData).toMatchObject({
    avgSessionsPerDay: expect.any(Number),
    avgEventsCountInOneDay: expect.any(Number),

    // Перевірка масивів об'єктів
    topMostPopularDevices: expect.arrayContaining([
      expect.objectContaining({
        type: expect.any(String),
        count: expect.any(Number),
      }),
    ]),

    topMostPopularFunctions: expect.arrayContaining([
      expect.objectContaining({
        type: expect.any(String),
        count: expect.any(Number),
      }),
    ]),

    topMostActiveUsers: expect.arrayContaining([
      expect.objectContaining({
        username: expect.any(String),
        sessions: expect.any(Number),
      }),
    ]),

    daysSessionsCount: expect.arrayContaining([
      expect.objectContaining({
        day: expect.any(Number),
        sessions: expect.any(Number),
      }),
    ]),

    daysEventsCount: expect.arrayContaining([
      expect.objectContaining({
        day: expect.any(Number),
        events: expect.any(Number),
      }),
    ]),

    hoursAverageEventsCount: expect.arrayContaining([
      expect.objectContaining({
        hour: expect.any(Number),
        events: expect.any(Number),
      }),
    ]),

    hoursLastDayEventsCount: expect.arrayContaining([
      expect.objectContaining({
        hour: expect.any(Number),
        events: expect.any(Number),
      }),
    ]),
  });
});
