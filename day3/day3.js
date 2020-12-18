const input = require('./input.js');


const lines = input.split('\n');

const sled = (slopeX, slopeY) => {
	let trees = 0;
	const rowLength = lines[0].length - 1

	for (x = slopeX, y = slopeY; y < lines.length; y += slopeY, x += slopeX){

		const position = lines[y][x] === '#';
		trees += position ? 1 : 0;

		if (x + slopeX > rowLength) {
			x = x - rowLength - 1;
		}
	}
	return trees;
}

const slopes = [[1,1], [3,1], [5,1], [7,1], [1, 2]]

const multiplyTrees = () => slopes.reduce((accum, slope) => {
	const [x, y] = slope

	return accum * sled(x, y);
}, 1)

console.log('Part 1: ', sled(3, 1))
console.log('Part 2: ', multiplyTrees())
