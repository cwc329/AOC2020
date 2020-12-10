const fs = require('fs');
const { debugPort } = require('process');
const readline = require('readline');
const lines = [];

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    lines.push(line);
  }
  solve(lines);
}

function solve(inputs) {
  const arr = [0];
  arr.push(...inputs.map(Number).sort((a, b) => a - b));
  arr.push(arr[arr.length - 1] + 3);
  const difArr = [0]
  const diffrence = {
    1: 0,
    2: 0,
    3: 0
  }
  for (let i = 1; i < arr.length; i++) {
    diffrence[arr[i] - arr[i - 1]]++
    difArr.push(arr[i] - arr[i - 1])
  }

  let validCount = 1;
  let temp = 0

  function fibTest(number) {
    if (number <= 0) return 1
    if (number === 1) return 1
    if (number === 2) return fibTest(1) + 1
    return fibTest(number - 1) + fibTest(number - 2) + fibTest(number - 3)
  }

  for (let i = 1; i < difArr.length; i++) {
    if (difArr[i] === 1) {
      temp += 1;
    } else {
      validCount *= fibTest(temp);
      temp = 0
    }
  }
  console.log(validCount);
}

processLineByLine();