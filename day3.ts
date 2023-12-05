import * as fs from "fs";
import { parse } from "path";

const input = fs.readFileSync("./day3input.txt", "utf8").split("\n");
const matrix: string[][] = input.map((line) => line.split(""));
console.log(matrix);
const isNum = (n) => !isNaN(n);
const isSymbol: RegExp = /[^\d\.]/;
let sumValidNumbers = 0;
for (let i = 0; i < matrix.length; i++) {
  let line = matrix[i];
  let foundNum = 0;
  let validNum = false;
  for (let j = 0; j < line.length; j++) {
    let char = line[j];
    if (isNum(char)) {
      validNum =
        validNum ||
        !!line[j - 1]?.match(isSymbol) ||
        !!line[j + 1]?.match(isSymbol) ||
        !!matrix[i - 1]?.[j - 1]?.match(isSymbol) ||
        !!matrix[i - 1]?.[j]?.match(isSymbol) ||
        !!matrix[i - 1]?.[j + 1]?.match(isSymbol) ||
        !!matrix[i + 1]?.[j - 1]?.match(isSymbol) ||
        !!matrix[i + 1]?.[j]?.match(isSymbol) ||
        !!matrix[i + 1]?.[j + 1]?.match(isSymbol);
      foundNum = foundNum * 10 + Number(char);
    } else {
      if (foundNum != 0 && validNum) {
        sumValidNumbers += foundNum;
      }
      foundNum = 0;
      validNum = false;
    }
  }
  if (foundNum != 0 && validNum) {
    sumValidNumbers += foundNum;
  }
}
console.log(sumValidNumbers);
