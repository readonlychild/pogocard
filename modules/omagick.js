var execSync = require('child_process').execSync;

var omagick = {
  convert: function (command) {
    var cmd = 'convert';
    var result = execSync(cmd + ' ' + command, { stdio: 'pipe' });

    return result;
  },
  loadImage: function (imgSrc, resize, geom, args, options) {
    args.push('\\(');
    args.push(imgSrc);
    if (resize) {
      args.push('-resize');
      args.push(resize);
    }
    args.push('-geometry');
    args.push(geom);
    if (options && options.flop) {
      args.push('-flop');
    }
    if (options && options.grayscale) {
      args.push('-colorspace gray');
    }
    if (options && options.opacity) {
      args.push(`-fill white -colorize ${options.opacity}%`);
    }
    args.push('\\)');
    args.push('-composite');
  },
  annotate: function (text, geom, args, pxSize, options) {
    /*
    options {
      font { name }
      fill { color }
    }
    */
    if (options) {
      if (options.font) {
        args.push('-font');
        args.push(options.font.name);
      }
      if (options.fill) {
        this._fill(options.fill.color, args);
      }
    }
    if (pxSize) {
      this._pointsize(pxSize, args);
    }
    args.push('-annotate');
    args.push(geom);
    args.push('"' + text + '"');
  },
  rect: function (fillColor, x, y, w, h, args) {
    w += x;
    h += y;
    this._fill(fillColor, args);
    args.push('-draw');
    args.push(`"rectangle ${x},${y} ${w},${h}"`);
  },
  _pointsize: function (px, args) {
    args.push('-pointsize');
    args.push('' + px);
  },
  _fill: function (fillColor, args) {
    args.push('-fill');
    args.push(`"${fillColor}"`);
  }
};

module.exports = omagick;
