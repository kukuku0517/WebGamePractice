game.WallManager = me.Renderable.extend({
    init: function() {
        this._super(me.Renderable, 'init', [0, me.game.viewport.width, me.game.viewport.height, 92]);
        this.alwaysUpdate = true;
        this.generate = 0;
        
        this.sectionGenerate = 0;
        this.deltaY= 10;

        this.wallFrequency = game.data.level.wallFrequency;
        this.starFrequency = game.data.level.starFrequency;
        this.pipeHoleSize = game.data.level.holeSizeMax;
        this.posX = me.game.viewport.width + 80;
        this.posY = 200;
        
    },
    validateRange: function(posY, posY2){
    
        if(posY < 0){
            return 1
        }else if(posY2 > me.game.viewport.height){
            return -1 
        }else{
            return 0
        }
        
    },

    update: function(dt) {
        
        if (++this.generate % this.wallFrequency == 0) {
            
            this.pipeHoleSize = Math.max(game.data.level.holeSizeMin,
                game.data.level.holeSizeMax - (game.data.score * game.data.level.holeRatio))
            
            this.posY += this.deltaY


            var posY = this.posY
            var posY2 =  posY + this.pipeHoleSize;

            var isValid = this.validateRange(posY, posY2);
            if(isValid !=0){
                this.sectionGenerate == 0;
                this.deltaY = Math.random()*60 * isValid;
            }else if(++this.sectionGenerate % 10 == 0){ 
                this.sectionGenerate == 0;
                this.deltaY = (Math.random()*60 * - Math.sign(this.deltaY));
            }
            
            var pipe1 = new me.pool.pull('wall', this.posX, posY);
            var pipe2 = new me.pool.pull('wall', this.posX, posY2);
            me.game.world.addChild(pipe1, 10);
            me.game.world.addChild(pipe2, 10);

           
            if(this.generate % this.starFrequency == 0){
                console.log('oncreate star')
                var posY3 = posY + 60 + (posY2 - posY - 60)*Math.random()
                var color = {0:'r', 1:'y',2:'b'}[Math.floor(3*Math.random())];
                var combo = 1;
                if(game.data.color == color){
                    combo = game.data.combo+1;
                }
                var star = new me.pool.pull('star', this.posX, posY3, 
                {color: color, combo:combo})
                me.game.world.addChild(star, 10);
            }
         
        }
        this._super(me.Entity, "update", [dt]);
    },

});

game.WallManager.MIN_RANGE = 200;
game.WallManager.DEFAULT_HOLE_SIZE = 400;
game.WallManager.DEFAULT_VELOCITY = 400;
game.WallManager.COLORS = {0:'r', 1:'y',2:'b'}
