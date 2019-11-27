game.Food = me.Entity.extend({
    init: function (x, y) {
        var isMeat = Math.random() < 0.5;

        this._super(me.Entity, "init", [x, y, {
            image : isMeat?"wall":"r1",
            width : 50,
            height : 50
        }]);
        this.body.vel.set(-game.data.level.wallVelMin , 0);
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
        this.renderable.scale(1);
        this.alwaysUpdate = true;
    },
  
    update: function (dt) {
      var vel = game.data.level.wallVelMin + 
      (game.data.level.wallVelMax - game.data.level.wallVelMin) * game.data.score * game.data.level.wallVelRatio;
      vel = -vel;
      this.body.vel.set(vel, 0);
      this.pos.add(this.body.vel);
      
      
      if(this.pos.x < - 32){
          me.game.world.removeChild(this);
          eatData.health -=1;
      }
      me.Rect.prototype.updateBounds.apply(this);
      this._super(me.Entity, 'update',[dt]);
      // me.collision.check(this);
      
      return true;
    }
    
  });