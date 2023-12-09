import * as fs from "fs";
const input = fs.readFileSync("./day8input.txt", "utf8").split("\n");
const instructions = input[0].split("").map((instr) => {
  switch (instr) {
    case "L":
      return 0;
    case "R":
      return 1;
    default:
      console.log("hope you don't get here: " + instr);
  }
});

const maps = new Map<string, string[]>();
input.slice(2).forEach((line) => {
  maps.set(
    line.match(/[A-Z]+/)[0],
    line.match(/[A-Z]+, [A-Z]+/)[0].split(", ")
  );
});

let position = "AAA";
const end = "ZZZ";
let steps = 0;
let i = 0;
while (position !== end) {
  let nextInstr = null;
  if (instructions[i] === undefined) {
    nextInstr = instructions[0];
    i = 0;
  } else {
    nextInstr = instructions[i];
  }
  i++;
  position = maps.get(position)[nextInstr];
  steps++;
}

console.log(steps);
