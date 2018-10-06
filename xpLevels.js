var xpLevels = {
  levels: [
    0,1000,3000,6000,10000,15000,21000,28000,36000,45000,
    55000,65000,75000,85000,100000,120000,140000,160000,185000,210000,
    260000,335000,435000,560000,710000,900000,1100000,1350000,1650000,2000000,
    2500000,3000000,3750000,4750000,6000000,7500000,9500000,12000000,15000000,20000000
  ],
  getLevelFromXp: function (xp) {
    var lvl = 0;
    while (xp >= this.levels[lvl]) {
      lvl += 1;
    }
    return lvl;
  },
  getLevelFromXpCycle: function (xp) {
    var lvl = 0;
    var cycles = 0;
    var cycleamt = 20000000;
    while (xp > cycleamt) {
      xp -= cycleamt;
      cycles += 1;
    }
    while (xp >= this.levels[lvl]) {
      lvl += 1;
    }
    return lvl + (cycles * 40);
  },
  getCurrentLevelRange: function (xp) {
    var lvl = this.getLevelFromXp(xp);
    if (lvl === 100) {
      return {
        min: this.levels[99],
        max: 19999999999999999,
        required: 19999999999999999 - this.levels[99]
      };
    }
    return {
      min: this.levels[lvl-1],
      max: this.levels[lvl],
      required: this.levels[lvl] - this.levels[lvl-1]
    };
  }
};

module.exports = xpLevels;
