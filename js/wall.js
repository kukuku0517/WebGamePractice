game.Wall = me.Entity.extend({
  init: function (x, y) {
      this._super(me.Entity, "init", [x, y, {
          image : "ships",
          width : 32,
          height : 32
      }]);
      this.body.vel.set(-10, 0);
      this.body.collisionType = me.collision.types.ENEMY_OBJECT;
      this.chooseShipImage();
      this.alwaysUpdate = true;
  },

  update: function (dt) {
    //   this._super(me.Entity, "update", [dt]);
    //   this.body.update();
    //   return true;
    this.pos.add(this.body.vel);
    if(this.pos.x < - 32){
        me.game.world.removeChild(this);
    }
    me.Rect.prototype.updateBounds.apply(this);
    this._super(me.Entity, 'update',[dt]);
    // me.collision.check(this);
    
    return true;
  },

  chooseShipImage:function(){
        var frame = ~~(Math.random() * 3); //Math.floor
        this.renderable.addAnimation("idle", [frame], 1);
        this.renderable.setCurrentAnimation("idle");
  }
});