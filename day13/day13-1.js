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
  const base = Number(inputs[0]);
  const buses = inputs[1].split(',').map(Number);
  let min = Infinity;
  let index;
  for (let i = 0; i < buses.length; i++) {
    let num = buses[i];
    if (num) {
      let minutesHaveToWait = num - (base % num);
      console.log({ num, minutesHaveToWait })
      if (min > minutesHaveToWait) {
        min = minutesHaveToWait
        index = i
      }
    }
  }
  console.log(buses[index] * min);
}

processLineByLine();