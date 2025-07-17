const http = require("http");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

await loadPlanetsData();

server.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}`);
});
