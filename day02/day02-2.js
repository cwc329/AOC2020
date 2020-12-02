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
  let result = 0;
  let arr = inputs.map(el => { return el.replace(/\:/, '').replace(/\-/, ',').replace(/\ /, ',').replace(/\ /, ',').split(',') });
  arr.map(el => {
    let count = 0;
    let [a, b, target, str] = el;
    a = Number(a) - 1;
    b = Number(b) - 1;
    if (str[a] === target) {
      count++;
    }
    if (str[b] === target) {
      count++;
    }
    if (count === 1) {
      result++;
    }
  })
  console.log(result);
}

processLineByLine();