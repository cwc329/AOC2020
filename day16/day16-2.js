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
  let myTicket = [];
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
    myTicket.push(inputs[i].split(',').map(Number));
  }
  for (let i = index + 1; i < inputs.length; i++) {
    index = i;
    if (!inputs[i]) break;
    nearbyTickets.push(inputs[i].split(',').map(Number));
  }
  myTicket = myTicket.filter(el => el.length !== 1).flat();
  nearbyTickets = nearbyTickets.filter(el => el.length !== 1);
  const testObj = {};
  verifiedFields.forEach(el => {
    testObj[el[0]] = (ticketNumber) => {
      if ((ticketNumber >= el[1] && ticketNumber <= el[2]) || (ticketNumber >= el[3] && ticketNumber <= el[4])) return true;
      return false;
    }
  })
  let rate = 0;
  function checkTicket(ticket) {
    let result = true;
    for (let i = 0; i < ticket.length; i++) {
      let validation = false;
      for (const func in testObj) {
        if (testObj[func](ticket[i])) {
          validation = true;
          break;
        }
      }
      if (!validation) {
        rate += ticket[i]
        result = false;
        break;
      }
    }
    return result;
  }
  nearbyTickets = nearbyTickets.map(el => {
    return checkTicket(el) ? el : null
  }).filter(el => el);
  const allTickets = [myTicket, ...nearbyTickets];
  const ticketsNumber = allTickets.length;
  const fieldsNumber = myTicket.length;
  const undeterminedFields = [];
  const fields = Array(fieldsNumber);
  let fieldsOrder = [];
  for (let i = 0; i < fieldsNumber; i++) {
    undeterminedFields.push(i);
    fieldsOrder.push([])
  }
  loop1:
  for (const func in testObj) {
    loop2:
    for (const field of undeterminedFields) {
      let found = false;
      loop3:
      for (let j = 0; j < allTickets.length; j++) {
        if (!testObj[func](allTickets[j][field])) {
          continue loop2;
        }
      }
      found = true;
      if (found) {
        fieldsOrder[field].push(func);
      }
    }
  }
  while (fieldsOrder.filter(el => el.length >= 1).length !== 0) {
    let target = '';
    for (let i = 0; i < fieldsOrder.length; i++) {
      if (fieldsOrder[i].length === 1) {
        target = fieldsOrder[i][0];
        fields[i] = target;
        break;
      }
    }
    fieldsOrder = fieldsOrder.map(el => {
      return el.filter(str => str !== target)
    })
  }
  let result = 1
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].includes('departure')) {
      result *= myTicket[i]
    }
  }
  console.log(result)
}

processLineByLine();
