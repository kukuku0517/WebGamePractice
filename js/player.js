game.Player = me.Entity.extend({
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

      this.renderable.addAnimation('run', [0,1,2,3]);
      this.renderable.setCurrentAnimation('run');
      this.renderable.scale(3);
      this.vely= game.data.level.playerVel;
      this.direction = 1
      this.body.setVelocity(0,0);
      this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
      this.alwaysUpdate = true;
      this.maxX = me.game.viewport.width
  },
  update : function (time) {
      this._super(me.Entity, "update", [time]);
    //   if (me.input.isKeyPressed("left")) {
    //       this.pos.x -= this.velx * time / 1000;
    //   }

    //   if (me.input.isKeyPressed("right")) {
    //       this.pos.x += this.velx * time / 1000;
    //   }

        this.pos.y = me.Math.clamp(this.pos.y, 0, this.maxY);
        if (me.input.isKeyPressed("shoot")) {
            this.direction = - this.direction
        }

        this.pos.y += this.direction * this.vely * time / 1000;
        if(this.pos.y < 0 || this.pos.y > me.game.viewport.height){
            this.direction = - this.direction;
        }
    
        me.collision.check(this);
      return true;
  },
  onCollision : function (res, other) {
    if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
        console.log("collision")
        game.playScreen.reset();
        return false;
    }else if (other.body.collisionType === me.collision.types.COLLECTABLE_OBJECT){
        other.onCollect();
        return false;
    }else{
        console.log("collision2")
        
    }
}
// chooseShipImage:function(){
//     var frame = ~~(Math.random() * 3); //Math.floor
//     this.renderable.addAnimation("idle", [frame], 1);
//     this.renderable.setCurrentAnimation("idle");
// }
});