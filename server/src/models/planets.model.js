const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

let habitablePlanets = [];

function isHabitablePlanets(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

/*
 const promise = new Promise((resolve, reject) => {
    resolve(42);
 });
 promise.then((results) => {

});
const results = await promise;
console.log(results);
*/
function loadPlanetsData() {
  return new Promise((resolve, rejects) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanets(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        rejects(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found !`);
        resolve();
        console.log("We are don processing our file !");
      });
  });
}

module.exports = {
  loadPlanetsData,
  planets: habitablePlanets,
};
