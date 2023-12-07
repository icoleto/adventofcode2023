import * as fs from "fs";
const input = fs.readFileSync("./day6input.txt", "utf8").split("\n");
const times = input[0].match(/\d+/g);
const distances = input[1].match(/\d+/g);
const races = times.map((val, i) => ({
  time: Number(val),
  distance: Number(distances[i]),
}));

function getWaysOfWinningRace(race: {
  time: number;
  distance: number;
}): number {
  let waysOfWinning = 0;
  for (let i = 1; i < race.time; i++) {
    const timeLeft = race.time - i;
    if (i * timeLeft > race.distance) {
      waysOfWinning++;
    }
  }
  return waysOfWinning;
}

let acc = 1;
for (let i = 0; i < races.length; i++) {
  const ways: number = getWaysOfWinningRace(races[i]);
  console.log(`Race ${i + 1}/${races.length}: ${ways} ways`);
  acc *= ways;
}
console.log(acc);
