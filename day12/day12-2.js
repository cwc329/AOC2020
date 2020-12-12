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
  let waypoint = {
    x: 10,
    y: 1
  }
  const currentStatus = {
    x: 0,
    y: 0,
    face: 90,
  };
  function calWaypoint(degree, { x, y }) {
    const converts = [
      [x, y],
      [y, -x],
      [-x, -y],
      [-y, x],
    ];
    const [newX, newY] = converts[degree / 90]

    return {
      x: newX,
      y: newY
    }
  }
  function go([dir, amount]) {
    let direction = dir;

    switch (direction) {
      case 'N':
        waypoint.y += amount;
        return;
      case 'E':
        waypoint.x += amount;
        return;
      case 'S':
        waypoint.y -= amount;
        return;
      case 'W':
        waypoint.x -= amount;
        return;
      case 'L':
        waypoint = calWaypoint(360 - amount, waypoint);
        return;
      case 'R':
        waypoint = calWaypoint(amount, waypoint);
        return;
      case 'F':
        currentStatus.x += amount * waypoint.x;
        currentStatus.y += amount * waypoint.y;
        return;
    }
  }
  for (let i = 0; i < route.length; i++) {
    go(route[i]);
  }
  console.log(Math.abs(currentStatus.x) + Math.abs(currentStatus.y));
}

processLineByLine();