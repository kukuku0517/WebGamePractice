
/* Game namespace */
var game = {
  
    // an object where to store game information
    data : {
        // score
        score : 0,
        combo : 0,
        color : "r",
        level : {
            speed : 400,
            wallFrequency :10,
            starFrequency : 100,
            holeSizeMax :600,
            holeSizeMin : 400,
            holeRatio : 0.01,
            wallVelMin : 10,
            wallVelMax : 15,
            wallVelRatio : 0.002,
            playerVel : 200
        }
       
    },

    // Run on page load.
    "onload" : function () {

        // Initialize the video.
        if (!me.video.init(960, 960, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }



        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));





    },

    // Run on game resources loaded.
    "loaded" : function () {
        this.playScreen = new game.PlayScreen();
        me.state.set(me.state.PLAY, this.playScreen);

            // start the game
//        me.state.change(me.state.PLAY);

        me.pool.register("player",game.Player)
        me.pool.register("laser", game.Laser);
        me.pool.register("wall",game.Wall)
        me.pool.register("star",game.Star)
        me.state.set(me.state.MENU, new game.TitleScreen());
//        me.state.set(me.state.PLAY, new game.PlayScreen());


        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);


        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
