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
  const diffrence = {
    1: 0,
    2: 0,
    3: 0
  }
  for (let i = 1; i < arr.length; i++) {
    diffrence[arr[i] - arr[i - 1]]++
  }
  diffrence[3]++;
  console.log(diffrence[1] * diffrence[3]);

  let validCount = 0;

  function fibTest(arr, index) {
    console.log({ validCount });
    if (index === arr.length - 1) return validCount++;
    const currentJolt = arr[index];
    for (let i = 1; i <= 3; i++) {
      if (arr.includes(currentJolt + i)) {
        fibTest(arr, arr.indexOf(currentJolt + i));
      }
    }
  }

  fibTest(arr, 0);
  console.log(validCount);
}

processLineByLine();