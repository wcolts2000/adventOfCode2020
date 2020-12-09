const fs = require('fs');
fs.readFile('xmas.txt', 'utf-8', (err, data) => {
    if(err) console.log(err);
    // part 1
    const vals = data.split('\n');
    let keepGoing = true;
    let position = 25;
    // function checkSum(position) {
    //     for(let i = position - 25; i < position - 1; i++) {
    //         for(let j = position - 24; j < position; j++) {
    //             if(+vals[i] + +vals[j] === +vals[position] && +vals[i] !== +vals[position] && +vals[j] !== +vals[position]) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }
    // while(keepGoing) {
    //     if (!checkSum(position)) {
    //         keepGoing = false;
    //     } else {
    //         position++;
    //     };
    // }
    // console.log(position); // 662
    // console.log(vals[position]); // 1124361034
    
    // part 2
    const target = vals[662];
    const checkVals = vals.slice(0, 662);
    for(let i = 0; i < checkVals.length - 1; i++) {
        for(let j = 1; j < checkVals.length; j++) {
            const sumCheck = checkVals.slice(i, j+1).reduce((el, acc) => +acc + el,0);
            console.log(sumCheck)
            if ( +sumCheck === +target) {
                const sortedSumCheck = checkVals.slice(i, j+1).sort((a,b) => a - b);
                const ans = +sortedSumCheck[0] + +sortedSumCheck[sortedSumCheck.length - 1]
                console.log('ans', ans) // 129444555
                return ans
            }
        }
    }
})