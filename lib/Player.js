const Potion = require("../lib/Potion");

function Player(name = "") {
  this.name = name;

  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);
  this.inventory = [new Potion("health"), new Potion()];

  Player.prototype.getStats = () => {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility,
    };
  };

  Player.prototype.getInventory = () => {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  };

  Player.prototype.getHealth = () => {
    return `${this.name}'s health is now ${this.health}!`;
  };

  Player.prototype.isAlive = () => {
    if (this.health === 0) {
      return false;
    }
    return true;
  };

  Player.prototype.reduceHealth = (health) => {
    this.health -= health;

    if (this.health < 0) {
      this.health = 0;
    }
  };
  Player.prototype.getAttackValue = () => {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
  };
  Player.prototype.addPotion = () => {
    this.inventory.push(Potion);
  };
  Player.prototype.usePotion = function (index) {
    const potion = this.getInventory().splice(index, 1)[0];

    switch (potion.name) {
      case "agility":
        this.agility += potion.value;
        break;
      case "health":
        this.health += potion.value;
        break;
      case "strength":
        this.strength += potion.value;
        break;
    }
  };
}
module.exports = Player;
