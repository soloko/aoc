const input = require('./input');


class Ticket {
  constructor (ticket){
    this.ticket = ticket;
    this.code = this.getCode();
  }

  getCode () {
    const binary = this.ticket.map(x => {
      if (x === 'F' || x === 'L') {
        return 0;
      } if (x === 'B' || x === 'R'){
        return 1;
      }
    }).join('');

    return parseInt(binary, 2);
  }
}


const tickets = () => {
  return input.split('\n').map((ticket) => {
    ticket = ticket.split('');
    return new Ticket(ticket);
  })
}

const boarding1 = () => {
  const seatCodes = tickets().map(ticket => {
    return ticket.code;
  });
  return Math.max(...seatCodes);
}

const boarding2 = () => {
  let seatCodes = tickets().map(ticket => {
    return ticket.code;
  });
  seatCodes = seatCodes.filter(code => {
    if (
      (seatCodes.includes(code + 1) && !seatCodes.includes(code - 1)) ||
      (!seatCodes.includes(code + 1) && seatCodes.includes(code - 1))
    ){
      return 1;
    } else {
      return 0;
    }
  }).sort();
  for (let i =0; i < seatCodes.length - 1; i++){
    if (seatCodes[i + 1] - seatCodes[i] === 2){
      return seatCodes[i] + 1;
    }
  }
  return -1;
}

console.log('Part 1: ', boarding1())
console.log('Part2: ', boarding2())