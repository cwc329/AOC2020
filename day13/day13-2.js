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
  const temp = inputs[1].split(',');
  const buses = temp
    .map(el => {
      let num = Number(el);
      if (num) {
        return { bus: num, remainder: (temp.indexOf(el) % num) && num - (temp.indexOf(el) % num) }
      }
    })
    .filter(el => el)
    .sort((a, b) => b.bus - a.bus)

  let a, b, n1, n2;
  a = buses[0].bus;
  n1 = buses[0].remainder;
  for (let i = 1; i < buses.length; i++) {
    b = buses[i].bus;
    n2 = buses[i].remainder;
    let x = 1;
    while (x) {
      let tester = a * x + n1 - n2;
      if (tester % b === 0) {
        n1 = a * x + n1
        a *= b;
        break;
      }
      x++;
    }
  }
  console.log(n1);
}

processLineByLine();