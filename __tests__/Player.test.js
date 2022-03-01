const { toBindingIdentifierName } = require("@babel/types");
const { expect } = require("@jest/globals");
const Player = require("../lib/Player.js");

it("creates a player object", () => {
  const player = new Player("Dave");

  expect(player.name).toBe("Dave");
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));
});
