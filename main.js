import { readFileRows } from "./readfilerows.js";
import { getResultDay1 } from "./day1.js";
import { printResult } from "./util.js";

console.log("-------------------- ");
console.log("Solving all puzzles!");
console.log("--------------------\n");
console.time("Total solution time");

// Day 1
const rowsDay1 = readFileRows("./day1.txt");
const resultDay1 = getResultDay1(rowsDay1);
printResult(resultDay1, 1);

console.timeEnd("Total solution time");
