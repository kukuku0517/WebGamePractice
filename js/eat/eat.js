game.EatPlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        game.data.score = 0;
        // me.game.world.addChild(new me.ColorLayer("background", "#82E0AA"), 0);
        me.game.world.addChild(new me.ColorLayer("background", "#fff"), 0);
        this.player = me.pool.pull("runPlayer", me.game.viewport.width /2, me.game.viewport.height /2);
        me.game.world.addChild(this.player, 1);

        me.input.bindKey(me.input.KEY.SPACE, "shoot", true);

        this.foodManager = new game.FoodManager();
        me.game.world.addChild(this.foodManager),2;

        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD, 11);
    },


    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.SPACE);
    }
});
