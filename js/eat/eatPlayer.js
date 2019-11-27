game.RunPlayer = me.Entity.extend({
  init : function (x,y) {
      
      this._super(me.Entity, "init", [
          x, 
          (me.game.viewport.height/2 - 32),
          { image : "player",
            width : 140/4,
            height : 55,
            frameWidth : 140/4,
            frameHeight : 55
        }
      ]);

      this.isEating = false

      this.renderable.addAnimation('idle', [1]);
      this.renderable.addAnimation('eat', [0,1,2,3]);
      
      this.renderable.setCurrentAnimation('idle');
      this.renderable.scale(1);
      this.vely= game.data.level.playerVel;
      this.direction = 1
      this.body.setVelocity(0,0);
      this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
      this.alwaysUpdate = true;
      this.maxX = me.game.viewport.width
  },
  update : function (time) {
    this._super(me.Entity, "update", [time]);
    var that = this;

    if (me.input.isKeyPressed("shoot")) {
        if(!this.renderable.isCurrentAnimation('eat')){
            this.isEating=true
            console.log('isEating')
            this.renderable.setCurrentAnimation('eat', function(){
                that.isEating = false
                that.renderable.setCurrentAnimation('idle')
            })
        }
    }

    me.collision.check(this);
    return true;
  },
  onCollision : function (res, other) {
    
    if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
        game.playScreen.reset();
        return false;
    }else if (other.body.collisionType === me.collision.types.COLLECTABLE_OBJECT){
        if(me.input.isKeyPressed("shoot")){
            eatData.health+=10;
            console.log(eatData.health)
        }else{
            console.log(eatData.health)
        }
        return false;
    }else{
        
        
    }
}
// chooseShipImage:function(){
//     var frame = ~~(Math.random() * 3); //Math.floor
//     this.renderable.addAnimation("idle", [frame], 1);
//     this.renderable.setCurrentAnimation("idle");
// }
});