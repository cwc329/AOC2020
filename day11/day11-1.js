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
  let seats = inputs;
  let newSeats;
  let needChange = true;
  while (needChange) {
    newSeats = changeSeats(seats);
    needChange = false;
    for (let i = 0; i < seats.length; i++) {
      if (seats[i] !== newSeats[i]) {
        needChange = true;
      }
    }
    if (needChange) {
      seats = newSeats;
    }
  }

  let count = 0;
  for (let i = 0; i < newSeats.length; i++) {
    for (let j = 0; j < newSeats[i].length; j++) {
      if (newSeats[i][j] === '#') {
        count++;
      }
    }
  }
  console.log(count);

  function changeSeats(seats) {
    let newSeats = [];
    const checkList = [
      { di: 0, dj: 1 },
      { di: 0, dj: -1 },
      { di: 1, dj: 0 },
      { di: 1, dj: -1 },
      { di: 1, dj: 1 },
      { di: -1, dj: 0 },
      { di: -1, dj: 1 },
      { di: -1, dj: -1 },
    ]
    for (let i = 0; i < seats.length; i++) {
      newSeats.push(['']);
    }
    for (let i = 0; i < seats.length; i++) {
      for (let j = 0; j < seats[i].length; j++) {
        let seatStatus = seats[i][j];
        if (seats[i][j] === 'L') {
          let isAnyOccupied = false;
          for (const check of checkList) {
            let newI = i + check.di;
            let newJ = j + check.dj;
            if (!seats[newI] || !seats[newI][newJ]) continue;
            if (seats[newI][newJ] === '#') {
              isAnyOccupied = true;
            }
          }
          if (!isAnyOccupied) {
            seatStatus = '#';
          }
        } else if (seats[i][j] === '#') {
          let occupiedAdjacentSeats = 0;
          for (const check of checkList) {
            let newI = i + check.di;
            let newJ = j + check.dj;
            if (!seats[newI] || !seats[newI][newJ]) continue;
            if (seats[newI][newJ] === '#') {
              occupiedAdjacentSeats++;
            }
          }
          if (occupiedAdjacentSeats >= 4) {
            seatStatus = 'L';
          }
        }
        newSeats[i] += seatStatus;
      }
    }
    return newSeats;
  }
}

processLineByLine();