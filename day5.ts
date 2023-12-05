import * as fs from "fs";
const input = fs.readFileSync("./day5input.txt", "utf8");

function getMap(regex: RegExp) {
  const rules: { from: number; to: number; length: number }[] = [];
  const parsedTextMap: string[][] = input
    .match(regex)[0]
    .match(/\d* \d* \d*\n/g)
    .map((a) => a.replace("\n", ""))
    .map((a) => a.split(" "));

  for (let line of parsedTextMap) {
    const [t, f, l] = line;
    const to = Number(t);
    const from = Number(f);
    const length = Number(l);
    rules.push({ to, from, length });
  }

  return (number) => {
    for (let rule of rules) {
      if (number >= rule.from && number <= rule.from + rule.length) {
        return rule.to + (number - rule.from);
      }
    }
    return null;
  };
}
const seeds = input.match(/seeds:[^\n]*\n/)[0].match(/\d+/g);
const seed_to_soilMap = getMap(/seed-to-soil map:\n[\d \n]*/);
const soil_to_fertilizerMap = getMap(/soil-to-fertilizer map:\n[\d \n]*/);
const fertilizer_to_waterMap = getMap(/fertilizer-to-water map:\n[\d \n]*/);
const water_to_lightMap = getMap(/water-to-light map:\n[\d \n]*/);
const light_to_temperatureMap = getMap(/light-to-temperature map:\n[\d \n]*/);
const temperature_to_humidityMap = getMap(
  /temperature-to-humidity map:\n[\d \n]*/
);
const humidity_to_locationMap = getMap(/humidity-to-location map:\n[\d \n]*/);

const allMaps: Function[] = [
  seed_to_soilMap,
  soil_to_fertilizerMap,
  fertilizer_to_waterMap,
  water_to_lightMap,
  light_to_temperatureMap,
  temperature_to_humidityMap,
  humidity_to_locationMap,
];

const seedToLocationValues = [];
for (let seed of seeds) {
  let value = Number(seed);
  for (let map of allMaps) {
    value = map(Number(value)) || value;
  }
  seedToLocationValues.push(value);
}
console.log(
  seedToLocationValues.sort((a, b) => {
    return a - b;
  })
);
