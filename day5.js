// part 1
const fs = require('fs');
const rows = 127;
const columns = 7;
const decoder = {
    F: 'lower',
    B: 'upper',
    L: 'lower',
    R: 'upper'
};
const ids = [];

let highestID = 0;

function extractInfo(str) {
    const rowPosition = str.slice(0,7);
    const colPosition = str.slice(-3);
    const row = findRow(rowPosition);
    const column = findColumn(colPosition);
    const id = findId(row, column);

    ids.push(id);

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

// fs.readFile('./boardingPasses.txt', 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     // console.log(data)
//     data.split('\n').forEach(passport => extractInfo(passport))
//     console.log(highestID)
// })

// part 2
fs.readFile('./boardingPasses.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);
    data.split('\n').forEach(passport => extractInfo(passport));
    ids.sort((a,b) => a - b);
    for (let i = 0; i < ids.length; i++) {
        if (ids[i] + 2 === ids[i + 1]) {
            console.log(ids[i] + 1) // 717
            return ids[i] + 1
        }
    }
    console.log(highestID) // 913
})
