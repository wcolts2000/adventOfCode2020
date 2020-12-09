const fs = require('fs');
fs.readFile('xmas.txt', 'utf-8', (err, data) => {
    if(err) console.log(err);
    const vals = data.split('\n');
    let keepGoing = true;
    let position = 25;
    function checkSum(position) {
        for(let i = position - 25; i < position - 1; i++) {
            console.log(i)
            for(let j = position - 24; j < position; j++) {
                if(+vals[i] + +vals[j] === +vals[position] && +vals[i] !== +vals[position] && +vals[j] !== +vals[position]) {
                    return true;
                }
            }
        }
        return false;
    }
    console.log(position);
    while(keepGoing) {
        if (!checkSum(position)) {
            keepGoing = false;
        } else {
            position++;
        };
    }
    console.log(vals[position]);// 1124361034    
})