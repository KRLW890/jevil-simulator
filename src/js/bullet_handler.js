/* eslint-disable no-unused-vars */

// This file stores all the bullet types, which can be called by attacks

import { attackData } from "./attack_handler.js";

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


export { Bullet };
