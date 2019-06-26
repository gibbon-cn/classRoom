console.log(process.pid);
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('e:\\temp\\billID.sql'),
  crlfDelay: Infinity
});

var i =0;
rl.on('line', (line) => {
  i = i+1;
  if(i%10000==0)
    console.log(i);
});