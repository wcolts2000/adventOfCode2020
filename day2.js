// part 1
const fs = require('fs');

// fs.readFile('./passwords.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     let counter = 0;
//     let lines = data.split('\n')
//     let passwords = lines.join(' ').split(' ');
//     for (let i = 0; i < passwords.length - 3; i += 3) {
//         let bounds = passwords[i].split('-');
//         let letter = passwords[i+1][0];
//         let pw = passwords[i+2];
//         let counts = countChars(pw);

//         if (counts[letter] >= +bounds[0] && counts[letter] <= +bounds[1]) {
//             counter++;
//         }
//     }
//     return counter; 
// });

function countChars(word) {
    const counts = {};
    for (let char of word) {
        counts[char] ? counts[char]++ : counts[char] = 1
    }
    return counts;
};

// part 2
fs.readFile('./passwords.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let counter = 0;
    let lines = data.split('\n')
    let passwords = lines.join(' ').split(' ');
    for (let i = 0; i < passwords.length - 3; i += 3) {
        let pos = passwords[i].split('-');
        let letter = passwords[i+1][0];
        let pw = passwords[i+2];
        if ((pw[pos[0] - 1] === letter && pw[pos[1] - 1] !== letter) || (pw[pos[0] - 1] !== letter && pw[pos[1] - 1] === letter)) {
            counter++;
        }
    }
    return counter; 
});