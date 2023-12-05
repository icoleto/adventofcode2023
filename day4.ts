import * as fs from "fs";
const input = fs.readFileSync("./day4input.txt", "utf8").split("\n");
class Card {
  id: number;
  winningNumbers: string[];
  numbersYouHave: string[];
}
function parseLine(line: string): Card {
  let card = {} as any;
  line = line.replace("Card ", "");
  card.id = Number(line.match(/\d+/)[0]);
  line = line.replace(/\d+: /, "");
  card.winningNumbers = line.split("|")[0].match(/\d+/g);
  card.numbersYouHave = line.split("|")[1].match(/\d+/g);

  return card;
}

let points = 0;
for (let line of input) {
  const card = parseLine(line);
  const winningMap = new Map();
  card.winningNumbers.forEach((val) => {
    winningMap.set(val, true);
  });
  const matchedNumbers = card.numbersYouHave.reduce((acc, val) => {
    return winningMap.get(val) ? acc + 1 : acc;
  }, 0);

  if (matchedNumbers === 1) {
    points++;
  }
  if (matchedNumbers > 1) {
    points += Math.pow(2, matchedNumbers - 1);
  }
}
console.log(points);
