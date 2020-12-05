// part 1
const fs = require('fs'),
      rows = 127,
      columns = 7,
      decoder = {
          F: 'lower',
          B: 'upper',
          L: 'lower',
          R: 'upper'
      };

let highestID = 0;

const test = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];

function extractInfo(str) {
    const rowPosition = str.slice(0,7),
          colPosition = str.slice(-3),
          row = findRow(rowPosition),
          column = findColumn(colPosition),
          id = findId(row, column);

    if (id > highestID) {
        highestID = id;
    }
    return id;
}

function findRow(str) {
    let highest = rows;
    return modifiedBinarySearch(str, highest);    
}

function findColumn(str) {
    let highest = columns;
    return modifiedBinarySearch(str, highest);
}

function findId(row, col) {
    return row * 8 + col;
}

function modifiedBinarySearch(str, highest) {
    let high = highest, low = 0;
    for (let i = 0; i < str.length; i++) {
        if(decoder[str[i]] === 'lower') {
            high = Math.floor((high - (high - low) / 2))
        } else {
            low = Math.ceil(high - (high - low ) / 2)
        }
    }
    return decoder[str[str.length - 1]] === 'lower' ? low : high;
}
// console.log(highestID)
// console.log(test.forEach(test => extractInfo(test)))

fs.readFile('./boardingPasses.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);
    // console.log(data)
    data.split('\n').forEach(passport => extractInfo(passport))
    console.log(highestID)
})


