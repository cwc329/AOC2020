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
  for (const passport of theValid) {
    let count = 0
    for (let i = 0; i < passport.length; i += 2) {
      switch (passport[i]) {
        case 'byr':
          if (Number(passport[i + 1]) >= 1920 && Number(passport[i + 1] <= 2002)) {
            count++;
            continue;
          }
          break;
        case 'iyr':
          if (Number(passport[i + 1]) >= 2010 && Number(passport[i + 1] <= 2020)) {
            count++;
            continue;
          }
          break;
        case 'eyr':
          if (Number(passport[i + 1]) >= 2020 && Number(passport[i + 1] <= 2030)) {
            console.log('eyr', Number(passport[i + 1]));
            count++;
            continue;
          }
          break;
        case 'hgt':
          if (passport[i + 1].includes('in')) {
            const height = Number(passport[i + 1].slice(0, 2));
            console.log(height)
            if (height >= 59 && height <= 76) {

              count++;
              continue;
            }
            break;
          } else if (passport[i + 1].includes('cm')) {
            const height = Number(passport[i + 1].slice(0, 3));
            console.log(height)
            if (height >= 150 && height <= 193) {

              count++;
              continue;
            }
            break;
          }
        case 'hcl':
          if (passport[i + 1].length === 7 && passport[i + 1][0] === '#') {
            passport[i + 1].slice(1);
            console.log(passport[i + 1].slice(1))
            if (passport[i + 1].match(/[0-9a-f]/g).length === 6) {
              count++;
              continue;
            }
          }
          break;
        case 'ecl':
          if (passport[i + 1] === 'amb' || passport[i + 1] === 'blu' || passport[i + 1] === 'brn' || passport[i + 1] === 'gry' || passport[i + 1] === 'grn' || passport[i + 1] === 'hzl' || passport[i + 1] === 'oth') {
            count++;
            continue;
          }
          break;
        case 'pid':
          if (passport[i + 1].length === 9 && !isNaN(Number(passport[i + 1]))) {
            count++;
            continue;
          }
          break;
        case 'cid':
          continue;
      }
    }
    if (count === 7) {
      result++;
      console.log(passport);
    }
  }
  console.log(result);
}

processLineByLine();