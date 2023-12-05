import * as fs from "fs";
const input = fs.readFileSync("./day4-2input.txt", "utf8").split("\n");
class Card {
  id: number;
  copies = 1;
  winningNumbers: string[];
  numbersYouHave: string[];
}
function parseLine(line: string): Card {
  let card = new Card();
  line = line.replace("Card ", "");
  card.id = Number(line.match(/\d+/)[0]);
  line = line.replace(/\d+: /, "");
  card.winningNumbers = line.split("|")[0].match(/\d+/g);
  card.numbersYouHave = line.split("|")[1].match(/\d+/g);

  return card;
}

function getMatchingNumers(card: Card) {
  const winningMap = new Map();
  card.winningNumbers.forEach((val) => {
    winningMap.set(val, true);
  });
  const matchedNumbers = card.numbersYouHave.reduce((acc, val) => {
    return winningMap.get(val) ? acc + 1 : acc;
  }, 0);
  return matchedNumbers;
}

function populateNextCardCopies(card: Card, i: number) {
  const matchingNumbers = getMatchingNumers(card);
  for (let j = 0; j < matchingNumbers; j++) {
    cards[i + j + 1].copies++;
  }
}

let cards = input.map(parseLine);
const firstCard = cards[0];
populateNextCardCopies(firstCard, 0);
let scratchedCards = 1;
for (let i = 1; i < cards.length; i++) {
  let card = cards[i];
  while (card.copies > 0) {
    populateNextCardCopies(card, i);
    scratchedCards++;
    card.copies--;
  }
}
console.log(scratchedCards);
