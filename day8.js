const fs = require('fs');
fs.readFile('./bootSequence.txt', 'utf-8', (err, data) => {
    if(err) console.log(err)
    
    let accumulator = 0;

    let position = 0;

    let positions = new Set();

    let keepGoing = true;

    const instructions = data.split('\n').map(rule => rule.split(' '));
    
    const bootSequenceOps = {
        acc,
        nop,
        jmp
    }
    
    function bootSequence(rules) {
        const [rule, value] = rules;
        return bootSequenceOps[rule](+value);
    }
    
    function acc(num) {
        accumulator = accumulator+= num; 
        return position++;
    }
    
    function nop(num) {
        return position++;
    }
    
    function jmp(num) {
        return position+= num;
    }

    function checkInstructions() {
        if (positions.has(position)) {
            return keepGoing = false
        };
    }
    
    while(keepGoing) {
        bootSequence(instructions[position])
        checkInstructions();
        positions.add(position);
    }
    console.log(accumulator)
});