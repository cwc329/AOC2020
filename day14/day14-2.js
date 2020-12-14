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
    calculateNewAddress(mask, temp[i][2], temp[i][1].toString(2).padStart(36, 0));
  }
  function calculateNewAddress(mask, value, address) {
    const xCount = mask.match(/X/g).length;
    let tester = 2 ** xCount - 1;
    let oldAddress = address;
    for (let i = tester; i >= 0; i--) {
      let map = i.toString(2).padStart(xCount, 0);
      let x = 0;
      let newAddress = '';
      for (j = 0; j < oldAddress.length; j++) {
        if (mask[j] === 'X') {
          newAddress += map[x];
          x++
        } else if (mask[j] === '1') {
          newAddress += '1';
        } else {
          newAddress += oldAddress[j];
        }
      }
      newAddress = parseInt(newAddress, 2);
      results[newAddress] = value;
    }
  }

  let sum = 0;
  for (const place in results) {
    sum += results[place];
  }
  console.log(sum);
}

processLineByLine();
