import HeartBomb from "./struct/bullets/HeartBomb.js";

var attackData = {
	id: 2, // determines which attack to use this turn
	baseDamage: 40,
	bullets: [],
	duration: 0, // number of frames until the attack ends
	target: 0, // 0-2 means it only targets one character, 3 means it targets everyone

	playerX: 320,
	playerY: 175,
	iFrames: 0, // number of invincibility frames the player currently has
	collision: false // Using "attackData.collision = false;" instead of "this.hit()" in the Bullet.move functions will make testing collision easier
};

var executeAttack = function(sketch) {
	sketch.stroke(0, 192, 0);
	sketch.fill(0);
	sketch.strokeWeight(4);
	sketch.rect(248, 98, 146, 146); // battle box

	if (keys.pressed(keys.up) && attackData.playerY > 108) {
		attackData.playerY -= 4;
		if (attackData.playerY < 108) {
			attackData.playerY = 108;
		}
	} else if (keys.pressed(keys.down) && attackData.playerY < 234) {
		attackData.playerY += 4;
		if (attackData.playerY > 234) {
			attackData.playerY = 234;
		}
	}
	if (keys.pressed(keys.left) && attackData.playerX > 258) {
		attackData.playerX -= 4;
		if (attackData.playerX < 258) {
			attackData.playerX = 258;
		}
	} else if (keys.pressed(keys.right) && attackData.playerX < 384) {
		attackData.playerX += 4;
		if (attackData.playerX > 384) {
			attackData.playerX = 384;
		}
	}

	// for debugging
	if (attackData.collision) {
		animations.playerSoul.drawFrame(attackData.playerX-8, attackData.playerY-8, 1);
	} else if (attackData.iFrames > 0) {
		animations.playerSoul.play(attackData.playerX-8, attackData.playerY-8, true, 6);
		attackData.iFrames--;
	} else {
		animations.playerSoul.drawFrame(attackData.playerX-8, attackData.playerY-8, 0);
	}

	attacks[attackData.id].spawnBullets(sketch);

	attackData.collision = false; // for debugging
	for (var i = 0; i < attackData.bullets.length; i++) {
		if (attackData.bullets[i] != null) {
			// if the function returns true, delete it from the array
			if (attackData.bullets[i].move() === true) {
				attackData.bullets[i] = null;
			}
		}
	}

	attackData.duration--;
	if (attackData.duration <= 0) {
		turnPhase++;
	}
};


class Attack {
	constructor(baseDamage, isMultiTarget, duration) {
		this.baseDamage = baseDamage;
		this.isMultiTarget = isMultiTarget;
		this.duration = duration || 300; // how many frames the attack lasts
		this.spawnBullets = function() {}; // will be filled in later. This function determines which bullets are spawned and when
	}

	prepareAttack() {
		attackData.baseDamage = this.baseDamage;
		attackData.duration = this.duration;
		if (this.isMultiTarget) {
			attackData.target = 3;
		} else {
			attackData.target = Math.floor(Math.random()*3);
		}

		attackData.playerX = 320;
		attackData.playerY = 175;
	}
}

var addBullet = function(bullet) { // should be called as addBullet(new BulletType());
	var i = 0;
	while (attackData.bullets[i] != null) {
		i++;
	}

	attackData.bullets[i] = bullet;
};

var attacks = [
	new Attack(50, false), // tiny "ohp" spades
	new Attack(50, false), // big spade ringaround 1
	new Attack(40, true),  // heart bombs
	new Attack(60, false), // devilsknife 1
	new Attack(50, false), // carousel 1
	new Attack(40, true),  // club bombs
	new Attack(50, false), // rapid fire diamonds
	new Attack(50, false), // big spade ringaround 2
	new Attack(50, false), // carousel 2
	new Attack(40, true),  // spade bombs
	new Attack(50, false), // club dots
	new Attack(60, false), // devilsknife 2
	new Attack(50, false), // tiny "ohp" diamonds
	new Attack(40, true),  // chaos bomb
	new Attack(40, false), // tired diamonds, note: gives more TP than usual by grazing
	new Attack(0, true),   // neo chaos, possibly uses unique damage formula
];

attacks[2].spawnBullets = function(sketch) {
	if (attackData.duration % 25 == 0) {
		addBullet(new HeartBomb(sketch));
	}
};

export { attackData, attacks, executeAttack };
