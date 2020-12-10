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
  const preamble = 25;
  const arr = inputs.map(Number);
  let theBefore = arr.splice(0, preamble);
  let tester = arr.shift();
  let flag = true
  while (flag) {
    flag = test(tester, theBefore);
    if (flag) {
      theBefore.shift();
      theBefore.push(tester);
      tester = arr.shift();
    } else {
      console.log(tester);
    }
  }

  console.log({ inputs, tester });
  for (let i = 0; i < inputs.length; i++) {
    let sum = 0
    for (let j = i; j < inputs.length; j++) {
      sum += Number(inputs[j]);
      if (sum === tester) {
        const result = inputs.splice(i, j - i + 1).map(Number).sort();
        console.log(result[0] + result[result.length - 1]);
        return
      } else if (sum > tester) {
        break;
      }
    }
  }

  console.log({ theBefore });

  function test(testSum, arr) {
    if (testSum === undefined) return true;
    let result = false
    for (let i = 0; i < arr.length; i++) {
      if (arr.includes(testSum - arr[i])) {
        result = true;
      }
    }
    return result;
  }
}

processLineByLine();