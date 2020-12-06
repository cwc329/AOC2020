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
  const groupAnswer = [];
  let temp = '';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      temp += arr[i];
      continue;
    }
    let answers = temp.split('');
    answers = answers.filter((item, index) => {
      return answers.indexOf(item) === index
    });
    groupAnswer.push(answers);
    temp = '';
  }
  let result = 0
  for (let i = 0; i < groupAnswer.length; i++) {
    result += groupAnswer[i].length
  }
  console.log(result);
}

processLineByLine();