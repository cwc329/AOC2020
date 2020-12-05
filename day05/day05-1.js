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
  let max = 0;
  inputs.forEach(element => {
    let row = [0, 127];
    let column = [0, 7];
    for (let i = 0; i < 7; i++) {
      if (element[i] === 'F') {
        row[1] = Math.floor((row[0] + row[1]) / 2);
      } else {
        row[0] = Math.ceil((row[0] + row[1]) / 2);
      }
    }
    for (let j = 7; j <= element.length; j++) {
      if (element[j] === 'L') {
        column[1] = Math.floor((column[0] + column[1]) / 2);
      } else {
        column[0] = Math.ceil((column[0] + column[1]) / 2);
      }
    }
    let result = {
      row: element[6] === 'F' ? row[0] : row[1],
      column: element[9] === 'L' ? column[0] : column[1],
    }
    if (result.row * 8 + result.column > max) {
      max = result.row * 8 + result.column;
    }
    console.log({ row, column, result })
  });
  console.log(max)
}

processLineByLine();