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
  const temp = inputs.map(el => {
    return el.split(/\[|\]|\ \=\ /).filter(el => el).map(el => isNaN(Number(el)) ? el : Number(el));
  });
  const groups = []
  const results = {}
  let j = -1;
  let mask;
  for (let i = 0; i < temp.length; i++) {
    if (temp[i][0] === 'mask') {
      mask = temp[i][1];
      continue;
    }
    calculateNewValue(mask, temp[i][2].toString(2).padStart(36, 0), temp[i][1]);
  }

  function calculateNewValue(mask, value, address) {
    let newStr = '';
    while (mask) {
      const lastValue = value[value.length - 1];
      const lastMask = mask[mask.length - 1];
      if (lastMask === 'X') {
        newStr = lastValue + newStr;
      } else {
        newStr = lastMask + newStr;
      }
      mask = mask.slice(0, -1);
      value = value.slice(0, -1);
    }
    results[address] = parseInt(newStr, 2)
    return parseInt(newStr, 2);
  }

  let sum = 0;
  for (const place in results) {
    sum += results[place];
  }
  console.log(sum);
}

processLineByLine();
