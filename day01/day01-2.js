const fs = require('fs');
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
  const arr = inputs.map(Number);
  let result = 0;
  for (let i = 0; i < arr.length; i ++) {
    for (let j = i + 1; j < arr.length; j ++) {
      for (let k = j + 1; k < arr.length; k ++)
        if (arr[i] + arr[j] + arr[k] === 2020) {
          result = arr[i] * arr[j] * arr[k];
          break;
        }
    }
  }
  console.log(result);
}

processLineByLine();