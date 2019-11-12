/* eslint-disable no-unused-vars */

var canvas, sprites, fonts;

var party, tpBar, animations;

var keys = {
	all: [],
	up: 38, down: 40, left: 37, right: 39,
	select: 90, cancel: 88,
	pressed: function(code) {
		return keys.all[code];
	}
};
function keyPressed() {
	keys.all[keyCode] = true;
}
function keyReleased() {
	keys.all[keyCode] = false;
}
function handleKeys() {
	for (var i = 0; i < keys.all.length; i++) {
		keys.all[i] = false;
	}
}

function loadSprites() {
	sprites = {
		kris: {
			idle: loadImage("src/sprites/kris-idle.png"),
			intro: loadImage("src/sprites/kris-intro.png"),
			fight: loadImage("src/sprites/kris-attack.png"),
			magic: loadImage("src/sprites/kris-pirouette.png"),
			act: loadImage("src/sprites/kris-act.png"),
			mercy: null, // TODO: Add spritesheet
			item: loadImage("src/sprites/kris-item.png"),
			defend: null, // TODO: Add spritesheet
			damage: loadImage("src/sprites/kris-damage.png"),
			down: loadImage("src/sprites/kris-down.png"),
			menuName: loadImage("src/sprites/kris-text.png"),
			icons: [
				loadImage("src/sprites/kris-icon0.png"),
				loadImage("src/sprites/kris-icon1.png")
			]
		},
		susie: {
			idle: loadImage("src/sprites/susie-idle.png"),
			intro: null, // TODO: Add spritesheet
			fight: loadImage("src/sprites/susie-attack.png"),
			magic: null, // TODO: Add spritesheet
			act: null, // TODO: Add spritesheet
			item: loadImage("src/sprites/susie-item.png"),
			mercy: loadImage("src/sprites/susie-spare.png"),
			defend: loadImage("src/sprites/susie-defend.png"),
			damage: loadImage("src/sprites/susie-damage.png"),
			down: loadImage("src/sprites/susie-down.png"),
			menuName: loadImage("src/sprites/susie-text.png"),
			icons: [
				loadImage("src/sprites/susie-icon0.png"),
				loadImage("src/sprites/susie-icon1.png")
			]
		},
		ralsei: {
			idle: loadImage("src/sprites/ralsei-idle.png"),
			intro: loadImage("src/sprites/ralsei-intro.png"),
			fight: loadImage("src/sprites/ralsei-attack.png"),
			magic: loadImage("src/sprites/ralsei-spell.png"),
			act: null, // TODO: Add spritesheet
			item: loadImage("src/sprites/ralsei-item.png"),
			mercy: this.magic,
			defend: loadImage("src/sprites/ralsei-defend.png"),
			damage: loadImage("src/sprites/ralsei-damage.png"),
			down: loadImage("src/sprites/ralsei-down.png"),
			menuName: loadImage("src/sprites/ralsei-text.png"),
			icons: [
				loadImage("src/sprites/ralsei-icon0.png"),
				loadImage("src/sprites/ralsei-icon1.png")
			]
		},
		menu: {
			hpBar: loadImage("src/sprites/hpbar.png"),
			options: loadImage("src/sprites/menu.png"),
			selected: loadImage("src/sprites/selections.png")
		},
		tpBar: loadImage("src/sprites/tpBar.png"),
		tpGraze: loadImage("src/sprites/tpgraze.png"),
		soul: loadImage("src/sprites/playersoul.png"),
		jevil: {
			misc: loadImage("src/sprites/Jevil-misc.png")
		},
		bullets: {
			bombClub: loadImage("src/sprites/bullets/bomb-club.png"),
			bombDiamond: loadImage("src/sprites/bullets/bomb-diamond.png"),
			bombHeart: loadImage("src/sprites/bullets/bomb-heart.png"),
			bombSpade: loadImage("src/sprites/bullets/bomb-spade.png"),
			heart: loadImage("src/sprites/bullets/bullet-heart.png"),
			spade: loadImage("src/sprites/bullets/bullet-ace.png")
		}
	};
}

