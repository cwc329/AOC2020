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
  let accumulator = 0;
  const actions = inputs.map(el => {
    const temp = el.split(' ');
    temp[1] = Number(temp[1]);
    return { id: inputs.indexOf(el), act: temp }
  })
  const ran = [];
  let i = 0;
  while (!ran.includes(i)) {
    ran.push(i);
    switch (actions[i].act[0]) {
      case 'acc':
        accumulator += actions[i].act[1];
        i++;
        continue;
      case 'jmp':
        i += actions[i].act[1];
        continue;
      case 'nop':
        i++;
        continue;
    }
  }
  console.log(accumulator);
}

processLineByLine();