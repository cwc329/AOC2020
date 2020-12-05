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
    let rowRange = [0, 127];
    let columnRange = [0, 7];
    const seat = { row: 0, column: 0 };
    for (let i = 0; i < 7; i++) {
      if (element[i] === 'F') {
        rowRange[1] = Math.floor((rowRange[0] + rowRange[1]) / 2);
        seat.row = rowRange[0]
      } else {
        rowRange[0] = Math.ceil((rowRange[0] + rowRange[1]) / 2);
        seat.row = rowRange[1]
      }
    }
    for (let j = 7; j <= element.length; j++) {
      if (element[j] === 'L') {
        columnRange[1] = Math.floor((columnRange[0] + columnRange[1]) / 2);
        seat.column = columnRange[0];
      } else {
        columnRange[0] = Math.ceil((columnRange[0] + columnRange[1]) / 2);
        seat.column = columnRange[1];
      }
    }
    if (seat.row * 8 + seat.column > max) {
      max = seat.row * 8 + seat.column;
    }
  });
  console.log(max)
}

processLineByLine();