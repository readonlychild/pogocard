const xpLevels = require('./xpLevels.js');

var survey = {
  medalRanks: {
    kanto: { bronze: 5, silver: 50, gold: 100 }, 
    johto: { bronze: 5, silver: 30, gold: 70 }, 
    hoenn: { bronze: 5, silver: 40, gold: 90 }, 
    collector: { bronze: 30, silver: 500, gold: 2000 },
    scientist: { bronze: 3, silver: 20, gold: 200 },
    backpacker: { bronze: 100, silver: 1000, gold: 2000 },
    battlegirl: { bronze: 10, silver: 100, gold: 1000 },
    berrymaster: { bronze: 10, silver: 100, gold: 1000 },
    gymleader: { bronze: 10, silver: 100, gold: 1000 },
    acetrainer: { bronze: 10, silver: 100, gold: 1000 },
    jogger: { bronze: 10, silver: 100, gold: 1000 },
    breeder: { bronze: 10, silver: 100, gold: 500 },
    youngster: { bronze: 3, silver: 50, gold: 300 },
    fisherman: { bronze: 3, silver: 50, gold: 300 },
    pikachufan: { bronze: 3, silver: 50, gold: 300 },
    champion: { bronze: 10, silver: 100, gold: 1000 },
    battlelegend: { bronze: 10, silver: 100, gold: 1000 },
    unown: { bronze: 3, silver: 10, gold: 26 },
    ranger: { bronze: 10, silver: 100, gold: 1000 },
    idol: { bronze: 1, silver: 2, gold: 3 },
    gentleman: { bronze: 10, silver: 100, gold: 1000 },
    pilot: { bronze: 1000, silver: 10000, gold: 1000000 },

    schoolkid: { bronze: 10, silver: 50, gold: 200 },
    blackbelt: { bronze: 10, silver: 50, gold: 200 },
    birdkeeper: { bronze: 10, silver: 50, gold: 200 },
    punkgirl: { bronze: 10, silver: 50, gold: 200 },
    ruinmaniac: { bronze: 10, silver: 50, gold: 200 },
    hiker: { bronze: 10, silver: 50, gold: 200 },
    bugcatcher: { bronze: 10, silver: 50, gold: 200 },
    hexmaniac: { bronze: 10, silver: 50, gold: 200 },
    depotagent: { bronze: 10, silver: 50, gold: 200 },
    kindler: { bronze: 10, silver: 50, gold: 200 },
    swimmer: { bronze: 10, silver: 50, gold: 200 },
    gardener: { bronze: 10, silver: 50, gold: 200 },
    rocker: { bronze: 10, silver: 50, gold: 200 },
    psychic: { bronze: 10, silver: 50, gold: 200 },
    skier: { bronze: 10, silver: 50, gold: 200 },
    dragontamer: { bronze: 10, silver: 50, gold: 200 },
    delinquent: { bronze: 10, silver: 50, gold: 200 },
    fairytalegirl: { bronze: 10, silver: 50, gold: 200 },

    over3000: { bronze: 10, silver: 20, gold: 50 },
    over3400: { bronze: 10, silver: 20, gold: 50 },
    gymbadges: { bronze: 10, silver: 120, gold: 750 },
    goldgyms: { bronze: 3, silver: 30, gold: 300 },
    hundos: { bronze: 3, silver: 30, gold: 300 },
    shinies: { bronze: 3, silver: 30, gold: 300 },
    luckies: { bronze: 3, silver: 30, gold: 300 },

    getMedal: function (name, value) {
      var imgname = `${name}_shadow.png`;
      if (value >= this[name].bronze) imgname = `${name}_Bronze.png`;
      if (value >= this[name].silver) imgname = `${name}_Silver.png`;
      if (value >= this[name].gold) imgname = `${name}_Gold.png`;
      return './assets/medals/' + imgname;
    },
    getMedalTarget: function (name, value) {
      var k = 1999;
      if (this[name] && value <= this[name].gold) k = this[name].gold;
      if (this[name] && value <= this[name].silver) k = this[name].silver;
      if (this[name] && value <= this[name].bronze) k = this[name].bronze;
      if (this[name] && value >  this[name].gold) k = 0;
      return k;
    }
  }
};

module.exports = survey;
