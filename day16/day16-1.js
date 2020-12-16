const { log } = require('console');
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
  const verifiedFields = [];
  let myTickets = [];
  let nearbyTickets = [];
  let index = 0
  for (let i = index; i < inputs.length; i++) {
    index = i
    if (!inputs[i]) break;
    verifiedFields.push(inputs[i].split(/\:\ |\-|\ or\ /));
  }
  for (let i = index + 1; i < inputs.length; i++) {
    index = i;
    if (!inputs[i]) break;
    myTickets.push(inputs[i].split(',').map(Number));
  }
  for (let i = index + 1; i < inputs.length; i++) {
    index = i;
    if (!inputs[i]) break;
    nearbyTickets.push(inputs[i].split(',').map(Number));
  }
  myTickets = myTickets.flat().filter(el => !isNaN(el));
  nearbyTickets = nearbyTickets.flat().filter(el => !isNaN(el));
  const testObj = {};
  verifiedFields.forEach(el => {
    testObj[el[0]] = (ticketNumber) => {
      if ((ticketNumber >= el[1] && ticketNumber <= el[2]) || (ticketNumber >= el[3] && ticketNumber <= el[4])) return true;
      return false;
    }
  })
  let rate = 0;
  for (let i = 0; i < nearbyTickets.length; i++) {
    let validation = false;
    for (const func in testObj) {
      if (testObj[func](nearbyTickets[i])) {
        validation = true;
      }
    }
    if (!validation) {
      rate += nearbyTickets[i]
    }
  }
  console.log(rate);
}

processLineByLine();
