game.Player = me.Entity.extend({
  init : function (x,y) {
    //   var img = me.loader.getImage("player");
      this._super(me.Entity, "init", [
          
          
          { image : "player" ,
            width : 32,
            height : (me.game.viewport.height - 32)/ 2 }
      ]);
      this.vely= 200;
      this.direction = 1
      this.body.setVelocity(0,0);
      this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
       
      this.maxX = me.game.viewport.width
  },
  update : function (time) {
      this._super(me.Sprite, "update", [time]);
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
        return false;
    }else{
        console.log("collision2")
        
    }
}
});