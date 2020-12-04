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
  let arr = [];
  let result = 0;
  let temp = inputs;
  let theValid = [];
  while (temp.length > 0) {
    let str = ''
    if (!temp[0]) {
      temp.shift();
    }
    while (temp[0]) {
      str = str.concat(' ', temp.shift());
    }
    arr.push(str.trim());
  }
  arr = arr.map(el => el.split(' ').map(e => e.split(':')).flat())
  for (const passport of arr) {
    if (passport.length === 16 || (passport.length === 14 && !passport.includes('cid'))) {
      theValid.push(passport);
      continue;
    }
  }
  console.log(theValid.length);
}

processLineByLine();