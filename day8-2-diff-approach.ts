import * as fs from "fs";
import * as lcm from "compute-lcm";
const input = fs.readFileSync("./day8-2input.txt", "utf8").split("\n");
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

let positions = [];
const maps = new Map<string, string[]>();
input.slice(2).forEach((line) => {
  const key = line.match(/[A-Z0-9]+/)[0];
  if (key.endsWith("A")) {
    positions.push(key);
  }
  maps.set(key, line.match(/[A-Z0-9]+, [A-Z0-9]+/)[0].split(", "));
});

const allPositionSteps = [];
for (let i = 0; i < positions.length; i++) {
  let steps = 0;
  let j = 0;
  let position = positions[i];
  while (!position.endsWith("Z")) {
    let nextInstr = null;
    if (instructions[j] === undefined) {
      nextInstr = instructions[0];
      j = 0;
    } else {
      nextInstr = instructions[j];
    }
    j++;
    position = maps.get(position)[nextInstr];
    steps++;
  }
  allPositionSteps.push(steps);
  console.log(steps);
}

console.log(lcm(...allPositionSteps));
