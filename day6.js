const fs = require('fs');
// part 1
// fs.readFile('./customsDeclairationForms.txt', 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     let sum = 0;
//     data
//         .split('\n\n')
//         .forEach(groupStr => {
//             groupStr = groupStr.replace(/\n/g, '');
//             const unique = new Set()
//             for(let i = 0; i < groupStr.length; i++) {
//                 unique.add(groupStr[i])
//             }
//             sum += unique.size
//         });
//     console.log(sum);
//     })
// part 2
fs.readFile('./customsDeclairationForms.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);
    let sum = 0;
    data
        .split('\n\n')
        .forEach(groupStr => {
            const individuals = groupStr.split('\n');
            const sets = []
            individuals.forEach((str) => {
                const unique = new Set()                
                for(let i = 0; i < str.length; i++) {
                    unique.add(str[i])
                }
                sets.push(unique)
            })
            const everyoneSaidYes = []
            sets.sort(((a,b) => b.size - a.size));
            sets[0].forEach(answer => {
                let inAll = true;
                for(let i = 1; i < sets.length; i++) {
                    if(!sets[i].has(answer)) inAll = false
                }
                if(inAll) {
                    everyoneSaidYes.push(answer)
                }
            })
            sum += everyoneSaidYes.length
        });
    console.log(sum);
    })