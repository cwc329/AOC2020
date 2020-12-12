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
  const route = inputs.map(el => {
    const direction = el[0];
    const amount = Number(el.slice(1));
    return [direction, amount];
  });
  const degrees = [
    'N',
    'E',
    'S',
    'W'
  ]
  const currentStatus = {
    x: 0,
    y: 0,
    face: 90,
  };

  for (let i = 0; i < route.length; i++) {
    go(route[i]);
  }

  console.log(route)
  console.log(Math.abs(currentStatus.x) + Math.abs(currentStatus.y));
  function go([dir, amount]) {
    let direction = dir;
    if (dir === 'F') {
      direction = degrees[currentStatus.face / 90];
      console.log(direction)
    }

    switch (direction) {
      case 'N':
        currentStatus.y += amount;
        return;
      case 'E':
        currentStatus.x += amount;
        return;
      case 'S':
        currentStatus.y -= amount;
        return;
      case 'W':
        currentStatus.x -= amount;
        return;
      case 'L':
        currentStatus.face = (currentStatus.face + 360 - amount) % 360;
        return;
      case 'R':
        currentStatus.face = (currentStatus.face + amount) % 360;
        return;
    }
  }
}

processLineByLine();