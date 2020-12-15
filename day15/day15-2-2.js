const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
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
  const spoken = inputs[0].split(',').map(Number);
  const turnsNeeded = 30000000;
  let lastSpoken;
  let newSpoken;
  const spokenObj = {};
  let startingTurn = spoken.length + 1;
  /*
  for (let i = 0; i < spoken.length; i++) {
    spokenObj[spoken[i]] = [i + 1, i + 1];
  }
  */

  function test(startingArr, lastTurn) {

  }

  function dpTest(obj, current, limit, startingArr) {
    if (current > limit) {
      return lastSpoken;
    }
    if (current <= startingArr.length) {
      lastSpoken = startingArr[current - 1];
      newSpoken = lastSpoken;
      obj[newSpoken] = [current, current];
      return dpTest(obj, current + 1, limit, startingArr);
    }
    const target1 = obj[lastSpoken];
    if (target1 === undefined) {
      newSpoken = 0;
    } else {
      newSpoken = target1[1] - target1[0];
    }

    let target2 = obj[newSpoken]
    if (target2 === undefined) {
      obj[newSpoken] = [current, current];
    } else {
      target2.push(current)
      target2.shift();
    }
    lastSpoken = newSpoken;
    spoken.push(newSpoken);
    return dpTest(obj, current + 1, limit, startingArr);
  }
  for (let i = 1; i <= turnsNeeded; i += 5000) {
    dpTest(spokenObj, i, i + 4999, spoken);
  }
  console.log(lastSpoken);
}



processLineByLine();
