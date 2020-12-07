const fs = require('fs');
fs.readFile('./bagRules.txt', 'utf-8', (err, data) => {
    if(err) console.log(err);
    const targetBag = 'shiny gold bag';
    const outerBags = new Set();
    const firstSet = new Set();
    const sets = [outerBags, firstSet];
    let toggle = true;
    const rules = data
        .split('\n')
        .map((rule) => {
            const keyVal = rule.split(' contain ');
            keyVal[1].includes(targetBag)
        if (rule.split(' contain ')[1].includes(targetBag)) {
            outerBags.add(keyVal[0]);
        }
        return rule.split(' contain ');;
    });
    console.log(outerBags.size)
    function checkRules() {
        sets[+!toggle].forEach(key => {
            rules.forEach(rule => {
                if (rule[1].includes(key.replace(' bags', ''))) {
                    sets[+toggle].add(rule[0]);
                    sets[+toggle].add(key);
                }
            })
        })
    }
    let keepGoing = true;
    while(keepGoing) {
        if (sets[0].size === sets[1].size) keepGoing = false;
        checkRules();
        toggle = !toggle;
    }
    console.log(sets[0].size, sets[1].size)
}
