const fs = require('fs');
fs.readFile('joltage.txt', 'utf-8', (err, data) => {
    if(err) console.log(err)
    data = data.split('\n').sort((a,b) => a - b)
    // console.log(data)
    const counts = {
        ones: 0,
        threes: 1
    }

    for (let i = 0; i < data.length; i++) {
        if(i === 0) {
            if(+data[i] - 0 === 1) counts.ones++;
            if(+data[i] - 0 === 3) counts.threes++;
        } else {
            if(+data[i] - +data[i-1] === 1) counts.ones++;
            if(+data[i] - +data[i-1] === 3) counts.threes++;
        }
    }
    console.log(counts.ones * counts.threes) // 2080
})  