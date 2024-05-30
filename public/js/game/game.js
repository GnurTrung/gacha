/* eslint-disable no-undef */
window.slotGame = window.slotGame || {};

(function (scope) {
  let Game = function () {
    this.init();
  };

  let p = Game.prototype;
  p.gameState = scope.GAME_STATE.IDLE;
  p.application = null;
  p.gameData = null;
  p.accountInfo = {};

  p.init = function () {
    this.joinGame();
  };

  p.joinGame = function () {
    AppSL.loader = new scope.Loader();
  };

  p.render = async function () {
    try {
      this.application = new PIXI.Application({
        backgroundAlpha: 0,
        width: 800,
        height: window.innerHeight,
        resolution: 1,
        // resizeTo: window,
        antialias: true,
      });
      this.application.ticker.minFPS = 60;
      this.application.x = 400;
      document.getElementById("game-slot")?.appendChild(this.application.view);
      this.mainContainer = new scope.Container();
      window.mainContainer = this.mainContainer;
      this.application.stage.addChild(this.mainContainer);
      this.application.stage.scale.set(0.8);
      this.bgGame = new scope.Item();
      this.bgGame.position.set(500, 550);
      this.mainContainer.addChild(this.bgGame);
      window.bgGame = this.bgGame;
      this.getAccountInfo();
    } catch (ex) {
      console.log(ex);
    }
  };

  p.spin = async function () {
    let that = this;
    const GAME_STATE = scope.GAME_STATE;
    try {
      that.gameState = GAME_STATE.PLAY;
      const { data: dataSpin } = await that.postData("", "/spin/", {
        inviteCode: refcode,
        bet: Number(AppSL.game.bgGame.betPoint.text),
      });
      const { code, data, jackpot, spinID } = dataSpin;
      if (code === 0) {
        await scope.reels.spin(dataSpin);
      } else {
        this.bgGame.showError(code);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  p.onStartSpin = async function () {
    let that = this;
    that.bgGame.onStartSpin();
  };

  p.onSpinComplete = async function (dataSpin) {
    return 1;
  };

  p.postData = async function (url, base = "/spin/", param) {
    const baseURL = scope.ConfigSL.API + base;
    const access_token = this.accessToken();
    const response = await fetch(baseURL + url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      body: JSON.stringify(param),
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  p.getData = async function (url, base = "/spin/") {
    const baseURL = scope.ConfigSL.API + base;
    const access_token = this.accessToken();
    const response = await fetch(baseURL + url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  p.accessToken = function (name = "access_token") {
    let cookie = {};
    document.cookie.split(";").forEach(function (el) {
      let [k, v] = el.split("=");
      cookie[k.trim()] = v;
    });
    return cookie[name];
  };

  scope.Game = Game;
})(window.slotGame);

(function (scope) {
  let CountUp = function () {};
  let p = CountUp.prototype;
  p.Init = function (target, startVal, endVal, decimals, duration, options) {
    // default options
    this.options = options || {
      useEasing: true, // toggle easing
      useGrouping: true, // 1,000,000 vs 1000000
      separator: ".", // character to use as a separator
      decimal: ".", // character to use as a decimal
    };

    // make sure requestAnimationFrame and cancelAnimationFrame are defined
    // polyfill for browsers without native support
    // by Opera engineer Erik Möller
    var lastTime = 0;
    var vendors = ["webkit", "moz", "ms"];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame =
        window[vendors[x] + "RequestAnimationFrame"];
      window.cancelAnimationFrame =
        window[vendors[x] + "CancelAnimationFrame"] ||
        window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }

    var self = this;

    this.d =
      typeof target === "string" ? document.getElementById(target) : target;
    this.startVal = Number(startVal);
    this.endVal = Number(endVal);
    this.countDown = this.startVal > this.endVal ? true : false;
    this.startTime = null;
    this.timestamp = null;
    this.remaining = null;
    this.frameVal = this.startVal;
    this.rAF = null;
    this.decimals = Math.max(0, decimals || 0);
    this.dec = Math.pow(10, this.decimals);
    this.duration = duration * 1000 || 2000;

    // Robert Penner's easeOutExpo
    this.easeOutExpo = function (t, b, c, d) {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
    };
    this.count = function (timestamp) {
      if (self.startTime === null) self.startTime = timestamp;

      self.timestamp = timestamp;

      var progress = timestamp - self.startTime;
      self.remaining = self.duration - progress;

      // to ease or not to ease
      if (self.options.useEasing) {
        if (self.countDown) {
          var i = self.easeOutExpo(
            progress,
            0,
            self.startVal - self.endVal,
            self.duration
          );
          self.frameVal = self.startVal - i;
        } else {
          self.frameVal = self.easeOutExpo(
            progress,
            self.startVal,
            self.endVal - self.startVal,
            self.duration
          );
        }
      } else {
        if (self.countDown) {
          var i = (self.startVal - self.endVal) * (progress / self.duration);
          self.frameVal = self.startVal - i;
        } else {
          self.frameVal =
            self.startVal +
            (self.endVal - self.startVal) * (progress / self.duration);
        }
      }

      // decimal
      self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;

      // don't go past endVal since progress can exceed duration in the last frame
      if (self.countDown) {
        self.frameVal =
          self.frameVal < self.endVal ? self.endVal : self.frameVal;
      } else {
        self.frameVal =
          self.frameVal > self.endVal ? self.endVal : self.frameVal;
      }

      // format and print value
      self.d.text = self.formatNumber(self.frameVal.toFixed(self.decimals));

      // whether to continue
      if (progress < self.duration) {
        self.rAF = requestAnimationFrame(self.count);
      } else {
        if (self.callback != null) self.callback();
      }
    };
    this.start = function (callback) {
      self.callback = callback;
      // make sure values are valid
      if (!isNaN(self.endVal) && !isNaN(self.startVal)) {
        self.rAF = requestAnimationFrame(self.count);
      } else {
        //console.log('countUp error: startVal or endVal is not a number');
        self.d.text = "--";
      }
      return false;
    };
    this.stop = function () {
      cancelAnimationFrame(self.rAF);
    };
    this.reset = function () {
      self.startTime = null;
      cancelAnimationFrame(self.rAF);
      self.d.text = self.formatNumber(self.startVal.toFixed(self.decimals));
    };
    this.resume = function () {
      self.startTime = null;
      self.duration = self.remaining;
      self.startVal = self.frameVal;
      requestAnimationFrame(self.count);
    };
    this.formatNumber = function (nStr) {
      nStr += "";
      var x, x1, x2, rgx;
      x = nStr.split(".");
      x1 = x[0];
      x2 = x.length > 1 ? self.options.decimal + x[1] : "";
      rgx = /(\d+)(\d{3})/;
      if (self.options.useGrouping) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, "$1" + self.options.separator + "$2");
        }
      }
      return x1 + x2;
    };

    // format startVal on initialization
    self.d.text = self.formatNumber(self.startVal.toFixed(self.decimals));
  };
  p.InitHTML = function (
    target,
    startVal,
    endVal,
    decimals,
    duration,
    options
  ) {
    // default options
    this.options = options || {
      useEasing: true, // toggle easing
      useGrouping: true, // 1,000,000 vs 1000000
      separator: ".", // character to use as a separator
      decimal: ".", // character to use as a decimal
    };

    // make sure requestAnimationFrame and cancelAnimationFrame are defined
    // polyfill for browsers without native support
    // by Opera engineer Erik Möller
    var lastTime = 0;
    var vendors = ["webkit", "moz", "ms"];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame =
        window[vendors[x] + "RequestAnimationFrame"];
      window.cancelAnimationFrame =
        window[vendors[x] + "CancelAnimationFrame"] ||
        window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }

    var self = this;

    this.d =
      typeof target === "string" ? document.getElementById(target) : target;
    this.startVal = Number(startVal);
    this.endVal = Number(endVal);
    this.countDown = this.startVal > this.endVal ? true : false;
    this.startTime = null;
    this.timestamp = null;
    this.remaining = null;
    this.frameVal = this.startVal;
    this.rAF = null;
    this.decimals = Math.max(0, decimals || 0);
    this.dec = Math.pow(10, this.decimals);
    this.duration = duration * 1000 || 2000;

    // Robert Penner's easeOutExpo
    this.easeOutExpo = function (t, b, c, d) {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
    };
    this.count = function (timestamp) {
      if (self.startTime === null) self.startTime = timestamp;

      self.timestamp = timestamp;

      var progress = timestamp - self.startTime;
      self.remaining = self.duration - progress;

      // to ease or not to ease
      if (self.options.useEasing) {
        if (self.countDown) {
          var i = self.easeOutExpo(
            progress,
            0,
            self.startVal - self.endVal,
            self.duration
          );
          self.frameVal = self.startVal - i;
        } else {
          self.frameVal = self.easeOutExpo(
            progress,
            self.startVal,
            self.endVal - self.startVal,
            self.duration
          );
        }
      } else {
        if (self.countDown) {
          var i = (self.startVal - self.endVal) * (progress / self.duration);
          self.frameVal = self.startVal - i;
        } else {
          self.frameVal =
            self.startVal +
            (self.endVal - self.startVal) * (progress / self.duration);
        }
      }

      // decimal
      self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;

      // don't go past endVal since progress can exceed duration in the last frame
      if (self.countDown) {
        self.frameVal =
          self.frameVal < self.endVal ? self.endVal : self.frameVal;
      } else {
        self.frameVal =
          self.frameVal > self.endVal ? self.endVal : self.frameVal;
      }

      // format and print value
      self.d.innerHTML = self.formatNumber(
        self.frameVal.toFixed(self.decimals)
      );

      // whether to continue
      if (progress < self.duration) {
        self.rAF = requestAnimationFrame(self.count);
      } else {
        if (self.callback != null) self.callback();
      }
    };
    this.start = function (callback) {
      self.callback = callback;
      // make sure values are valid
      if (!isNaN(self.endVal) && !isNaN(self.startVal)) {
        self.rAF = requestAnimationFrame(self.count);
      } else {
        //console.log('countUp error: startVal or endVal is not a number');
        self.d.innerHTML = "--";
      }
      return false;
    };
    this.stop = function () {
      cancelAnimationFrame(self.rAF);
    };
    this.reset = function () {
      self.startTime = null;
      cancelAnimationFrame(self.rAF);
      self.d.innerHTML = self.formatNumber(
        self.startVal.toFixed(self.decimals)
      );
    };
    this.resume = function () {
      self.startTime = null;
      self.duration = self.remaining;
      self.startVal = self.frameVal;
      requestAnimationFrame(self.count);
    };
    this.formatNumber = function (nStr) {
      nStr += "";
      var x, x1, x2, rgx;
      x = nStr.split(".");
      x1 = x[0];
      x2 = x.length > 1 ? self.options.decimal + x[1] : "";
      rgx = /(\d+)(\d{3})/;
      if (self.options.useGrouping) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, "$1" + self.options.separator + "$2");
        }
      }
      return x1 + x2;
    };

    // format startVal on initialization
    self.d.innerHTML = self.formatNumber(self.startVal.toFixed(self.decimals));
  };
  scope.CountUp = CountUp;
})(window.slotGame);
