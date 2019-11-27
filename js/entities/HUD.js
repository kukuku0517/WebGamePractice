/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // give a name
        this.name = "HUD";

        switch(game.mode){
            case 'run' :{
                this.addChild(new game.HUD.ScoreItem(5, 5));
            }
            case 'eat' :{
                this.addChild(new game.HUD.EatScoreItem(5, 5));
            }
        }
    
}});


/**
 * a basic HUD item to display score
 */
game.HUD.RunScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        this.stepsFont = new me.Font('gamefont', 80, '#000', 'center');
    },
    draw:function(renderer){
        this.stepsFont.draw(renderer, game.data.score+"m", me.game.viewport.width/2, 10);
    }

});

game.HUD.EatScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        this.stepsFont = new me.Font('gamefont', 80, '#000', 'center');
    },
    draw:function(renderer){
        this.stepsFont.draw(renderer, eatData.health, me.game.viewport.width/2, 10);
    }

});
