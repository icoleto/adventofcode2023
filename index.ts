function manufacture(gifts, materials) {
  // Code here
  const manufactured = [];

  for (let gift of gifts) {
    if (gift.split("").every((char) => materials.split("").includes(char))) {
      manufactured.push(gift);
    }
  }
  return manufactured;
}

const gifts = ["libro", "ps5"];
const materials = "psli";

manufacture(gifts, materials); // ["tren", "oso"]
console.log(manufacture(gifts, materials));
