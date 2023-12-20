/**
 *
 * @param {string[]} results
 * @param {number} day
 */
function printResults(results, day) {
  console.log("\n");
  for (let i = 0; i < results.length; i++) {
    console.log(`The solution to day ${day}, part ${i + 1} is: `, results[i]);
  }
  console.log("\n");
}

export { printResults };
