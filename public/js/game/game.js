/* eslint-disable no-undef */
window.slotGame = window.slotGame || {};

(function (scope) {
  let Game = function () {
    this.init();
  };

  let p = Game.prototype;
  // p.gameState = scope.GAME_STATE.IDLE;
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
        width: 420,
        height: 500,
        resolution: 1,
        antialias: true,
      });
      this.application.ticker.minFPS = 60;
      this.application.x = 0;
      this.application.y = 0;
      document.getElementById('game-slot')?.appendChild(this.application.view);
      this.mainContainer = new scope.Container();
      window.mainContainer = this.mainContainer;
      this.application.stage.addChild(this.mainContainer);
      this.application.stage.scale.set(0.9);
      this.bgGame = new scope.Item();
      this.bgGame.position.set(240, 300);
      this.mainContainer.addChild(this.bgGame);
      window.bgGame = this.bgGame;
      // this.getAccountInfo();
    } catch (ex) {
      console.log(ex);
    }
  };

  p.spin = async function (turn, day) {
    let that = this;
    try {
      const { data: dataSpin } = await that.postData('/event/gacha/play', {
        turn: turn,
        day: day,
      });

      return dataSpin;
    } catch (ex) {
      console.log(ex);
    }
  };

  p.startSpin = async function (turn, day) {
    let that = this;
    const res = that.bgGame.onStartSpin(turn, day);
    return res;
  };

  p.postData = async function (base, param) {
    const baseURL = scope.ConfigSL.API + base;
    const access_token = this.accessToken();
    const response = await fetch(baseURL, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      body: JSON.stringify(param),
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  p.getData = async function (url, base = '/spin/') {
    const baseURL = scope.ConfigSL.API + base;
    const access_token = this.accessToken();
    const response = await fetch(baseURL + url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  p.accessToken = function (name = 'access_token') {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
      let [k, v] = el.split('=');
      cookie[k.trim()] = v;
    });
    return cookie[name];
  };

  scope.Game = Game;
})(window.slotGame);
