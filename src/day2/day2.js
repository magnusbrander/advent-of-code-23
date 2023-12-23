import { getSum } from "../util.js";

/**
 *
 * @param {string[]} rows
 * @returns {string[]}
 */
function getResultDay2(rows) {
  const games = getGamesByRows(rows);
  const resultPart1 = getResultPart1(games);
  const resultPart2 = getResultPart2(games);
  return [resultPart1, resultPart2];
}

/**
 *
 * @param {Game[]} games
 * @returns {string}
 */
function getResultPart1(games) {
  // 12 red cubes, 13 green cubes, and 14 blue cubes.
  /** @type {number[]} */
  const validGameIds = [];
  for (const game of games) {
    if (validGame(game)) {
      validGameIds.push(game.id);
    }
  }
  const idSum = getSum(validGameIds);
  return String(idSum);
}

/**
 *
 * @param {Game[]} games
 * @returns {string}
 */
function getResultPart2(games) {
  /** @type {number[]} */
  const minCountPowers = [];
  for (const game of games) {
    const minCountPower = getMinCountPowerByGame(game);
    minCountPowers.push(minCountPower);
  }
  return String(getSum(minCountPowers));
}

/**
 *
 * @param {Game} game
 * @returns {number}
 */
function getMinCountPowerByGame(game) {
  /** @type {Map<Color, number>} */
  const colorToMinCount = new Map();
  for (const round of game.rounds) {
    for (const [color, count] of round) {
      const currentCount = colorToMinCount.get(color) ?? 0;
      if (currentCount < count) {
        colorToMinCount.set(color, count);
      }
    }
  }
  if (colorToMinCount.size === 0) {
    console.error("Invalid game", game);
    return NaN;
  }
  const values = Array.from(colorToMinCount.values());
  let power = values[0];
  for (let i = 1; i < values.length; i++) {
    power = power * values[i];
  }
  return power;
}

/**
 *
 * @param {Game} game
 * @returns {boolean}
 */
function validGame(game) {
  for (const round of game.rounds) {
    const nbrRed = round.get("red") ?? 0;
    if (nbrRed > 12) {
      return false;
    }
    const nbrGreen = round.get("green") ?? 0;
    if (nbrGreen > 13) {
      return false;
    }
    const nbrBlue = round.get("blue") ?? 0;
    if (nbrBlue > 14) {
      return false;
    }
  }
  return true;
}

/**
 *
 * @param {string[]} rows
 * @returns {Game[]}
 */
function getGamesByRows(rows) {
  /** @type {Game[]} */
  const games = [];
  for (const row of rows) {
    const game = new Game(row);
    games.push(game);
  }
  return games;
}

const gameIdRegExp = /\s*Game\s*(\d*)\s*/;

/**
 * @typedef {string} Color
 */

class Game {
  /** @type {number} */
  id;
  /** @type {Map<Color, number>[]} */
  rounds;

  /**
   *
   * @param {string} row
   */
  constructor(row) {
    const parts = row.split(":");
    const part1 = parts[0].trim();
    const part2 = parts[1].trim();
    const matches = /** @type {RegExpExecArray} */ (gameIdRegExp.exec(part1));
    this.id = Number(matches[1]);
    const roundStrings = part2.split(";");
    /** @type {Map<Color, number>[]} */
    const rounds = [];
    for (const roundString of roundStrings) {
      /** @type {Map<Color, number>} */
      const round = new Map();
      const numberColorStrings = roundString.split(",");
      for (const numberColorString of numberColorStrings) {
        const numberAndColor = numberColorString.trim().split(" ");
        const number = Number(numberAndColor[0]);
        const color = numberAndColor[1];
        round.set(color, number);
      }
      rounds.push(round);
    }
    this.rounds = rounds;
  }
}

export { getResultDay2 };
