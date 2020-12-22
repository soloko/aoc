const input = require('./input');

const reduceGroup = (group) => {
  const condensedGroup = new Set(group.split(''));
  condensedGroup.delete('\n');

  return condensedGroup;
}

const getGroups = () => {
  return input.split('\n\n').map((group) => {
    return group;
  });
}

const customCustoms1 = () => {
  return getGroups().map((group) => reduceGroup(group).size);
}

const getMatchCount = (group) => {
  const unique = reduceGroup(group);
  const groupByPerson = group.split('\n');

  unique.forEach((char) => {
    for (let i = 0; i < groupByPerson.length; i++){
      const person = groupByPerson[i];
      if (!person.includes(char)) {
        unique.delete(char);
      }
    }
  });

  return unique.size;
}

const customCustoms2 = () => {
  return getGroups().map((group) => getMatchCount(group));
}

const sum = (numArr) => {
  return numArr.reduce((accum, currentVal) => {
    return accum + currentVal;
  }, 0);
}

console.log(sum(customCustoms1()));
console.log(sum(customCustoms2()));