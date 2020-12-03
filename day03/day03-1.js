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
  const bottom = inputs.length;
  const width = inputs[0].length;
  let i = 0;
  let j = 0;
  let trees = 0;

  while (i < bottom) {
    if (j >= width) {
      j = j % width;
    }
    if (inputs[i][j] === '#') {
      trees++;
    }
    i++;
    j += 3;
  }
  console.log(trees)
}

processLineByLine();