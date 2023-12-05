import * as fs from "fs";
import { parse } from "path";

const input = fs.readFileSync("./day3input.txt", "utf8").split("\n");
const matrix: string[][] = input.map((line) => line.split(""));
const isNum = (n) => !isNaN(n) && !isNaN(parseFloat(n));
const isSymbol: RegExp = /[^\d\.]/;
let sumValidNumbers = 0;
for (let i = 0; i < matrix.length; i++) {
  let line = matrix[i];
  for (let j = 0; j < line.length; j++) {
    let char = line[j];
    if (char === "*") {
      const adjacentNumbers = [];
      const upLineNumbers = matrix[i - 1]?.join("").match(/\d*/g) || [];
      const inLineNumbers = matrix[i]?.join("").match(/\d*/g) || [];
      const downLineNumbers = matrix[i + 1]?.join("").match(/\d*/g) || [];

      for (let index = 0; index < upLineNumbers.length; index++) {
        const lineGroup = upLineNumbers[index];
        const realIndex = upLineNumbers.slice(0, index).reduce((acc, val) => {
          acc++;
          return isNum(val) ? acc + val.length - 1 : acc;
        }, 0);
        if (
          isNum(lineGroup) &&
          isAdjacent(realIndex, realIndex + lineGroup.length - 1, j)
        ) {
          adjacentNumbers.push(lineGroup);
        }
      }

      for (let index = 0; index < inLineNumbers.length; index++) {
        const lineGroup = inLineNumbers[index];
        const realIndex = inLineNumbers.slice(0, index).reduce((acc, val) => {
          acc++;
          return isNum(val) ? acc + val.length - 1 : acc;
        }, 0);
        if (
          isNum(lineGroup) &&
          isAdjacent(realIndex, realIndex + lineGroup.length - 1, j)
        ) {
          adjacentNumbers.push(lineGroup);
        }
      }

      for (let index = 0; index < downLineNumbers.length; index++) {
        const lineGroup = downLineNumbers[index];
        const realIndex = downLineNumbers.slice(0, index).reduce((acc, val) => {
          acc++;
          return isNum(val) ? acc + val.length - 1 : acc;
        }, 0);
        if (
          isNum(lineGroup) &&
          isAdjacent(realIndex, realIndex + lineGroup.length - 1, j)
        ) {
          adjacentNumbers.push(lineGroup);
        }
      }

      if (adjacentNumbers.length === 2) {
        sumValidNumbers += adjacentNumbers[0] * adjacentNumbers[1];
      }
    }
  }
}

function isAdjacent(start, end, target) {
  return target >= start - 1 && target <= end + 1;
}
console.log(sumValidNumbers);
