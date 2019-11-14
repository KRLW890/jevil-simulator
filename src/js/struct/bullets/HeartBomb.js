import { attackData } from "../../attack_handler.js";
import Bullet from "../Bullet.js";
import { SpriteAnimation } from "../../image_handler.js";

class HeartBomb extends Bullet {
	constructor(sketch) {
		super(sketch, Math.random()*100 + 50, -23, 0, 8);

		this.bomb = new SpriteAnimation(sketch, sprites.bullets.bombHeart, 2);

		if (Math.random() > 0.5) {
			this.x += 425;
		}

		this.targetY = Math.random()*200 + 100;
		this.bullets = [true, true, true, true];
	}

	move() {
		const { sketch } = this;

		if (this.phase == 0) {
			this.bomb.play(this.x-23, this.y-23, true, 2, 2);
			if (this.y > this.targetY) {
				this.phase++;
			}
		} else if (this.phase == 1) {
			this.aimAtPlayer(5);
			this.phase++;
		} else if (this.phase == 2) {
			for (var i = 0; i < 4; i++) {
				if (this.bullets[i]) {
					var bulletX = this.x + 40*Math.sin(i*Math.PI/2 + this.frameCount/20);
					var bulletY = this.y + 40*Math.cos(i*Math.PI/2 + this.frameCount/20);
					sketch.image(sprites.bullets.heart, bulletX-9, bulletY-9);
					if (sketch.dist(attackData.playerX, attackData.playerY, bulletX, bulletY) < 17) {
						if (attackData.iFrames == 0) {
							this.hit();
						}
						this.bullets[i] = false;
					} else if (sketch.dist(attackData.playerX, attackData.playerY, bulletX, bulletY) < 33 && attackData.iFrames == 0) {
						this.graze();
					}
				}
			}
			this.frameCount++;
		}

		this.x += this.xSpeed;
		this.y += this.ySpeed;

		if (this.x < -50 || this.x > 690 || this.y < -50 || this.y > 530) {
			return true;
		} else {
			// when one of these functions return true, the program cleans up that spot in the bullet array
			return false;
		}
	}
}

export default HeartBomb;
