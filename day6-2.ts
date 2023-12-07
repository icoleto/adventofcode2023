import * as fs from "fs";
const input = fs.readFileSync("./day6input.txt", "utf8").split("\n");
const time = Number(input[0].match(/\d/g).join(""));
const distance = Number(input[1].match(/\d/g).join(""));
const race = { time, distance };

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

const ways: number = getWaysOfWinningRace(race);

console.log(ways);
