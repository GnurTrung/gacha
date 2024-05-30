import * as SpinePIXI from "pixi-spine";
import * as PIXI from "pixi.js";
import { useEffect } from "react";
import useAddScript from "../../hooks/useAddScript";
import useMounted from "../../hooks/useMounted";
import { gsap } from 'gsap';
import {
  ModalWin,
  ModalDailyTurn,
  ModalGuide,
  ModalHistory,
  ModalRanking,
} from "../../components/modal";

function Game() {
  const { isMounted } = useMounted();
  const { addScript, removeScript } = useAddScript();

  useEffect(() => {
    if (!isMounted) return;
    window.PIXI = PIXI;
    window.SpinePIXI = SpinePIXI;
    window.gsap = gsap;

    let config = addScript({ src: 'js/game/config.js' })
    let loader = addScript({ src: 'js/game/loader.js' })
    let items = addScript({ src: 'js/game/items.js' })
    let game = addScript({ src: 'js/game/game.js' })
    let app = addScript({ src: 'js/game/app.js' })

    return () => {
      removeScript(config)
      removeScript(loader)
      // removeScript(reelXs)
      removeScript(items)
      removeScript(game)
      removeScript(app)
    }

  }, [isMounted])

  return (
    <div id="slotmachine">
      {/* Modal */}
      <ModalWin open={true} />
      <ModalDailyTurn open={true} />
      <ModalGuide open={true} />
      <ModalHistory open={true} />
      <ModalRanking open={true} />
      {/* End Modal */}
      <div id="game-slot" className="w-96 h-96"></div>
    </div>
  );
}

export default Game;
