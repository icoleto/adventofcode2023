import * as fs from "fs";
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

let steps = 0;
let i = 0;
while (!positions.every((pos) => pos.endsWith("Z"))) {
  let nextInstr = null;
  if (instructions[i] === undefined) {
    nextInstr = instructions[0];
    i = 0;
  } else {
    nextInstr = instructions[i];
  }

  for (let i = 0; i < positions.length; i++) {
    positions[i] = maps.get(positions[i])[nextInstr];
  }

  i++;
  steps++;
}

console.log(steps);

//23836264090002437844135179 - That's not the right answer; your answer is too high.;
// WRONG APPROACH - See day8-2-diff-approach.ts file for right answer
