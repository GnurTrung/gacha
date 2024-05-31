/* eslint-disable no-undef */
window.slotGame = window.slotGame || {};

(function (scope) {
  let Loader = function () {
    this._initialize();
  };

  let p = Loader.prototype;

  p._initialize = function () {
    let that = this;
    // const root = scope.ConfigSL.ROOT;
    const assetURL = 'images/slot-game/';
    let nameAssets = [];
    const ASSET_NAME = scope.ASSET_NAME;
    const sources = [
      { name: ASSET_NAME.BG_IN_GAME, src: 'bg-new.png' },
      { name: ASSET_NAME.EGG, src: 'egg.png' },
    ];
    for (let { name, src } of sources) {
      scope.loader.add(name, assetURL + src);
      nameAssets = [...nameAssets, name];
    }
    const texturesPromise = PIXI.Assets.load(nameAssets); // =>
    texturesPromise.then((textures) => {
      that.onSuccess(textures);
    });
  };

  p.onProgress = function (loader) {};
  p.onSuccess = function (textures) {
    try {
      // render Game
      scope.Textures = textures;
      AppSL.game.render();
    } catch (ex) {
      console.log(ex);
    }
  };

  scope.Loader = Loader;
})(window.slotGame);
