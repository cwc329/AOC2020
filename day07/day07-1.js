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
  const arr = inputs.map(input => { return input.split(/\ bags\ contain\ |\ bags,\ |\ bag,\ |\ bags.|\ bag./).filter(el => { if (el) return el }) }).map(bag => { const obj = {}; obj[bag[0]] = bag.splice(1); return obj });
  let target = ['shiny gold'];
  const result = []
  while (target.length) {
    const search = target.shift();
    for (const bag of arr) {
      for (const key in bag) {
        bag[key].forEach(element => {
          if (element.includes(search)) {
            target.push(key);
            if (!result.includes(key)) {
              result.push(key);
            }
          }
        })
      }
    }
  }
  console.log({ target, result }, result.length);
}

processLineByLine();