const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${process.env.REACT_APP_API_KEY}`;

test("the fetch succeeds with an error", async () => {
  const resolveValue = {
    base: "stations",
    clouds: { all: 5 },
    cod: 200,
    coord: { lat: 51.5085, lon: -0.1257 },
    dt: 1645778674,
    id: 2643743,
    main: {
      feels_like: 274.12,
      humidity: 79,
      pressure: 1025,
      temp: 278.1,
      temp_max: 279.6,
      temp_min: 276.87,
    },
    name: "London",
    sys: {
      country: "GB",
      id: 2019646,
      sunrise: 1645772087,
      sunset: 1645810365,
      type: 2,
    },
    timezone: 0,
    visibility: 10000,
    weather: [
      { description: "clear sky", icon: "01d", id: 800, main: "Clear" },
    ],
    wind: { deg: 250, speed: 5.66 },
  };
  await expect(
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => data)
  ).resolves.toStrictEqual(resolveValue);
});
