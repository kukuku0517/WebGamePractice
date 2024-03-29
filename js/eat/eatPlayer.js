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
      this.renderable.addAnimation('eat', [0,1]);
      this.renderable.scale(3)
      this.renderable.setCurrentAnimation('idle');

      this.vely= game.data.level.playerVel;
      this.direction = 1
      this.body.setVelocity(0,0);
      this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
      this.alwaysUpdate = false;
      this.maxX = me.game.viewport.width
      this.currentFood = null;
  },
  update : function (time) {
    this._super(me.Entity, "update", [time]);
    var that = this;

    if(me.input.isKeyPressed("shoot")){
      if (this.currentFood!=null) {
            if(!this.renderable.isCurrentAnimation('eat')){
                this.isEating=true;
                if(this.currentFood.isMeat){
                    eatData.health -= 10
                }else{
                    eatData.health += 10
                }
                if(me.game.world.hasChild(this.currentFood)){
                    me.game.world.removeChild(this.currentFood);
                }
                this.currentFood = null;
                console.log('food eaten.')
                this.renderable.setCurrentAnimation('eat', function(){
                    that.isEating = false
                    that.renderable.setCurrentAnimation('idle')
                })
            }
        }else{
            console.log('no food registered')
        }
    }



    return true;
  },
checkCollisionWith: function(other){
    var threshold = 40
  
 var collision =  !(
        (this.pos.x > other.pos.x + other.width + threshold || this.pos.x + this.width  + threshold < other.pos.x)
    || (this.pos.y > other.pos.y + other.height + threshold || this.pos.y + this.height + threshold < other.pos.y))
    return collision;
},
register: function(food, shouldRegister){
    
    if(this.currentFood != food && shouldRegister){
        this.currentFood = food;
    }else if (this.currentFood == food && !shouldRegister){
          this.currentFood = null; 
        
     
    }
}
});