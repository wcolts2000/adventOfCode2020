const fs = require('fs');
// part 1
fs.readFile('./customsDeclairationForms.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);
    let sum = 0;
    data
        .split('\n\n')
        .forEach(groupStr => {
            groupStr = groupStr.replace(/\n/g, '');
            const unique = new Set()
            for(let i = 0; i < groupStr.length; i++) {
                unique.add(groupStr[i])
            }
            sum += unique.size
        });
    console.log(sum);
    })