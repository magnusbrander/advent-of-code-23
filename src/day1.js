/** 

--- Day 1: Trebuchet?! ---
Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.

You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").

As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet

In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?

--- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?

*/

/**
 *
 * @param {string[]} rows
 * @returns {string[]}
 */
function getResultDay1(rows) {
  const part1 = getResultPart1(rows);
  const part2 = getResultPart2(rows);
  return [part1, part2];
}

/** @type {string[]} */
const possibleCharDigits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

/** @type {string[]} */
const possibleTextDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

/**
 *
 * @param {string[]} rows
 * @returns {string}
 */
function getResultPart1(rows) {
  let sum = 0;
  for (const row of rows) {
    const firstMatch = getFirstDigitMatch(row, possibleCharDigits);
    const lastMatch = getLastDigitIndex(row, possibleCharDigits);
    if (firstMatch === null || lastMatch === null) {
      continue;
    }
    const firstDigit = firstMatch.digitIndex + 1;
    const lastDigit = lastMatch.digitIndex + 1;
    const calibration = firstDigit * 10 + lastDigit;
    sum += calibration;
  }
  return String(sum);
}

/**
 *
 * @param {string[]} rows
 * @returns {string}
 */
function getResultPart2(rows) {
  let sum = 0;
  for (const row of rows) {
    const firstCharDigitMatch = getFirstDigitMatch(row, possibleCharDigits);
    const firstTextDigitMatch = getFirstDigitMatch(row, possibleTextDigits);
    const lastCharDigitMatch = getLastDigitIndex(row, possibleCharDigits);
    const lastTextDigitMatch = getLastDigitIndex(row, possibleTextDigits);
    const firstMatch = getFirstMatch(firstCharDigitMatch, firstTextDigitMatch);
    const lastMatch = getLastMatch(lastCharDigitMatch, lastTextDigitMatch);
    if (firstMatch === null || lastMatch === null) {
      continue;
    }
    const firstDigit = firstMatch.digitIndex + 1;
    const lastDigit = lastMatch.digitIndex + 1;
    const calibration = firstDigit * 10 + lastDigit;
    sum += calibration;
  }
  return String(sum);
}

/**
 * @typedef {{digitIndex: number, matchIndex: number}} Match
 */

/**
 *
 * @param {string} txt
 * @param {string[]} digitStrings
 * @returns {Match|null}
 */
function getFirstDigitMatch(txt, digitStrings) {
  /** @type {Match|null} */
  let firstMatch = null;
  for (let digitIndex = 0; digitIndex < digitStrings.length; digitIndex++) {
    const digitString = digitStrings[digitIndex];
    const matchIndex = txt.indexOf(digitString);
    if (matchIndex === -1) {
      continue;
    }
    if (firstMatch === null) {
      firstMatch = { digitIndex, matchIndex };
    } else if (firstMatch.matchIndex > matchIndex) {
      firstMatch = { digitIndex, matchIndex };
    }
  }
  return firstMatch;
}

/**
 *
 * @param {string} txt
 * @param {string[]} digitStrings
 * @returns {Match|null}
 */
function getLastDigitIndex(txt, digitStrings) {
  /** @type {Match|null} */
  let lastMatch = null;
  for (let digitIndex = 0; digitIndex < digitStrings.length; digitIndex++) {
    const digitString = digitStrings[digitIndex];
    const matchIndex = txt.lastIndexOf(digitString);
    if (matchIndex === -1) {
      continue;
    }
    if (lastMatch === null) {
      lastMatch = { digitIndex, matchIndex };
    } else if (lastMatch.matchIndex < matchIndex) {
      lastMatch = { digitIndex, matchIndex };
    }
  }
  return lastMatch;
}

/**
 *
 * @param {Match|null} match1
 * @param {Match|null} match2
 * @returns {Match|null}
 */
function getFirstMatch(match1, match2) {
  if (match1 === null) {
    return match2;
  }
  if (match2 === null) {
    return match1;
  }
  return match1.matchIndex < match2.matchIndex ? match1 : match2;
}

/**
 *
 * @param {Match|null} match1
 * @param {Match|null} match2
 * @returns {Match|null}
 */
function getLastMatch(match1, match2) {
  if (match1 === null) {
    return match2;
  }
  if (match2 === null) {
    return match1;
  }
  return match1.matchIndex > match2.matchIndex ? match1 : match2;
}

export { getResultDay1 };
