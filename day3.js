// part 1
const fs = require('fs');

fs.readFile('./treesMap.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    const slope = [3,1];
    const pos = {
        x: 0,
        y: 0
    };
    let hits = 0;
    let lines = data.split('\n');
    let bottom = lines.length;
    let sliceWidth = lines[0].length

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
});