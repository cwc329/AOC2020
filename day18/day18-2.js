const { log } = require('console');
const fs = require('fs');
const { debugPort, nextTick } = require('process');
const readline = require('readline');
const { start } = require('repl');
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

  const arr = inputs.map(el => JSON.parse('[' + el
    .replace(/\+/g, '"+"')
    .replace(/\*/g, '"*"')
    .replace(/\(/g, '[')
    .replace(/\)/g, ']')
    .replace(/\ /g, ',')
    + ']'));

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += sumUp(arr[i]);
  }
  console.log(sum);

  function sumUp(arr) {
    let secondRound = []
    let result;
    let pre, next, action;
    const actions = {
      '*': (pre, next) => pre * next,
      '+': (pre, next) => pre + next
    }
    let adding = true;
    let multiplying = false;
    while (adding || multiplying) {
      let target = secondRound.length === 0 ? arr : secondRound
      let calculating;
      if (adding) {
        calculating = '+'
      } else {
        calculating = '*'
      }
      for (let i = 0; i < target.length; i++) {
        let el = target[i]
        switch (typeof el) {
          case 'string':
            action = el;
            break;
          case 'number':
            if (!pre) {
              pre = el;
            } else if (!next) {
              next = el;
            }
            break;
          case 'object':
            el = sumUp(el);
            if (!pre) {
              pre = el;
            } else if (!next) {
              next = el;
            }
            break;
        }
        if (action && pre && next) {
          if (action === calculating) {
            pre = actions[action](pre, next);
            result = pre;
            next = null;
            action = null;
          } else {
            secondRound.pop()
            secondRound.push(pre, action, next)
            pre = next;
            next = null;
            action = null;
          }
        }
      }
      if (multiplying) {
        multiplying = false
      }
      if (adding) {
        adding = false;
        multiplying = true
      }
    }
    return result
  }

}

processLineByLine();
