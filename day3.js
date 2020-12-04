// part 1
const fs = require('fs');

fs.readFile('./treesMap.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    // const slope = [1,1];
    // const slope = [3,1];
    // const slope = [5,1];
    // const slope = [7,1];
    // const slope = [1,2];
    const slopes = [
        [1,1],
        [3,1],
        [5,1],
        [7,1],
        [1,2]
    ]
    const pos = {
        x: 0,
        y: 0
    };
    let totals = [];
    let hits = 0;
    let lines = data.split('\n');
    let bottom = lines.length;
    let sliceWidth = lines[0].length

    slopes.forEach((slope) => {
        
        while (pos.y < bottom) {
            if(pos.x >= sliceWidth) {
                pos.x = pos.x - sliceWidth;
            }
            if (lines[pos.y][pos.x] === "#") {
                hits++;
            };
            pos.x+=slope[0];
            pos.y+=slope[1];
        }
        console.log(hits);
        totals.push(hits);
        hits = 0;
        pos.x = 0;
        pos.y = 0;
    })
    // console.log(totals.reduce((curr, acc) => acc *= curr, 1))
    return totals.reduce((curr, acc) => acc *= curr, 1)
});

// part 2 with multiple slope checks
// 70
// 171
// 48
// 60
// 35

// console.log(70*171*48*60*35) // 1206576000