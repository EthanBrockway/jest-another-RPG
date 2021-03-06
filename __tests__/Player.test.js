const { toBindingIdentifierName } = require("@babel/types");
const { expect } = require("@jest/globals");
const Player = require("../lib/Player.js");
const Potion = require("../lib/Potion");

jest.mock("../lib/Potion");

it("creates a player object", () => {
  const player = new Player("Dave");

  expect(player.name).toBe("Dave");
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));
  expect(player.inventory).toEqual(
    expect.arrayContaining([expect.any(Object)])
  );
});
it("gets player's stats as an object", () => {
  const player = new Player("dave");

  expect(player.getStats()).toHaveProperty("potions");
  expect(player.getStats()).toHaveProperty("health");
  expect(player.getStats()).toHaveProperty("strength");
  expect(player.getStats()).toHaveProperty("agility");
});
it("gets inventory from player or returns false", () => {
  const player = new Player("dave");

  expect(player.getInventory()).toEqual(expect.any(Array));

  player.inventory = [];

  expect(player.getInventory()).toEqual(false);
});
it("gets player's health value", () => {
  const player = new Player("Dave");

  expect(player.getHealth()).toEqual(
    expect.stringContaining(player.health.toString())
  );
});
it("Checks if player is alive or not", () => {
  const player = new Player("Dave");

  expect(player.isAlive()).toBeTruthy();

  player.health = 0;

  expect(player.isAlive()).toBeFalsy();
});
it("subtracts from player's health", () => {
  const player = new Player("Dave");
  const oldHealth = player.health;

  player.reduceHealth(5);

  expect(player.health).toBe(oldHealth - 5);

  player.reduceHealth(99999);

  expect(player.health).toBe(0);
});
it("gets player's attack value", () => {
  const player = new Player("dave");
  player.strength = 10;

  expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

it("adds a potion to the inventory", () => {
  const player = new Player("dave");
  const oldCount = player.inventory.length;

  player.addPotion(new Potion());
  expect(player.inventory.length).toBeGreaterThan(oldCount);
});
it("uses a potion from inventory", () => {
  const player = new Player("Dave");
  player.inventory = [new Potion(), new Potion(), new Potion()];
  const oldCount = player.inventory.length;

  player.usePotion(1);
  expect(player.inventory.length).toBeLessThan(oldCount);
});
