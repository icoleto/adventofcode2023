import * as fs from "fs";
const input = fs.readFileSync("./day7-2input.txt", "utf8").split("\n");
const hands = input.map((arr) => ({
  cards: arr.split(" ")[0],
  bid: Number(arr.split(" ")[1]),
  type: null,
  winnings: null,
}));

enum CamelCardsType {
  FiveAKind = 6,
  FourAKind = 5,
  FullHouse = 4,
  ThreeAKind = 3,
  TwoPair = 2,
  OnePair = 1,
  HighCard = 0,
}

const CardToValueMap = new Map();
CardToValueMap.set("A", 14);
CardToValueMap.set("K", 13);
CardToValueMap.set("Q", 12);
CardToValueMap.set("T", 10);
CardToValueMap.set("9", 9);
CardToValueMap.set("8", 8);
CardToValueMap.set("7", 7);
CardToValueMap.set("6", 6);
CardToValueMap.set("5", 5);
CardToValueMap.set("4", 4);
CardToValueMap.set("3", 3);
CardToValueMap.set("2", 2);
CardToValueMap.set("J", 1);

const ValueToCardMap = new Map();
ValueToCardMap.set(13, "A");
ValueToCardMap.set(12, "K");
ValueToCardMap.set(11, "Q");
ValueToCardMap.set(9, "T");
ValueToCardMap.set(8, "9");
ValueToCardMap.set(7, "8");
ValueToCardMap.set(6, "7");
ValueToCardMap.set(5, "6");
ValueToCardMap.set(4, "5");
ValueToCardMap.set(3, "4");
ValueToCardMap.set(2, "3");
ValueToCardMap.set(1, "2");
ValueToCardMap.set(1, "J");

class Hand {
  cards: string;
  bid: number;
  type: CamelCardsType;
}

function calculateCamelCardsType(hand: Hand) {
  const handMap = new Map();
  for (let card of hand.cards) {
    const cardValue = CardToValueMap.get(card);
    handMap.has(cardValue)
      ? handMap.set(cardValue, handMap.get(cardValue) + 1)
      : handMap.set(cardValue, 1);
  }
  let arrHand: { cardValue: number; repeated: number }[] = [];
  for (let entry of handMap.entries()) {
    arrHand.push({ cardValue: entry[0], repeated: entry[1] });
  }

  let sortRepeated = arrHand.sort((a, b) => b.repeated - a.repeated);

  //recalculateHandWithJokers
  if (handMap.has(CardToValueMap.get("J"))) {
    const jokers = handMap.get(CardToValueMap.get("J"));
    const cardToIncrease = sortRepeated.find(
      (c) => c.cardValue !== CardToValueMap.get("J")
    );
    cardToIncrease
      ? (cardToIncrease.repeated += jokers)
      : (sortRepeated[0].repeated = jokers);

    sortRepeated = arrHand.sort((a, b) => b.repeated - a.repeated);
  }

  if (
    sortRepeated[0].repeated === 5 /* &&
    sortRepeated[0].cardValue !== CardToValueMap.get("J") */
  ) {
    hand.type = CamelCardsType.FiveAKind;
    return;
  }

  if (sortRepeated[0].repeated === 4) {
    hand.type = CamelCardsType.FourAKind;
    return;
  }

  if (
    sortRepeated[0].repeated === 3 &&
    sortRepeated[1].cardValue !== CardToValueMap.get("J") &&
    sortRepeated[1].repeated === 2
  ) {
    hand.type = CamelCardsType.FullHouse;
    return;
  }

  if (sortRepeated[0].repeated === 3) {
    hand.type = CamelCardsType.ThreeAKind;
    return;
  }

  if (sortRepeated[0].repeated === 2 && sortRepeated[1].repeated === 2) {
    hand.type = CamelCardsType.TwoPair;
    return;
  }

  if (sortRepeated[0].repeated === 2) {
    hand.type = CamelCardsType.OnePair;
    return;
  }

  if (sortRepeated[0].repeated === 1) {
    hand.type = CamelCardsType.HighCard;
    return;
  }
  if (sortRepeated[0].cardValue === CardToValueMap.get("J")) {
    hand.type = CamelCardsType.HighCard;
    return;
  }
  console.log("what?");
}

function compareFirstHighestCard(hand1: string, hand2: string): number {
  if (!hand1[0]) {
    return 0;
  }

  if (hand1[0] === hand2[0]) {
    return compareFirstHighestCard(hand1.substring(1), hand2.substring(1));
  }
  return CardToValueMap.get(hand2[0]) - CardToValueMap.get(hand1[0]);
}

for (let i = 0; i < hands.length; i++) {
  const hand = hands[i];
  calculateCamelCardsType(hand);
}

hands.sort((hand1, hand2) => {
  if (hand1.type !== hand2.type) {
    return hand2.type - hand1.type;
  }

  return compareFirstHighestCard(hand1.cards, hand2.cards);
});
/*   .forEach((i) => {
    console.log(i.cards + " " + i.bid);
  }); */

let acc = 0;
//calculateWinnings
for (let i = 0; i < hands.length; i++) {
  const hand = hands[i];
  acc += hand.bid * (hands.length - i);
}

console.log(acc);

function testing() {
  const test = [
    { cards: "23J45", bid: 1, type: null, expect: CamelCardsType.OnePair },
    { cards: "2345J", bid: 1, type: null, expect: CamelCardsType.OnePair },
    { cards: "JJJJJ", bid: 1, type: null, expect: CamelCardsType.FiveAKind },
    { cards: "J3JJ2", bid: 1, type: null, expect: CamelCardsType.FourAKind },
    { cards: "JJJJ2", bid: 1, type: null, expect: CamelCardsType.FiveAKind },
    { cards: "23456", bid: 1, type: null, expect: CamelCardsType.HighCard },
    { cards: "23244", bid: 1, type: null, expect: CamelCardsType.TwoPair },
    { cards: "AAKKJ", bid: 1, type: null, expect: CamelCardsType.FullHouse },
    { cards: "234JJ", bid: 1, type: null, expect: CamelCardsType.ThreeAKind },
    { cards: "A2223", bid: 1, type: null, expect: CamelCardsType.ThreeAKind },
    { cards: "AAAJJ", bid: 1, type: null, expect: CamelCardsType.FiveAKind },
    { cards: "KKK23", bid: 1, type: null, expect: CamelCardsType.ThreeAKind },
    { cards: "AJJ94", bid: 1, type: null, expect: CamelCardsType.ThreeAKind },
    { cards: "2233J", bid: 1, type: null, expect: CamelCardsType.FullHouse },
    { cards: "2233J", bid: 1, type: null, expect: CamelCardsType.FullHouse },
  ];

  for (let i = 0; i < test.length; i++) {
    const element = test[i];
    calculateCamelCardsType(element);
    if (element.expect !== element.type) {
      console.log(
        element.cards +
          " - expects:" +
          CamelCardsType[element.expect] +
          ", got:" +
          CamelCardsType[element.type]
      );
    }
  }

  test
    .sort((hand1, hand2) => {
      if (hand1.type !== hand2.type) {
        return hand2.type - hand1.type;
      }

      return compareFirstHighestCard(hand1.cards, hand2.cards);
    })
    .forEach((i) => {
      // console.log(i.cards + " " + CamelCardsType[i.type]);
    });
}
