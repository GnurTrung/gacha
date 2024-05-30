/* eslint-disable no-undef */
window.slotGame = (window.slotGame || {});
window.slotGame.Container = PIXI.Container;
window.slotGame.loader = PIXI.Assets;
window.slotGame.Sprite = PIXI.Sprite;
window.slotGame.TextureCache = PIXI.utils.TextureCache;

window.slotGame.ConfigSL = {
    ROOT: window.location.origin + '/',
    API: 'https://api.dragark.net/dragark-api'
}

window.slotGame.GAME_STATE = {
    IDLE: 0,
    WAITING_API: 1,
    PLAY: 2,
    WIN: 3,
    LOSE: 4
}

window.slotGame.ASSET_NAME = {
    BG_IN_GAME: 'BG_IN_GAME',
    EGG: "EGG",
}