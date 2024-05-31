/* eslint-disable no-undef */
window.slotGame = window.slotGame || {};
// const TextInput = require("pixi-text-input");
class Item extends window.slotGame.Container {
  blink_container = null;
  wiper = null;
  winPoint = null;
  totalPoint = null;
  totalTurn = null;
  betPoint = null;
  countUpOptions = {
    useEasing: true, // toggle easing
    useGrouping: true, // 1,000,000 vs 1000000
    separator: ',', // character to use as a separator
    decimal: '.', // character to use as a decimal
  };
  eggs = [];
  eggsPositions = [
    { x: 0, y: 120 },
    { x: 120, y: 120 },
    { x: -120, y: 120 },
    { x: -55, y: 120 },
    { x: 40, y: 120 },
    { x: 0, y: 60 },
    { x: 40, y: 60 },
    { x: -75, y: 80 },
    { x: 75, y: 80 },
    { x: -60, y: 50 },
    { x: -120, y: 50 },
    { x: 120, y: 50 },
  ];

  constructor(options) {
    super();
    this.x = 100;
    this.y = 100;
    this.scale.x = 0.8;
    this.scale.y = 0.8;
    this.renderBackground();
    for (let { x, y } of this.eggsPositions) {
      this.renderEggs(x, y, ~~(Math.random() * 360));
    }
    // this.renderButtonSpin(0, 270, ~~(Math.random() * 360));
    this.renderPrizeEgg();
  }

  renderBackground() {
    const scope = window.slotGame;
    const bgGame = new scope.Container();
    bgGame.position.set(0, 0);
    this.bg = new scope.Sprite(scope.TextureCache[scope.ASSET_NAME.BG_IN_GAME]);
    this.bg.position.set(0, 0);
    this.bg.anchor.set(0.5);

    this.closeButton = new scope.Sprite(
      scope.TextureCache[scope.ASSET_NAME.BUTTON_CLOSE]
    );
    this.closeButton.anchor.set(0.5);
    this.closeButton.position.set(450, -450);
    this.closeButton.eventMode = 'static';
    this.closeButton.cursor = 'pointer';
    this.closeButton.on('pointerdown', onButtonDown);
    function onButtonDown() {
      AppSL && AppSL.close && AppSL.close();
    }
    this.addChild(this.bg);
  }

  renderEggs(x, y, rotate) {
    const scope = window.slotGame;
    const textureButton = PIXI.Texture.from(scope.ASSET_NAME.EGG);
    this.egg = new PIXI.Sprite(textureButton);
    const button = this.egg;
    button.anchor.set(0.5);
    button.position.set(x, y);
    button.rotation = rotate;
    button.interactive = true;
    this.addChild(button);
    this.eggs.push(button);
  }

  renderPrizeEgg() {
    const scope = window.slotGame;
    const textureButton = PIXI.Texture.from(scope.ASSET_NAME.EGG);
    this.prizeEgg = new PIXI.Sprite(textureButton);
    const buttonP = this.prizeEgg;
    buttonP.anchor.set(0.5);
    buttonP.position.set(0, 270);
    buttonP.interactive = true;
    buttonP.visible = false;
    buttonP.rotation = ~~(Math.random() * 360);
    this.addChild(buttonP);
  }

  onStartSpin = async (turn, day) => {
    let i = 1;
    let effects = [];
    const duration = 0.07;
    // Math.random() * 0.15 + 0.05;
    const rotate = Math.random() * 10;
    const delay = (delayInms) => {
      return new Promise((resolve) => setTimeout(resolve, delayInms));
    };
    let yTo = -7.7;
    // (Math.random() * 10 + 2);

    this.prizeEgg.visible = false;
    bgGame.prizeEgg.y = 260;
    bgGame.prizeEgg.rotation = ~~(Math.random() * 360);

    for (let egg of bgGame.eggs) {
      let y = egg.y;
      const tl = gsap.timeline({ repeat: -1, delay: -i++ * 0.0613 });
      tl.to(egg, {
        y: '+=' + yTo,
        duration,
        rotatation: `${rotate}deg`,
        ease: `rough({strength: 1, points: 20, template: Power0.easeOut, taper: none, randomize: true,clamp: true})`,
      }).to(egg, {
        y: y,
        rotatation: `${rotate}deg`,
        // rotateZ: rotate - Math.random() * 10 - 5,
        duration,
      });
      effects.push(tl);
    }
    const tl2 = gsap.timeline({ repeat: -1, delay: 0 });

    tl2.to(bgGame.bg, {
      x: '-=' + yTo,
      duration,
      rotateZ: rotate,
      ease: `rough({strength: 1, points: 20, template: Power0.easeOut, taper: none, randomize: true,clamp: true})`,
    });
    const res = await AppSL.game.spin(turn, day);
    await delay(2000);

    for (let effect of effects) {
      tl2.pause();
      effect.pause();
      gsap.to(bgGame.bg, {
        x: 0,
        rotate,
        duration: 0.1,
      });
      for (let index in bgGame.eggs) {
        let egg = bgGame.eggs[index];
        gsap.to(egg, {
          y: bgGame.eggsPositions[index].y,
          rotate,
          duration: 0.1,
        });
      }

      if (res?.length > 0) {
        this.prizeEgg.visible = true;
        gsap.to(bgGame.prizeEgg, {
          y: '+=10',
          duration: 1,
          ease: `rough({strength: 1, points: 20, template: Power0.easeOut, taper: none, randomize: true,clamp: true})`,
        });
      }
    }
    return res;
  };

  onEndSpin() {
    if (this.wiper) this.wiper.onPlayComplete();
  }
}

slotGame.Item = Item;
