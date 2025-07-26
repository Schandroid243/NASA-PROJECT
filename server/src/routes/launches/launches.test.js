const request = require("supertest");
const app = require("../../app");

const completeLaunchData = {
  flightNumber: 100,
  mission: "KeplerExploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA", "NOAA"],
  upcoming: true,
  success: true,
};

const completeLaunchDataWithoutDate = {
  flightNumber: 100,
  mission: "KeplerExploration X",
  rocket: "Explorer IS1",
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA", "NOAA"],
  upcoming: true,
  success: true,
};

const completeLaunchDataInvalidDate = {
  flightNumber: 100,
  mission: "KeplerExploration X",
  rocket: "Explorer IS1",
  target: "Kepler-442 b",
  launchDate: "zooooot",
  customers: ["ZTM", "NASA", "NOAA"],
  upcoming: true,
  success: true,
};

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launch", () => {
  test("It should response with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing launches property.",
    });
  });

  test("It should catch invalid date", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchDataInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid date format.",
    });
  });
});
