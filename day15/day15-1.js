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
  const spoken = inputs[0].split(',').map(Number);
  let lastSpoken = spoken[spoken.length - 1]

  for (let i = spoken.length; i < 100; i++) {
    const lastSpokenId = spoken.length - 1;
    const previousId = spoken.lastIndexOf(lastSpoken, lastSpokenId - 1)
    if (previousId === -1) {
      lastSpoken = 0;
    } else {
      lastSpoken = lastSpokenId - previousId;
    }
    spoken.push(lastSpoken);
  }
  console.log(lastSpoken);
  console.log(spoken)
}

processLineByLine();
