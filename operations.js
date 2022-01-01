function makeNumArray(numString) {
    let numArray = [];
    for (let char of numString.split(',')) {
        numArray.push(+char);
    }
    return numArray;
}

function checkForNums(numString) {
    for (let char of numString.split(',')) {
        if (isNaN(+char)) return char;
    }
}

function getMean(numString) {
    let numArray = makeNumArray(numString);
    let sum = 0;
    for (let num of numArray) {
        sum += num;
    }
    return sum / numArray.length;
}

function getMedian(numString) {
    let numArray = makeNumArray(numString);

    numArray.sort((a, b) =>  a - b );
      let half = Math.floor(numArray.length / 2);
      if (numArray.length % 2) return numArray[half];
      return (numArray[half - 1] + numArray[half]) / 2.0;
}

function getMode(numString) {
    let charArray = numString.split(',');
    let charCounts = {};
    let modes = [];
    let frequency = 0;

    // list counts for each number in query string
    for (let char of charArray) {
        if (charCounts[char]) {
            charCounts[char] += 1;
        } else {
            charCounts[char] = 1;
        }
    }
    // determine the highest frequency for a number in the string
    for (let [char, count] of Object.entries(charCounts)) {
        if (count > frequency) {
            frequency = count;
        } 
    }
    // add numbers with the highest frequency to modes array
    for (let [char, count] of Object.entries(charCounts)) {
        if (count === frequency) {
            modes.push(char)
        }
    }
    return(modes)
}

module.exports = { makeNumArray:makeNumArray,
                   checkForNums:checkForNums,
                   getMean:getMean,
                   getMedian:getMedian,
                   getMode:getMode }