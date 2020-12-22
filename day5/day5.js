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

const boarding = () => {
  const seatCodes = tickets().map(ticket => {
    return ticket.code;
  })
  return Math.max(...seatCodes)
}
// 1015 too high
console.log(boarding())