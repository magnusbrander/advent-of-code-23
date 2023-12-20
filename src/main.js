import { readFileRows } from "./readfilerows.js";
import { getResultDay1 } from "./day1.js";
import { printResults } from "./util.js";

console.log("-------------------- ");
console.log("Solving all puzzles!");
console.log("--------------------\n");
console.time("Total solution time");

// Day 1
const rowsDay1 = readFileRows("./src/day1.txt");
const resultsDay1 = getResultDay1(rowsDay1);
printResults(resultsDay1, 1);

console.timeEnd("Total solution time");
