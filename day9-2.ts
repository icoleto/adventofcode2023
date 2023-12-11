import * as fs from "fs";
const input = fs.readFileSync("./day9-2input.txt", "utf8").split("\n");
const histories = input.map((line) =>
  line
    .match(/[\+-]?[0-9]+/g)
    .map((val) => Number(val))
    .reverse()
);
function generateSequence(history, generatedSequences) {
  const sequence = [];
  for (let i = 1; i < history.length; i++) {
    const currentVal = history[i];
    const prevVal = history[i - 1];
    sequence.push(prevVal - currentVal);
  }

  generatedSequences.push(sequence);

  if (sequence.some((val) => val !== 0)) {
    generateSequence(sequence, generatedSequences);
  }
}

function extrapolate(history, generatedSequences): number {
  const prev = generatedSequences[0];
  const next = generatedSequences[1];
  if (!next) {
    return history[history.length - 1] - prev[prev.length - 1];
  }

  const extrapoledValue = next[next.length - 1] - prev[prev.length - 1];
  next.push(extrapoledValue);
  return extrapolate(history, generatedSequences.slice(1));
}

const total = histories.reduce((acc, history) => {
  const generatedSequences: number[][] = [];
  generateSequence(history, generatedSequences);
  generatedSequences.reverse();
  const extrapoledValue = extrapolate(history, generatedSequences);
  console.log(extrapoledValue);
  return (acc += extrapoledValue);
}, 0);

console.log("total: " + total);
