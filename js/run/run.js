game.RunPlayScreen = me.ScreenObject.extend({
    checkIfLoss: function (y) {
        if (y >= this.player.pos.y) {
            this.reset();
        }
    },
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        game.data.score = 0;
        // me.game.world.addChild(new me.ColorLayer("background", "#82E0AA"), 0);
        me.game.world.addChild(new me.ColorLayer("background", "#fff"), 0);
        this.player = me.pool.pull("player", 60, me.game.viewport.height /2);
        me.game.world.addChild(this.player, 1);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.SPACE, "shoot", true);

        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD, 11);

        this.wallManager = new game.WallManager();
        me.game.world.addChild(this.wallManager),2;

        // this.enemyManager = new game.EnemyManager();
        // this.enemyManager.createEnemies();
        // me.game.world.addChild(this.enemyManager, 2);
    },


    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.D);
        me.input.unbindKey(me.input.KEY.SPACE);
    }
});
