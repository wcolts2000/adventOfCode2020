class Queue {
    #items = [];
    enqueue = (item) => this.#items.splice(0, 0, item);
    dequeue = () => this.#items.pop();
    isempty = () => this.#items.length === 0;
    empty = () => (this.#items.length = 0);
    size = () => this.#items.length;
}
const q = new Queue();
const fs = require('fs');
// part 1
// fs.readFile('./bagRules.txt', 'utf-8', (err, data) => {
//     if(err) console.log(err);
//     const targetBag = 'shiny gold bag';
//     const outerBags = new Set();
//     const firstSet = new Set();
//     const sets = [outerBags, firstSet];
//     let toggle = true;
//     const rules = data
//         .split('\n')
//         .map((rule) => {
//             const keyVal = rule.split(' contain ');
//             keyVal[1].includes(targetBag)
//         if (rule.split(' contain ')[1].includes(targetBag)) {
//             outerBags.add(keyVal[0]);
//         }
//         return rule.split(' contain ');;
//     });
//     console.log(outerBags.size)
//     function checkRules() {
//         sets[+!toggle].forEach(key => {
//             rules.forEach(rule => {
//                 if (rule[1].includes(key.replace(' bags', ''))) {
//                     sets[+toggle].add(rule[0]);
//                     sets[+toggle].add(key);
//                 }
//             })
//         })
//     }
//     let keepGoing = true;
//     while(keepGoing) {
//         if (sets[0].size === sets[1].size) keepGoing = false;
//         checkRules();
//         toggle = !toggle;
//     }
//     console.log(sets[0].size, sets[1].size)
// })

// part 2
fs.readFile('./bagRules.txt', 'utf-8', (err, data) => {
    if(err) console.log(err);
    const targetBag = 'shiny gold bag';
    const hashMap = {};
    const bagReg = / bag[s]?/g;
    const numReg = /[0-9]/g;
    const finalStr = 'no other';
    let count = 0;
    let initialBags;
    data
        .split('\n')
        .map((rule) => {
        if (rule.split(targetBag +'s contain ').length === 2) {
            initialBags = setBagObj(rule.split(targetBag +'s contain ')[1]);
        }
        rule = rule.split(' contain ')
        return hashMap[rule[0].replace(bagReg, '')] = setBagObj(rule[1]);
    });

    function setBagObj(ruleValue){
        const bagStats = {count: 0}
        ruleValue.split(', ').forEach(rule => {
            bagStats.count+= +rule.match(numReg);
            bagStats[rule.replace(numReg, '').replace(bagReg, '').replace('.', '').trim()] = +rule.match(numReg)
        });
        return bagStats;
    }

    function sumUpBags(bag, multiplier) {
        const innerBags = Object.entries(hashMap[bag]).slice(1);
        if (innerBags.length === 1 && innerBags[0][0] === finalStr) return;
        count += hashMap[bag].count * multiplier;
        return innerBags.forEach(innerBag => {
            q.enqueue([innerBag[0], multiplier * innerBag[1]]);
        });
    }

    q.enqueue(['shiny gold', 1]);
    let bag = q.dequeue();
    while(bag) {
        sumUpBags(bag[0], bag[1]);
        bag = q.dequeue();
    }
    console.log(count) // 5635
})
