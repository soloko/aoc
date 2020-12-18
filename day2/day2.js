const input = require('./input');

class Rule1 {
	constructor (range, char, str) {
		this.min = range[0]
		this.max = range[1]
		this.char = char
		this.str = str
	}
	validate () {
		const count = this.str.split('').reduce((accum, val) => {
			if (val === this.char){
				return accum + 1;
			} else {
				return accum;
			}
		}, 0);

		if (count >= this.min && count <= this.max){
			return true;
		} else {
			return false;
		}
	} 
}

class Rule2 {
	constructor (indexes, char, str) {
		this.isChar1 = str[indexes[0] - 1] === char;
		this.isChar2 = str[indexes[1] - 1] === char;
		this.char = char;
		this.str = str;
	}
	validate () {
		return this.isChar1 !== this.isChar2;
	}
}

const linesParser = () => {
  return input.split('\n').map((line) => {
    const lineArr = line.split(' ');
    
    let range = lineArr.shift()
    range = range.split('-')

    let char = lineArr.shift();
    char = char[0];

    const str = lineArr.shift();
    
    return { range, char, str };
  })
};


const getPart1 = (item) => {
  let total = 0;

  linesParser().forEach((item) => {
    const currentRule = new Rule1(item.range, item.char, item.str);

    if (currentRule.validate() === true) {
      total++;
    }
  });

  return total;
}

const getPart2 = (item) => {
  let total = 0

  linesParser().forEach((item) => {
    const currentRule = new Rule2(item.range, item.char, item.str);

    if (currentRule.validate() === true) {
      total++;
    }
  });

  return total;
}


console.log(getPart1());
console.log(getPart2());



