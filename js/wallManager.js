game.WallManager = me.Renderable.extend({
    init: function() {
        this._super(me.Renderable, 'init', [0, me.game.viewport.width, me.game.viewport.height, 92]);
        this.alwaysUpdate = true;
        this.generate = 0;
        
        this.sectionGenerate = 0;
        this.deltaY= 10;

        this.pipeFrequency = 10;
        this.pipeHoleSize = 300;
        this.posX = me.game.viewport.width;
        this.posY = 200;
        
    },
    validateRange: function(posY, posY2){
        if(posY > me.game.viewport.height - this.MIN_RANGE){
            return [posY-this.MIN_RANGE, posY2-this.MIN_RANGE]
        }else if(posY2 < this.MIN_RANGE){
            return [posY+this.MIN_RANGE, posY2+this.MIN_RANGE]
        }else{
            return [posY, posY2]
        }
    },

    update: function(dt) {
        if (this.generate++ % this.pipeFrequency == 0) {
            if(this.sectionGenerate++ % 5 == 0){
                this.deltaY = (Math.random()*32 * - Math.sign(this.deltaY));
            }
            this.posY += this.deltaY
            var posY = this.posY
            var posY2 =  posY + me.game.viewport.height - this.pipeHoleSize;
            var validatedPos = this.validateRange(posY, posY2)
            posY = validatedPos[0];
            posY2 = validatedPos[1];
            var pipe1 = new me.pool.pull('wall', this.posX, posY);
            var pipe2 = new me.pool.pull('wall', this.posX, posY2);
            pipe1.renderable.currentTransform.scaleY(-1);
            pipe2.renderable.currentTransform.scaleY(-1);
            me.game.world.addChild(pipe1, 10);
            me.game.world.addChild(pipe2, 10);
         
        }
        this._super(me.Entity, "update", [dt]);
    },

});

game.WallManager.MIN_RANGE = 200;