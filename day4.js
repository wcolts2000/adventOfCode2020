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
            } else {
                if (!validate(reqKey, entry[reqKey])) {
                    valid = false;
                }
            }
        })
        if (valid) {
            validCount++
        }
    });
    console.log(validCount) //part 1 202 part 2 137
});

function validate(key, value) {
        if (key === 'byr') {
            return +value >= 1920 && +value <= 2002 && value.length === 4 ? true : false;
        } else if (key === 'iyr') {
            return +value >= 2010 && +value <= 2020 && value.length === 4 ? true : false;
        } else if (key === 'eyr') {
            return +value >= 2020 && +value <= 2030 && value.length === 4 ? true : false;
        } else if (key === 'hgt') {
            if (value.slice(-2) === "cm") {
                return +value.substr(0, value.length - 2) >= 150 && +value.substr(0, value.length - 2) <= 193 ? true : false;
            }
            if (value.slice(-2) === "in") {
                return +value.substr(0, value.length - 2) >= 59 && +value.substr(0, value.length - 2) <= 76 ? true : false;
            }
            return false
        } else if (key === 'hcl') {
            const regex = /^#([A-Fa-f0-9]{6})$/;
            return regex.test(value)
        } else if (key === 'ecl') {
            const colorEnum = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
            return colorEnum.includes(value);
        } else if (key === 'pid') {
            return value.length === 9 && !isNaN(+value) ? true : false;
        } else if (key === 'cid') {
            return true;
        }
}