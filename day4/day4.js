const input = require('./input');

class PassportProcessor1 {
  constructor (passport) {
    this.passport = passport;
    this.byr = passport.byr || false
    this.iyr = passport.iyr || false
    this.eyr = passport.eyr || false
    this.hgt = passport.hgt || false
    this.hcl = passport.hcl || false
    this.ecl = passport.ecl || false
    this.pid = passport.pid || false
  }

  validate () {
    return !Object.values(this).includes(false);
  }
}

class PassportProcessor2 extends PassportProcessor1 {
  constructor (passport) {
    super(passport)
    this.byr = (Number(passport.byr) >= 1920 && Number(passport.byr) <= 2002) || false;
    this.iyr = (Number(passport.iyr) >= 2010 && Number(passport.iyr) <= 2020) || false;
    this.eyr = (Number(passport.eyr) >= 2020 && Number(passport.eyr) <= 2030) || false;
    this.hgt = !!passport.hgt ? this.validateHeight(passport.hgt) : false;
    this.hcl = !!passport.hcl ? this.validateHair(passport.hcl) : false;
    this.ecl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl);
    this.pid = !!passport.pid ? this.validateId(passport.pid) : false;
    this.validateHeight = this.validateHeight.bind(this);
    this.validateHair = this.validateHair.bind(this);
    this.validateId = this.validateId.bind(this);
  }

  validateHeight = (hgt) => {
    if (hgt.includes('cm')){
      const [val, _unit] = hgt.split('cm');
      return (val >= 150 && val <= 193);
    } else if (hgt.includes('in')){
      const [val, _unit] = hgt.split('in');
      return (val >= 59 && val <= 76);
    } else {
      return false;
    }
  }
  validateHair = (color) => {
    const regex = /#\w?[a-f0-9]{6}/g;
    const matches = color.match(regex);
    return matches ? matches[0].length - color.length === 0 : false;
  }

  validateId = (id) => {
    const regex = /[0-9]{9}/g;
    const matches = id.match(regex);
    return matches ? matches[0].length - id.length === 0 : false;
  }
}

const parsePassports = () => {
  const passportList = input.split('\n\n')
    .map((passport) => {
      const passportObj = {};

      passport.replace(/\n/gi, ' ')
      .split(' ')
      .sort()
      .forEach((item) => {
        const line = item.split(':');
        passportObj[line[0]] = line[1];
      });

      return passportObj;
    });

  return passportList;
}

const passportProcessing = () => {
  const passports = parsePassports();

  return passports.map(passport => {
    const processor = new PassportProcessor2(passport);
    return processor.validate();
  }).filter(x => x).length;
}

console.log(passportProcessing())