function loadFonts() {
	fonts = {
		main: loadFont("src/fonts/8bitoperator_jve.ttf"),
		hp: loadFont("src/fonts/hpfont.ttf")
	};
}

function initParty() {
	party = [
		new Member("Kris", color(0, 255, 255), 90, 10, 2, 0, 4, 3, 2,
			new SpriteAnimation(sprites.kris.idle, 6), // idle
			new SpriteAnimation(sprites.kris.intro, 12), // intro
			new SpriteAnimation(sprites.kris.fight, 7), // fight
			new SpriteAnimation(sprites.kris.magic, 6), // magic (it's actually Kris' pirouette)
			new SpriteAnimation(sprites.kris.act, 12), // act
			new SpriteAnimation(sprites.kris.item, 7), // item
			null, // mercy   TODO: add SpriteAnimation
			null, // defend  TODO: add SpriteAnimation
		),
		new Member("Susie", color(255, 0, 255), 110, 14, 2, 1, 5, 5, 2,
			new SpriteAnimation(sprites.susie.idle, 4), // idle
			null, // intro
			new SpriteAnimation("images/susie-attack.png", 6), // fight
			null, // magic
			null, // act
			new SpriteAnimation("images/susie-item.png", 5), // item
			new SpriteAnimation("images/susie-spare.png", 9), // mercy
			new SpriteAnimation("images/susie-defend.png", 6) // defend
		),
		new Member("Ralsei", color(0, 255, 0), 70, 8, 2, 7, 9, 4, 2,
			new SpriteAnimation(sprites.ralsei.idle, 5), // idle
			new SpriteAnimation(sprites.ralsei.intro, 9), // intro
			new SpriteAnimation(sprites.ralsei.fight, 6), // fight
			new SpriteAnimation(sprites.ralsei.magic, 10) // magic
			// act
			//new SpriteAnimation("images/ralsei-item.png", 8), // item
			//this.magic, // mercy
			//new SpriteAnimation("images/ralsei-defend.png", 8) // defend
		)
	];
}


function initTPBar() {
	tpBar = {
		percent: 0,
		displayedPercent: 0,
		image: sprites.tpBar,
		display: function () {
			noStroke();
			fill(128, 0, 0);
			rect(42, 46, 19, 187);
			stroke(255);
			strokeWeight(2);
			if (this.percent == this.displayedPercent) {
				fill(255, 160, 64);
				rect(40, (1 - (this.percent / 100)) * 190 + 45, 23, 189 - (1 - (this.percent / 100)) * 190);
			} else if (this.percent > this.displayedPercent) {
				fill(255);
				rect(40, (1 - (this.percent / 100)) * 190 + 45, 23, 189 - (1 - (this.percent / 100)) * 190);
				fill(255, 160, 64);
				rect(40, (1 - (this.displayedPercent / 100)) * 190 + 45, 23, 189 - (1 - (this.displayedPercent / 100)) * 190);
				this.displayedPercent += (this.percent - this.displayedPercent) / 4;
			} else {
				fill(255, 0, 0);
				rect(40, (1 - (this.displayedPercent / 100)) * 190 + 45, 23, 189 - (1 - (this.displayedPercent / 100)) * 190);
				noStroke();
				fill(255, 160, 64);
				rect(40, (1 - (this.percent / 100)) * 190 + 45, 23, 189 - (1 - (this.percent / 100)) * 190);
				this.displayedPercent += (this.percent - this.displayedPercent) / 4;
			}
			noStroke();

			image(this.image, 9, 41);

			textFont(fonts.main);
			textSize(32);
			if (this.percent < 100) {
				fill(255);
				text(this.percent + "", 9, 135);
				text("%", 14, 160);
			} else {
				fill(255, 255, 0);
				text("M", 9, 135);
				text("A", 14, 155);
				text("X", 19, 175);
			}
		}
	};
}

function initAnimations() { // for miscellaneous animations
	animations = {
		playerSoul: new SpriteAnimation(sprites.soul, 2),
		tpGraze: new SpriteAnimation(sprites.tpGraze, 4)
	};
}

function initAll() {
	loadSprites();
	loadFonts();
	initParty();
	initTPBar();
	initAnimations();
}
