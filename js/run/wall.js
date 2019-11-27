game.Wall = me.Entity.extend({
  init: function (x, y) {
      this._super(me.Entity, "init", [x, y, {
          image : "wall",
          width : 35,
          height : 35
      }]);
      this.body.vel.set(-game.data.level.wallVelMin , 0);
      this.body.collisionType = me.collision.types.ENEMY_OBJECT;
      this.renderable.scale(2);
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
        game.data.score += 1;
    }
    me.Rect.prototype.updateBounds.apply(this);
    this._super(me.Entity, 'update',[dt]);
    // me.collision.check(this);
    
    return true;
  }

  
});

game.Star = me.Entity.extend({
  init: function (x, y, type) {
      this.color = type.color;
      this.combo = type.combo;
      this._super(me.Entity, "init", [x, y, {
          image : type.color+type.combo,
          width : 35,
          height : 35
      }]);
      this.body.vel.set(-game.data.level.wallVelMin , 0);
      this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
      this.renderable.scale(2);
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
        game.data.score += 1;
    }
    me.Rect.prototype.updateBounds.apply(this);
    this._super(me.Entity, 'update',[dt]);
    // me.collision.check(this);
    
    return true;
  },
  onCollect:function(){
    me.game.world.removeChild(this);
    if(game.data.color == this.color){
      if(game.data.combo<2){
        game.data.combo++;
      }
      
    }else{
      game.data.color  = this.color;
      game.data.combo = 1;
    }
    game.data.score+= 10 * this.combo;
  }

  
});