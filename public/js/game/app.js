/* eslint-disable no-undef */
window.slotGame = (window.slotGame || {});

(function (scope, gameScope) {

    let AppSL = function () { };

    AppSL.Init = function () {
        if (gameScope) {
            if (!AppSL.game)
                AppSL.game = new gameScope.Game();
            else 
                AppSL.game.getAccountInfo()
            document.getElementById('slotmachine').style.display = 'block';
        } else {
            setTimeout(() => {
                AppSL.Init()
            }, 100)
        }
    }

    AppSL.close = function () {
        document.getElementById('slotmachine').style.display = 'none';
    }

    AppSL.deleteGame = function () {
        delete scope.AppSL;
    }

    AppSL.onConnected = function () {

    }

    AppSL.onDisconnect = function () {

    }

    scope.AppSL = AppSL;

})(window, window.slotGame);

// setTimeout(()=>{
//     AppSL.Init();
// },2000)