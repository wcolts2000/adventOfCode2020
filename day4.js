const fs = require('fs');

const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

let validCount = 0

fs.readFile('passports.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let passports = data.split('\n\n').map(entry => {
        return entry.replace(/\n/g, ' ').split(' ');         
    }).map(entry => {
        const obj = {};
        entry.forEach(keyVal => {
            const vals = keyVal.split(':');
            obj[vals[0]] = vals[1];
        })
        return obj
    })
    passports.forEach(entry => {
        let valid = true;
        requiredKeys.forEach(reqKey => {
            if (!entry.hasOwnProperty(reqKey)) {
                valid = false;
            }
        })
        if (valid) {
            validCount++
        }
    });
    console.log(validCount) // 202
});