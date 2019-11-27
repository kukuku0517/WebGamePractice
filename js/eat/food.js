game.Food = me.Entity.extend({
    init: function (x, y) {
        this.id = Math.random()
        this.isMeat = Math.random() < 0.5;

        this._super(me.Entity, "init", [x, y, {
            image : this.isMeat?"wall":"r1",
            width : 50,
            height : 50
        }]);
        this.body.vel.set(-game.data.level.wallVelMin , 0);
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
        this.renderable.scale(2);
        this.alwaysUpdate = true;
    },
  
    update: function (dt) {
      var vel = eatData.level.foodVelMin + 
      (eatData.level.foodVelMax -  eatData.level.foodVelMin) *eatData.score * eatData.level.foodVelRatio;
      vel = -vel;
      this.body.vel.set(vel, 0);
      this.pos.add(this.body.vel);
      
      
      if(this.pos.x < - 32){
          me.game.world.removeChild(this);
      }
      me.Rect.prototype.updateBounds.apply(this);
      this._super(me.Entity, 'update',[dt]);
   
      var player =  game.eatPlayScreen.player;
      var collisionWithPlayer =player.checkCollisionWith(this)
    //   console.log(collisionWithPlayer)
      if(collisionWithPlayer){
          
          player.register(this, true)
      }else{
          player.register(this, false)
      }
      return true;
    }
    
  });