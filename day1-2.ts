import * as fs from "fs";

const input = fs.readFileSync("./day1input.txt", "utf8").split("\n");

enum NUMBERS {
  zero = 0,
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
  six = 6,
  seven = 7,
  eight = 8,
  nine = 9,
}

function getFirstNumber(val: string): string {
  return val.match(
    /(\d)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/
  )[0];
}

function getLastNumber(val: string): string {
  const matches = val
    .split("")
    .reverse()
    .join("")
    .match(
      /(\d)|(eno)|(owt)|(eerht)|(ruof)|(evif)|(xis)|(neves)|(thgie)|(enin)/g
    );
  const numericValue = matches[0];
  return isNaN(+numericValue)
    ? numericValue.split("").reverse().join("")
    : numericValue;
}

export function getNumberComposedByTwoNumericChars(
  first: string,
  second: string
): number {
  first;
  return Number(
    String(isNaN(+first) ? NUMBERS[first] : first) +
      String(isNaN(+second) ? NUMBERS[second] : second)
  );
}

const total = input.reduce((acc: number, val: string) => {
  const firstNumber = getFirstNumber(val);
  const lastNumber = getLastNumber(val);
  const composedNumber = getNumberComposedByTwoNumericChars(
    firstNumber,
    lastNumber
  );
  console.log(`${val} || ${firstNumber} + ${lastNumber} = ${composedNumber} `);
  return acc + composedNumber;
}, 0);
console.log(total);

const tests = [
  { val: "1x5", res: 15 },
  { val: "six5four1four4", res: 64 },
  { val: "2fiveshtds4oneightsjg", res: 28 },
  { val: "962seven58two7", res: 97 },
  { val: "7mrtndknxzlzdkqcfjxgz9f66", res: 76 },
  { val: "fqckxpqrjk8eighteighttwo6fivejps4", res: 84 },
  { val: "drvglmnine7three8one7twodxtr", res: 92 },
  { val: "mbnfjkxptbtjmgcrtkhxjvjhjnine83mpnsixfcmxcbnspx", res: 96 },
  { val: "eightjtrpdfxvdlkqmrrbxbc6", res: 86 },
  { val: "5mtqkkxsqf78nineseven", res: 57 },
  { val: "dkkrkxxonevjqdthreen21ztnzlghmttxmblpp", res: 11 },
  { val: "ninethree43mrgng6jtjm", res: 96 },
  { val: "fiveg2three", res: 53 },
  { val: "6prj9four4rtm21", res: 61 },
  { val: "one2vgvklpcqnxssjbone1six", res: 16 },
  { val: "8glktlgcfsevenmkjvone3dgjjfkd8", res: 88 },
  { val: "threeone6ninefive7three", res: 33 },
  { val: "zfv2c2four5one6b", res: 26 },
  { val: "qxtbbtwo7jrdgxlcpxbczxhnpjthreetwogcfl", res: 22 },
  { val: "vfhgqjfqfc78eight", res: 78 },
];

tests.forEach((test) => {
  const res = getFullNumber(test.val);
  if (res !== test.res) {
    console.log(`Error: ${test.val} should be ${test.res} but is ${res}`);
  }
});
function getFullNumber(val: string) {
  const firstNumber = getFirstNumber(val);
  const lastNumber = getLastNumber(val);
  const composedNumber = getNumberComposedByTwoNumericChars(
    firstNumber,
    lastNumber
  );
  return composedNumber;
}
