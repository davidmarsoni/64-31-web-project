import TriggerArea from "./TriggerArea.js";
import Enemy from "./Enemy.js";
class Bat extends Enemy {
   #origin_x = 64;
   #origin_y = 64;
   #direction = true;
   #animStep = 1;
   #animTimer = 0;
   #isIdle = true;
   #triggerZoneWidth;
   #triggerZoneHeight;
   #triggerZoneX;
   #triggerZoneY;
   #batMode; //0 = activation mode //1 = customizable trigger zone
   #x_v = 0;
   #y_v = -4;
   #velocityIncrementation = [0.05, -0.05];
   #defaultVelocity = [2, -2]
   #chosenSide = 0;



   constructor(x, y, width, height, texturepath, origin_x, origin_y, speed, damage, triggerZoneWidth, triggerZoneHeight, triggerZoneX, triggerZoneY, batMode) {
      super(x, y, width, height, texturepath, speed, damage);
      this.#origin_x = origin_x;
      this.#origin_y = origin_y;
      this.#triggerZoneWidth = triggerZoneWidth;
      this.#triggerZoneHeight = triggerZoneHeight;
      this.#triggerZoneX = triggerZoneX;
      this.#triggerZoneY = triggerZoneY;
      this.#batMode = batMode;
      this.hitSound = new Audio("assets/sounds/enemy/bat/hit.wav");
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

   get triggerZoneWidth() {
      return this.#triggerZoneWidth;
   }

   set triggerZoneWidth(value) {
      this.#triggerZoneWidth = value;
   }

   get triggerZoneHeight() {
      return this.#triggerZoneHeight;
   }

   set triggerZoneHeight(value) {
      this.#triggerZoneHeight = value;
   }

   get triggerZoneX() {
      return this.#triggerZoneX;
   }

   set triggerZoneX(value) {
      this.#triggerZoneX = value;
   }

   get triggerZoneY() {
      return this.#triggerZoneY;
   }

   set triggerZoneY(value) {
      this.#triggerZoneY = value;
   }

   get batMode() {
      return this.#batMode;
   }

   set batMode(value) {
      this.#batMode = value;
   }


   getTrampleBoxLeft() {
      return this.x - this.width + this.width / 4;
   }

   getTrampleBoxRight() {
      return this.x - this.width / 4;
   }



   render(ctx) {
      if (this.isRendered === false) {
         return;
      }

      if (this.debug) {
         ctx.fillStyle = "rgba(180,56,45,0.15)"
         ctx.fillRect(this.minX - this.triggerZone, this.minY - this.triggerZone, this.triggerZone * 2 + this.width, this.triggerZone * 2 + this.height)
         ctx.fillStyle = "rgba(67,34,67,0.25)"
         ctx.fillRect(this.x - this.width, this.y - this.height, this.width, this.height)
         ctx.fillStyle = "rgba(169,208,72,0.25)"
         ctx.fillRect(this.x - this.width + this.width / 4, this.y - this.height, this.width / 2, this.height)
         ctx.strokeStyle = "rgba(255,0,0,0.3)"
         ctx.strokeRect(this.minX - this.triggerZone, this.minY - this.triggerZone, this.triggerZone * 2 + this.width, this.triggerZone * 2 + this.height)
      }

      let spriteDirectionOffset;

      if (this.#isIdle) {
         this.animStep = 0;
         spriteDirectionOffset = 0;

      }
      else {
         if (this.direction) {
            spriteDirectionOffset = 0;
         } else {
            spriteDirectionOffset = 32;
         }
         this.animTimer++;

         if (this.animTimer % 4 === 0) {
            this.animStep++;
            if (this.animTimer === 12) {
               this.animStep = 1;
               this.animTimer = 0;
            }
         }
         if (this.isAlive === false) {
            this.animStep = 4;
         }
      }
      if (this.textureLoaded === true) {
         ctx.drawImage(
            this.texture,  // Sprite
            spriteDirectionOffset,  // Sprite sheet offset x
            this.width * this.animStep,  // Sprite sheet offset y
            this.width, // Sprite sheet w
            this.height, // Sprite sheet h
            this.x - this.width,
            this.y - this.height,
            this.width,
            this.height
         )
      } else {
         this.debug = true;
      }

      if (this.debug) {
         ctx.fillStyle = "#000";
         ctx.fillRect(this.x, this.y, -8, -8);
      }
   }

   move(player) {

      let deltaX;
      let deltaY;

      if (this.#batMode === 1) {
         if (player.InAPerimeter(new TriggerArea(this.#triggerZoneX, this.#triggerZoneY), this.triggerZoneWidth, this.triggerZoneHeight)) {
            this.#isIdle = false;
            deltaX = player.x - this.x;
            deltaY = player.y - this.y;
            this.triggerZoneWidth = 5000;
            this.triggerZoneHeight = 5000;
         }
      } else if (this.#batMode === 0) {

         if (player.InAPerimeter(this, this.#triggerZoneWidth, this.triggerZoneHeight)) {
            this.#isIdle = false;
            deltaX = player.x - this.x;
            deltaY = player.y - this.y;
            this.triggerZoneWidth = 5000;
            this.triggerZoneheight = 5000;
         }
      }




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


      if (this.isAlive === false) {
         this.#x_v += this.#velocityIncrementation[this.#chosenSide];
         this.#y_v += 0.7;

         this.x = this.x + this.#x_v;
         this.y = this.y + this.#y_v;
      }


   }


   collide(player) {

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
      ) {
         if (player.y <= this.y
            && player.predictedY <= this.y
            && (
               player.getTrampleBoxLeft(true) <= this.getTrampleBoxRight()
               || player.getTrampleBoxRight(true) >= this.getTrampleBoxLeft()
            ) && player.y_v > 0 && this.isAlive === true
         ) {
            this.debug ? console.log("trample") : null;
            player.y_v = -7;
            this.#chosenSide = Math.round(Math.random());
            this.#x_v = this.#defaultVelocity[this.#chosenSide];
            player.score += 500;
            player.addEnemykilled();
            player.addDamageDealt(1);
            this.isAlive = false;
         }


         else if (player.x <= this.x && !player.isHit && this.isAlive === true) {
            this.debug ? console.log("left") : null;
            player.x_v = -4;
            player.y_v = -3;
            player.predictedX = this.x - this.width + player.x_v;
            player.jump = true;
            this.playSound ? this.hitSound.play() : null;
            player.hit(this.damage);
         }
         // Push the player right
         else if (player.x >= this.x && !player.isHit && this.isAlive === true) {
            this.debug ? console.log("right") : null;
            player.x_v = 4;
            player.y_v = -3;
            player.predictedX = this.x + player.width + player.x_v;
            player.jump = true;
            this.playSound ? this.hitSound.play() : null;
            player.hit(this.damage);
         }

      }
   }


}












export default Bat;

