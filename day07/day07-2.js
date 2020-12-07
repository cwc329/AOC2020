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
  const arr = inputs.map(input => {
    return input.split(/\ bags\ contain\ |\ bags,\ |\ bag,\ |\ bags.|\ bag./).filter(el => { if (el) return el })
  }).map(bag => { const obj = {}; obj[bag[0]] = bag.splice(1); return obj });
  let rules = {};
  arr.forEach(el => { rules = Object.assign(rules, el) });

  function test2(arr, bags) {
    let inside = arr[bags];
    let count = 0;
    if (!inside) return 0
    for (let i = 0; i < inside.length; i++) {
      const number = Number(inside[i][0])
      if (!number) {
        return 0;
      } else {
        count += number + number * test2(arr, inside[i].slice(2));
      }
    }
    return count;
  }

  console.log(test2(rules, 'shiny gold'));
}

processLineByLine();