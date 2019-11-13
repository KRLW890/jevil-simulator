/* eslint-disable no-unused-vars */

// This file stores all the bullet types, which can be called by attacks

import { attackData } from "./attack_handler.js";
import { SpriteAnimation } from "./image_handler.js";

var dist = function(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
};

// The parent class of all the individual bullet types. These constructors are in charge of how the bullets behave after being spawned, culminating in a .move() prototype function that all the children constructors need.
class Bullet {
	constructor(sketch, x, y, xSpeed, ySpeed) {
		this.sketch = sketch;

		this.x = x;
		this.y = y;
		this.xSpeed = xSpeed;
		this.ySpeed = ySpeed;
		this.frameCount = 0; // how long the bullet has been active for
		this.phase = 0;
	}

	aimAtPlayer(speed) {
		var hypotenuse = Math.sqrt(Math.pow(attackData.playerX-this.x, 2) + Math.pow(attackData.playerY-this.y, 2));
		this.xSpeed = speed * (attackData.playerX-this.x)/hypotenuse;
		this.ySpeed = speed * (attackData.playerY-this.y)/hypotenuse;
	}

	graze() {
		// this function will need some major reworking.
		if (tpBar.percent < 100) {
			tpBar.percent += 1;
		}
		animations.tpGraze.drawFrame(attackData.playerX-25, attackData.playerY-25, 0);
	}

	hit() {
		var hyp = 1, isDefending = 0; // temporary variables
		if (attackData.target < 3) {
			party[attackData.target].current.hp -= attackData.baseDamage*hyp - 3*party[attackData.target].current.def - isDefending*(Math.floor(attackData.baseDamage/3) - party[attackData.target].current.def);
			if (party[attackData.target].current.hp <= 0) {
				party[attackData.target].current.hp = -party[attackData.target].current.maxHp/2;
			}
		} else { // 3 means all characters are targets
			for (var i = 0; i < 3; i++) {
				if (party[i].current.hp > 0) {
					party[i].current.hp -= attackData.baseDamage*hyp - 3*party[i].current.def - isDefending*(Math.floor(attackData.baseDamage/3) - party[i].current.def);
					if (party[i].current.hp <= 0) {
						party[i].current.hp = -party[i].current.maxHp/2;
					}
				}
			}
		}

		attackData.iFrames = 60;
	}
}


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
					if (dist(attackData.playerX, attackData.playerY, bulletX, bulletY) < 17) {
						if (attackData.iFrames == 0) {
							this.hit();
						}
						this.bullets[i] = false;
					} else if (dist(attackData.playerX, attackData.playerY, bulletX, bulletY) < 33 && attackData.iFrames == 0) {
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

export { HeartBomb };
