'use strict';

const utils = require('./utils');
const magick = require('./modules/omagick.js');
const xpLevels = require('./xpLevels.js');
const survey = require('./survey.js');

module.exports.image = (event, context, callback) => {
  console.log(event);

  var imageData = false;
  event.queryStringParameters = event.queryStringParameters || {};

  var data = {
    "trainerName": event.queryStringParameters.tn || "trainerNA",
    "slogan": event.queryStringParameters.slogan || "",
    "team": event.queryStringParameters.team || "",
    "xp": event.queryStringParameters.xp || 1,
    "kanto": event.queryStringParameters.kanto || 0,
    "johto": event.queryStringParameters.johto || 0,
    "hoenn": event.queryStringParameters.hoenn || 0,
    "collector": event.queryStringParameters.collector || 0,
    "scientist": event.queryStringParameters.scientist || 0,
    "backpacker": event.queryStringParameters.backpacker || 0,
    "berrymaster": event.queryStringParameters.berrymaster || 0,
    "gymleader": event.queryStringParameters.gymleader || 0,
    "battlegirl": event.queryStringParameters.battlegirl || 0,
    "jogger": event.queryStringParameters.jogger || 0,
    "breeder": event.queryStringParameters.breeder || 0,
    "fisherman": event.queryStringParameters.fisherman || 0,
    "youngster": event.queryStringParameters.youngster || 0,
    "pikachufan": event.queryStringParameters.pikachufan || 0,
    "battlelegend": event.queryStringParameters.battlelegend || 0,
    "champion": event.queryStringParameters.champion || 0,
    "ranger": event.queryStringParameters.ranger || 0,
    "idol": event.queryStringParameters.idol || 0,
    "gentleman": event.queryStringParameters.gentleman || 0,
    "pilot": event.queryStringParameters.pilot || 0,
    "unown": event.queryStringParameters.unown || 0,
    "acetrainer": event.queryStringParameters.acetrainer || 0,

    "schoolkid": event.queryStringParameters.schoolkid || 0,
    "blackbelt": event.queryStringParameters.blackbelt || 0,
    "birdkeeper": event.queryStringParameters.birdkeeper || 0,
    "punkgirl": event.queryStringParameters.punkgirl || 0,
    "ruinmaniac": event.queryStringParameters.ruinmaniac || 0,
    "hiker": event.queryStringParameters.hiker || 0,
    "bugcatcher": event.queryStringParameters.bugcatcher || 0,
    "hexmaniac": event.queryStringParameters.hexmaniac || 0,
    "depotagent": event.queryStringParameters.depotagent || 0,
    "kindler": event.queryStringParameters.kindler || 0,
    "swimmer": event.queryStringParameters.swimmer || 0,
    "gardener": event.queryStringParameters.gardener || 0,
    "rocker": event.queryStringParameters.rocker || 0,
    "psychic": event.queryStringParameters.psychic || 0,
    "skier": event.queryStringParameters.skier || 0,
    "dragontamer": event.queryStringParameters.dragontamer || 0,
    "delinquent": event.queryStringParameters.delinquent || 0,
    "fairytalegirl": event.queryStringParameters.fairytalegirl || 0,

    "dust": event.queryStringParameters.dust || 0,

    "maxed": event.queryStringParameters.maxed || 0,
    "over3000": event.queryStringParameters.threekplus || 0,
    "over3400": event.queryStringParameters.threekplus4 || 0,
    "gymbadges": event.queryStringParameters.gymbadges || 0,
    "goldgyms": event.queryStringParameters.goldgyms || 0,
    "shinies": event.queryStringParameters.shiniesunique || 0,
    "hundos": event.queryStringParameters.hundosunique || 0,
    "luckies": event.queryStringParameters.luckiesunique || 0
  };

  console.log(data);

  var margs = [];
  margs.push(`-size 460x590`);
  margs.push('xc:transparent');
  magick.loadImage('./assets/profile/basic01.png', '420x590', '+0+0', margs);
  margs.push('-font ./arial.ttf');

  magick.annotate(data.trainerName, '+105+35', margs, 18);
  
  margs.push('-font ./consola.ttf');
  
  magick.annotate(data.slogan, '+55+52', margs, 11);

  // team logo
  var team = data.team;
  if (team) {
    if (team.toLowerCase() === 'valor') team = './assets/badges/teamValor.png';
    if (team.toLowerCase() === 'mystic') team = './assets/badges/teamMystic.png';
    if (team.toLowerCase() === 'instinct') team = './assets/badges/teamInstinct.png';
  }
  if (team) {
    magick.loadImage(team, '48x48', '+330+235', margs);
  }

  margs.push('-gravity NorthEast');

  var cardRightBorder = 40; // inverse northEast

  var xp = parseInt(data.xp);
  magick.annotate(xp.toLocaleString() + ' XP', `+${cardRightBorder+42}+294`, margs, 15);
  var level = xpLevels.getLevelFromXp(xp);
  var cycledlevel = xpLevels.getLevelFromXpCycle(xp);
  if (level === 40) {
    magick._fill('#777777', margs);
    magick.annotate(level.toString(), `+${cardRightBorder+30}+310`, margs, 78);
    magick._fill('#000000', margs);
  } else {
    magick.annotate(level.toString(), `+${cardRightBorder+30}+310`, margs, 78);
  }
  if (cycledlevel > 40) {
    magick.annotate(cycledlevel.toString(), `+${cardRightBorder+30}+344`, margs, 32);
  }

  magick._fill('#ffffff', margs);

  // medals-badges
  var pbadgeY = 70;
  var pbadgeX = 335 + cardRightBorder;
  var pbadges = [ 
    'kanto', 'johto', 'hoenn', 'collector', 'scientist', 'backpacker', 'berrymaster', 
    'gymleader', 'battlegirl', 'jogger', 'breeder', 'fisherman',
    'youngster', 'pikachufan', 'battlelegend', 'champion', 'ranger', 
    'idol', 'gentleman', 'pilot', 'unown', 'acetrainer'
  ];
  var pbadgesrowsize = 7;
  var pbadgek = -1;
  var cpbadgek = -1;
  var mvalue = 0;
  
  if (data) {
    pbadges.forEach((medal) => {
      pbadgek += 1;
      cpbadgek += 1;
      if (cpbadgek >= pbadgesrowsize) {
        cpbadgek -= pbadgesrowsize;
      }
      var xshift = 48 * cpbadgek;
      var yshift = 54 * Math.floor(pbadgek/pbadgesrowsize);
      if (data[medal]) {
        mvalue = parseInt(data[medal]);
        if (mvalue != 0) {
          magick.annotate(mvalue.toLocaleString(), `+${pbadgeX-xshift}+${pbadgeY+yshift+38}`, margs, 9);
        }
        magick.loadImage(survey.medalRanks.getMedal(medal, mvalue), '36x36', `+${pbadgeX-xshift}+${pbadgeY+yshift}`, margs);
      } else {
        magick.loadImage(survey.medalRanks.getMedal(medal, 0), '36x36', `+${pbadgeX-xshift}+${pbadgeY+yshift}`, margs);
      }
    });
  }


  // medals-poke-types
  var poketypemedalY = 10;
  var poketypemedalX = 2;
  var typemedals = [ 
    'schoolkid', 'birdkeeper', 'punkgirl', 'ruinmaniac', 'hiker', 'bugcatcher', 'hexmaniac', 'kindler', 'swimmer', 
    'gardener', 'rocker', 'psychic', 'skier', 'delinquent', 'fairytalegirl', 'blackbelt', 'depotagent', 'dragontamer'
  ];
  var typemedalk = -1;
  typemedals.forEach((medal) => {
    typemedalk += 1;
    var xshift = 0;
    var yshift = 32 * typemedalk;
    mvalue = parseInt(data[medal]);
    if (mvalue != 0) {
      //magick.annotate(mvalue.toLocaleString(), `+${poketypemedalX-xshift}+${poketypemedalY+yshift+32}`, margs, 9);
    }
    magick.loadImage(survey.medalRanks.getMedal(medal, mvalue), '30x30', `+${poketypemedalX-xshift}+${poketypemedalY+yshift}`, margs);
  });


  // custom medals
  var custommedalY = 500;
  var custommedalX = 371 + cardRightBorder;
  var custommedals = [ 
    'gymbadges', 'goldgyms', 'over3000', 'over3400', 'hundos', 'shinies', 'luckies'
  ];

  var custommedalk = -1;
  custommedals.forEach((medal) => {
    custommedalk += 1;
    var xshift = 48 * custommedalk;
    var yshift = 0;
    mvalue = parseInt(data[medal]);
    if (mvalue != 0) {
      var target = survey.medalRanks.getMedalTarget(medal, mvalue);
      if (target > 0) {
        magick._fill('#888888', margs);
        target = `/${target}`;
        magick.annotate(`${target}`, `+${custommedalX-xshift}+${custommedalY+yshift+38}`, margs, 9);
      } else {
        target = '';
      }
      target = utils.spaces(target.length);
      magick.annotate(`${mvalue.toLocaleString()}${target}`, `+${custommedalX-xshift}+${custommedalY+yshift+38}`, margs, 9);
    }
    magick.loadImage('' + survey.medalRanks.getMedal(medal, mvalue), '36x36', `+${custommedalX-xshift}+${custommedalY+yshift}`, margs);
  });

  margs.push('png:-');
  var icmd = margs.join(' ');
  console.log(icmd);
  var imageData = magick.convert(icmd);

  var contentType = 'image/png';
  callback(null, utils.apiBinaryResponse(contentType, imageData));

  ////////////////////

};
