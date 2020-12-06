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
  const arr = inputs;
  arr.push('');
  let groupNumber = 0;
  let groupAnswer = [];
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      groupNumber++;
    }
  }
  for (let i = 0; i < groupNumber; i++) {
    groupAnswer.push([])
  }
  let currentGroup = 0;
  while (arr.length) {
    if (arr[0]) {
      groupAnswer[currentGroup].push(arr[0].split(''));
    } else {
      currentGroup++;
    }
    arr.shift();
  }
  groupAnswer = groupAnswer.map(group => {
    const length = group.length;
    const answers = group.flat().sort();
    return { answers, length }
  })
  let result = 0;
  groupAnswer.map(group => {
    const { answers, length } = group;
    let count = 0;
    let current = null;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] !== current) {
        if (count === length) {
          result++;
        }
        count = 1;
        current = answers[i];
      } else {
        count++;
      }
    }
    if (count === length) {
      result++;
    }
  })
  console.log(result);
}

processLineByLine();