import * as fs from "fs";
const input = fs.readFileSync("./day10input.txt", "utf8").split("\n");
const map: string[][] = input.map((line) => line.match(/./g));
const mapClone = JSON.parse(JSON.stringify(map));
type Vector = {
  i;
  j;
};

let startingVector: Vector;
let route: Vector[] = [];
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i]?.[j] === "S") {
      startingVector = { i, j };
      break;
    }
  }
}

function filterPrev(previous: Vector) {
  return (v) => !(v.i === previous.i && v.j === previous.j);
}

function findPath(
  map,
  path: Vector[],
  { i, j }: Vector,
  previous: Vector
): Vector[] {
  if (i < 0 || j < 0) {
    return null;
  }

  /*   console.log("---------");
  mapClone[i][j] = "O";
  console.log("v(" + i + "," + j + ")");
  console.log(mapClone); */
  const val = map[i][j];

  if (val === "S" && !(i === previous.i && j === previous.j)) {
    return path;
  }
  const up = { i: i - 1, j };
  const down = { i: i + 1, j };
  const left = { i: i, j: j - 1 };
  const right = { i: i, j: j + 1 };

  if (path.length === 0) {
    path.push({ i, j });
    const validConnections = [];

    if (["|", "7"].includes(map[up.i][up.j])) {
      validConnections.push(up);
    }

    if (["|", "L"].includes(map[down.i][down.j])) {
      validConnections.push(down);
    }

    if (["-", "F"].includes(map[left.i][left.j])) {
      validConnections.push(left);
    }

    if (["-", "7"].includes(map[right.i][right.j])) {
      validConnections.push(right);
    }

    const routes = validConnections.map((v) =>
      findPath(map, path, v, { i, j })
    );

    return routes.find((copyPath) => copyPath !== null);
  }

  // if is already included, exit condition
  if (path.find((v) => v.i === i && v.j === j)) {
    return null;
  }

  if (val === "|") {
    path.push({ i, j });
    return [up, down]
      .filter(filterPrev(previous))
      .map((v) => findPath(map, path, v, { i, j }))
      .find((copyPath) => copyPath !== null);
  }
  if (val === "-") {
    path.push({ i, j });
    return [left, right]
      .filter(filterPrev(previous))
      .map((v) => findPath(map, path, v, { i, j }))
      .find((copyPath) => copyPath !== null);
  }
  if (val === "L") {
    path.push({ i, j });
    return [up, right]
      .filter(filterPrev(previous))
      .map((v) => findPath(map, path, v, { i, j }))
      .find((copyPath) => copyPath !== null);
  }
  if (val === "J") {
    path.push({ i, j });
    return [up, left]
      .filter(filterPrev(previous))
      .map((v) => findPath(map, path, v, { i, j }))
      .find((copyPath) => copyPath !== null);
  }
  if (val === "7") {
    path.push({ i, j });
    return [down, left]
      .filter(filterPrev(previous))
      .map((v) => findPath(map, path, v, { i, j }))
      .find((copyPath) => copyPath !== null);
  }
  if (val === "F") {
    path.push({ i, j });
    return [down, right]
      .filter(filterPrev(previous))
      .map((v) => findPath(map, path, v, { i, j }))
      .find((copyPath) => copyPath !== null);
  }
  //if is ".", means dead end, exit condition
  if (val === ".") {
    return null;
  }
  if (val === "S") {
    return path;
  }
}

console.log("StartingVector: ", startingVector);
const paths = findPath(map, route, startingVector, startingVector);

/* console.log("-----------------------------");
console.log("-----------------------------");
console.log('Scanned map marked with "O"');
console.log(mapClone);

console.log("-----------------------------");
console.log("-----------------------------");
console.log("Route traced with indexes");

const mapClone2 = JSON.parse(JSON.stringify(map));
for (let i = 0; i < paths.length; i++) {
  const path = paths[i];
  mapClone2[path.i][path.j] = String(i);
}
console.log(mapClone2); */

console.log("Total steps: ", paths.length);
console.log("Farthest position", paths.length / 2);

//for solving it I had to transpile the typescript and increase the callstack to exactly "--stack-size=6978"
//not so much proud :(
