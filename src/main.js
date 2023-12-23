import { readFileRows } from "./readfilerows.js";
import { getResultDay1 } from "./day1/day1.js";
import { printResults } from "./util.js";
import { getResultDay2 } from "./day2/day2.js";

console.log("-------------------- ");
console.log("Solving all puzzles!");
console.log("--------------------\n");
console.time("Total solution time");

// Day 1
const rowsDay1 = readFileRows("./src/day1/day1.txt");
const resultsDay1 = getResultDay1(rowsDay1);
printResults(resultsDay1, 1);

// Day 2
const rowsDay2 = readFileRows("./src/day2/day2.txt");
const resultsDay2 = getResultDay2(rowsDay2);
printResults(resultsDay2, 2);

console.timeEnd("Total solution time");
