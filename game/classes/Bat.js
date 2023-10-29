import Entity from "./Entity.js";
class Bat extends Entity{
    #origin_x = 64;
    #origin_y = 64;
    #direction = true;
    #animStep = 1;
    #animTimer = 0;
    #isIdle = true;
    #speed = 0;
    #damage = 0;
    #isAlive = true;
    #triggerZone = 0;


constructor(x, y, width, height, texturepath, origin_x, origin_y,speed,damage,triggerZone) {
    super(x, y, width, height, texturepath);
    this.#origin_x = origin_x;
    this.#origin_y = origin_y;
    this.#speed  = speed;
    this.#damage = damage;
    this.#triggerZone = triggerZone;
}

get animTimer() {
    return this.#animTimer;
}

set animTimer(value) {
    this.#animTimer = value;
}

get animStep() {
    return this.#animStep;
}

set animStep(value) {
    this.#animStep = value;
}

get direction() {
    return this.#direction;
}

set direction(value) {
    this.#direction = value;
}

get origin_x() {
    return this.#origin_x;
}

set origin_x(value) {
    this.#origin_x = value;
}

get origin_y() {
    return this.#origin_y;
}

set origin_y(value) {
    this.#origin_y = value;
}

get isIdle() {
    return this.#isIdle;
}

set isIdle(value) {
    this.#isIdle = value;
}

get speed() {
    return this.#speed;
}

set speed(value) {
    this.#speed = value;
}

get damage() {
    return this.#damage;
}

set damage(value) {
    this.#damage = value;
}

get isAlive() {
    return this.#isAlive;
}

set isAlive(value) {
    this.#isAlive = value;
}

get triggerZone() {
    return this.#triggerZone;
}

set triggerZone(value) {
    this.#triggerZone = value;
}



render(ctx) {
    if(this.debug){
        ctx.fillStyle = "rgba(67,34,67,0.25)"
        ctx.fillRect(this.x - this.width,this.y - this.height,this.width,this.height)
        ctx.fillStyle = "rgba(169,208,72,0.25)"
        ctx.fillRect(this.x - this.width + this.width/4,this.y - this.height,this.width/2,this.height)
    }

    let spriteDirectionOffset;

    if(this.#isIdle){
        this.animStep = 0;
        spriteDirectionOffset = 0;
        
    }
    else{
        if (this.direction) {
            spriteDirectionOffset = 0;
        } else {
            spriteDirectionOffset = 32;
        }
          this.animTimer++;
  
        if(this.animTimer % 4===0){
            this.animStep++;
            if(this.animTimer === 12){
              this.animStep = 1;
              this.animTimer = 0;
            }
        }
    }
    
      ctx.drawImage(
        this.texture,  // Sprite
        spriteDirectionOffset,  // Sprite sheet offset x
        this.width*this.animStep,  // Sprite sheet offset y
        32, // Sprite sheet w
        32, // Sprite sheet h
        this.x - this.width,
        this.y - this.height,
        this.width,
        this.height
      )

      if (this.debug) {
        ctx.fillStyle = "#000";
        ctx.fillRect(this.x, this.y, -8, -8);
    }
}

move(player){
    const playerDistance = Math.sqrt((player.x - this.x) ** 2 + (player.y - this.y) ** 2);
    
    if(playerDistance<=this.triggerZone){
        this.#isIdle = false;
        const deltaX = player.x - this.x;
        const deltaY = player.y - this.y;

        // Calculer la distance entre la chauve-souris et le personnage
        const space = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        // Vérifier si la chauve-souris est suffisamment éloignée du personnage
        if (space > 10) { // Vous pouvez ajuster la distance minimale
            // Calculer la direction de la poursuite
            const directionX = deltaX / space;
            const directionY = deltaY / space;

            // Mettre à jour la position de la chauve-souris en fonction de la direction et de la vitesse
            this.x += directionX * this.speed;
            this.y += directionY * this.speed;
        }
    }


    }

collide(player){

    const playerLeft = player.predictedX;
    const playerRight = player.predictedX + player.width;
    const playerTop = player.predictedY;
    const playerBottom = player.predictedY + player.height;

    const batLeft = this.x;
    const batRight = this.x + this.width;
    const batTop = this.y;
    const batBottom = this.y + this.height;

    if (
        playerRight >= batLeft &&
        playerLeft <= batRight &&
        playerBottom >= batTop &&
        playerTop <= batBottom
    ){
        if(player.x <= this.x && !player.isHit){
            console.log("left")
            player.x_v = -4;
            player.y_v = -3;
            player.predictedX = this.x - this.width + player.x_v;
            player.jump = true;
            player.hit(this.damage);
        }
        // Push the player right
        else if(player.x >= this.x && !player.isHit){
            console.log("right")
            player.x_v = 4;
            player.y_v = -3;
            player.predictedX = this.x + player.width + player.x_v;
            player.jump = true;
            player.hit(this.damage);
        } else {
            console.log("an error in collision was made, oops !!");
        }
    }
    }


}





    





export default Bat;

