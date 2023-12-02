import * as fs from "fs";

const input = fs.readFileSync("./day1input.txt", "utf8").split("\n");

function getFirstNumber(val: string): string {
  return val.match(/\d/)?.[0] || "0";
}

function getLastNumber(val: string): string {
  const matches = val.match(/\d/g);
  return matches?.[matches.length - 1] || "0";
}

function getNumberComposedByTwoNumericChars(
  first: string,
  second: string
): number {
  return Number(first + second);
}

const total = input.reduce((acc: number, val: string) => {
  const firstNumber = getFirstNumber(val);
  const lastNumber = getLastNumber(val);
  const composedNumber = getNumberComposedByTwoNumericChars(
    firstNumber,
    lastNumber
  );
  return acc + composedNumber;
}, 0);
console.log(total);
