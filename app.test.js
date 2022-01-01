const { query } = require('express');
const { makeNumArray, checkForNums, getMean, getMedian, getMode} = 
    require('./operations');

let queryString = '1,3,5,7,7';

test ('makeNumArray should convert string to array of numbers', function() {
    expect(makeNumArray(queryString)).toEqual([1,3,5,7,7]);
})

test ('checkForNums should return item if item in string is NaN', function() {
    expect(checkForNums(queryString)).toBeUndefined();
    let badQueryString = queryString.concat(',dog');
    expect(checkForNums(badQueryString)).toEqual('dog');
})

test ('getMean should accurately calculate mean', function() {
    expect(getMean(queryString)).toEqual(4.6);
    expect(getMean('1,3,5,-7,-7')).toEqual(-1);
    expect(getMean('0')).toEqual(0);
})

test ('getMedian should accurately calculate median', function() {
    expect(getMedian(queryString)).toEqual(5);
    expect(getMedian('1,3,5,7')).toEqual(4);
    expect(getMedian('1,3,7,7,5')).toEqual(5);
    expect(getMedian('0')).toEqual(0);
})

test ('getMode should select most frequent item', function() {
    expect(getMode(queryString)).toEqual(['7']);
    expect(getMode('1,2,3,4')).toEqual(['1','2','3','4']);
    expect(getMode('1,dog,dog')).toEqual(['dog']);
})