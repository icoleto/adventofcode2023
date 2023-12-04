import * as fs from "fs";
import { parse } from "path";

const input = fs.readFileSync("./day2input.txt", "utf8").split("\n");
class Game {
  id: number;
  plays: Play[];
}
function parseLine(line: string): Game {
  let game = {} as any;
  line = line.replace("Game ", "");
  game.id = Number(line.match(/\d+/)[0]);
  line = line.replace(/\d+: /, "");
  game.plays = line.split(";").map(Play.parsePlay);
  return game;
}
class Play {
  blue: number;
  red: number;
  green: number;
  static parsePlay(play: string): Play {
    const matchedBlue = play.match(/\d+ blue/);
    const matchedRed = play.match(/\d+ red/);
    const matchedGreen = play.match(/\d+ green/);
    return {
      blue: Number(matchedBlue && matchedBlue[0].replace(" blue", "")),
      red: Number(matchedRed && matchedRed[0].replace(" red", "")),
      green: Number(matchedGreen && matchedGreen[0].replace(" green", "")),
    };
  }
}

let gamesIdAcc = 0;
const initialSetup = { blue: 14, red: 12, green: 13 };
const games = input.map(parseLine);
games.forEach((game) => {
  game.plays.every(
    (play) =>
      play.blue <= initialSetup.blue &&
      play.green <= initialSetup.green &&
      play.red <= initialSetup.red
  )
    ? (gamesIdAcc += game.id)
    : null;
});

console.log(gamesIdAcc);
