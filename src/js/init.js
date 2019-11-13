/* eslint-disable no-unused-vars */

import { Member } from "./party_handler.js";
import { SpriteAnimation } from "./image_handler.js";

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
	keys.all[p5.instance.keyCode] = true;
}
function keyReleased() {
	keys.all[p5.instance.keyCode] = false;
}
function handleKeys() {
	for (var i = 0; i < keys.all.length; i++) {
		keys.all[i] = false;
	}
}

function loadSprites() {
	window.sprites = {
		kris: {
			idle: p5.instance.loadImage("src/sprites/kris-idle.png"),
			intro: p5.instance.loadImage("src/sprites/kris-intro.png"),
			fight: p5.instance.loadImage("src/sprites/kris-attack.png"),
			magic: p5.instance.loadImage("src/sprites/kris-pirouette.png"),
			act: p5.instance.loadImage("src/sprites/kris-act.png"),
			mercy: null, // TODO: Add spritesheet
			item: p5.instance.loadImage("src/sprites/kris-item.png"),
			defend: null, // TODO: Add spritesheet
			damage: p5.instance.loadImage("src/sprites/kris-damage.png"),
			down: p5.instance.loadImage("src/sprites/kris-down.png"),
			menuName: p5.instance.loadImage("src/sprites/kris-text.png"),
			icons: [
				p5.instance.loadImage("src/sprites/kris-icon0.png"),
				p5.instance.loadImage("src/sprites/kris-icon1.png")
			]
		},
		susie: {
			idle: p5.instance.loadImage("src/sprites/susie-idle.png"),
			intro: null, // TODO: Add spritesheet
			fight: p5.instance.loadImage("src/sprites/susie-attack.png"),
			magic: null, // TODO: Add spritesheet
			act: null, // TODO: Add spritesheet
			item: p5.instance.loadImage("src/sprites/susie-item.png"),
			mercy: p5.instance.loadImage("src/sprites/susie-spare.png"),
			defend: p5.instance.loadImage("src/sprites/susie-defend.png"),
			damage: p5.instance.loadImage("src/sprites/susie-damage.png"),
			down: p5.instance.loadImage("src/sprites/susie-down.png"),
			menuName: p5.instance.loadImage("src/sprites/susie-text.png"),
			icons: [
				p5.instance.loadImage("src/sprites/susie-icon0.png"),
				p5.instance.loadImage("src/sprites/susie-icon1.png")
			]
		},
		ralsei: {
			idle: p5.instance.loadImage("src/sprites/ralsei-idle.png"),
			intro: p5.instance.loadImage("src/sprites/ralsei-intro.png"),
			fight: p5.instance.loadImage("src/sprites/ralsei-attack.png"),
			magic: p5.instance.loadImage("src/sprites/ralsei-spell.png"),
			act: null, // TODO: Add spritesheet
			item: p5.instance.loadImage("src/sprites/ralsei-item.png"),
			//Same as magic
			mercy: p5.instance.loadImage("src/sprites/ralsei-spell.png"),
			defend: p5.instance.loadImage("src/sprites/ralsei-defend.png"),
			damage: p5.instance.loadImage("src/sprites/ralsei-damage.png"),
			down: p5.instance.loadImage("src/sprites/ralsei-down.png"),
			menuName: p5.instance.loadImage("src/sprites/ralsei-text.png"),
			icons: [
				p5.instance.loadImage("src/sprites/ralsei-icon0.png"),
				p5.instance.loadImage("src/sprites/ralsei-icon1.png")
			]
		},
		menu: {
			hpBar: p5.instance.loadImage("src/sprites/hpbar.png"),
			options: p5.instance.loadImage("src/sprites/menu.png"),
			selected: p5.instance.loadImage("src/sprites/selections.png")
		},
		tpBar: p5.instance.loadImage("src/sprites/tpBar.png"),
		tpGraze: p5.instance.loadImage("src/sprites/tpgraze.png"),
		soul: p5.instance.loadImage("src/sprites/playersoul.png"),
		jevil: {
			misc: p5.instance.loadImage("src/sprites/Jevil-misc.png")
		},
		bullets: {
			bombClub: p5.instance.loadImage("src/sprites/bullets/bomb-club.png"),
			bombDiamond: p5.instance.loadImage("src/sprites/bullets/bomb-diamond.png"),
			bombHeart: p5.instance.loadImage("src/sprites/bullets/bomb-heart.png"),
			bombSpade: p5.instance.loadImage("src/sprites/bullets/bomb-spade.png"),
			heart: p5.instance.loadImage("src/sprites/bullets/bullet-heart.png"),
			spade: p5.instance.loadImage("src/sprites/bullets/bullet-ace.png")
		}
	};
}

function loadFonts() {
	window.fonts = {
		main: p5.instance.loadFont("src/fonts/8bitoperator_jve.ttf"),
		hp: p5.instance.loadFont("src/fonts/hpfont.ttf")
	};
}

function initParty() {
	const sprites = window.sprites;

	window.party = [
		new Member(p5.instance, "Kris", p5.instance.color(0, 255, 255), 90, 10, 2, 0, 4, 3, 2,
			new SpriteAnimation(p5.instance, sprites.kris.idle, 6), // idle
			new SpriteAnimation(p5.instance, sprites.kris.intro, 12), // intro
			new SpriteAnimation(p5.instance, sprites.kris.fight, 7), // fight
			new SpriteAnimation(p5.instance, sprites.kris.magic, 6), // magic (it's actually Kris' pirouette)
			new SpriteAnimation(p5.instance, sprites.kris.act, 12), // act
			new SpriteAnimation(p5.instance, sprites.kris.item, 7), // item
			null, // mercy   TODO: add SpriteAnimation
			null, // defend  TODO: add SpriteAnimation
		),
		new Member(p5.instance,"Susie", p5.instance.color(255, 0, 255), 110, 14, 2, 1, 5, 5, 2,
			new SpriteAnimation(p5.instance, sprites.susie.idle, 4), // idle
			null, // intro
			new SpriteAnimation(p5.instance, "images/susie-attack.png", 6), // fight
			null, // magic
			null, // act
			new SpriteAnimation(p5.instance, "images/susie-item.png", 5), // item
			new SpriteAnimation(p5.instance, "images/susie-spare.png", 9), // mercy
			new SpriteAnimation(p5.instance, "images/susie-defend.png", 6) // defend
		),
		new Member(p5.instance,"Ralsei", p5.instance.color(0, 255, 0), 70, 8, 2, 7, 9, 4, 2,
			new SpriteAnimation(p5.instance, sprites.ralsei.idle, 5), // idle
			new SpriteAnimation(p5.instance, sprites.ralsei.intro, 9), // intro
			new SpriteAnimation(p5.instance, sprites.ralsei.fight, 6), // fight
			new SpriteAnimation(p5.instance, sprites.ralsei.magic, 10) // magic
			// act
			//new SpriteAnimation(p5.instance, "images/ralsei-item.png", 8), // item
			//this.magic, // mercy
			//new SpriteAnimation(p5.instance, "images/ralsei-defend.png", 8) // defend
		)
	];
}


function initTPBar() {
	const sprites = window.sprites;
	window.tpBar = {
		percent: 0,
		displayedPercent: 0,
		image: sprites.tpBar,
		display: function () {
			p5.instance.noStroke();
			p5.instance.fill(128, 0, 0);
			p5.instance.rect(42, 46, 19, 187);
			p5.instance.stroke(255);
			p5.instance.strokeWeight(2);
			if (this.percent == this.displayedPercent) {
				p5.instance.fill(255, 160, 64);
				p5.instance.rect(40, (1 - (this.percent / 100)) * 190 + 45, 23, 189 - (1 - (this.percent / 100)) * 190);
			} else if (this.percent > this.displayedPercent) {
				p5.instance.fill(255);
				p5.instance.rect(40, (1 - (this.percent / 100)) * 190 + 45, 23, 189 - (1 - (this.percent / 100)) * 190);
				p5.instance.fill(255, 160, 64);
				p5.instance.rect(40, (1 - (this.displayedPercent / 100)) * 190 + 45, 23, 189 - (1 - (this.displayedPercent / 100)) * 190);
				this.displayedPercent += (this.percent - this.displayedPercent) / 4;
			} else {
				p5.instance.fill(255, 0, 0);
				p5.instance.rect(40, (1 - (this.displayedPercent / 100)) * 190 + 45, 23, 189 - (1 - (this.displayedPercent / 100)) * 190);
				p5.instance.noStroke();
				p5.instance.fill(255, 160, 64);
				p5.instance.rect(40, (1 - (this.percent / 100)) * 190 + 45, 23, 189 - (1 - (this.percent / 100)) * 190);
				this.displayedPercent += (this.percent - this.displayedPercent) / 4;
			}
			p5.instance.noStroke();

			p5.instance.image(this.image, 9, 41);

			p5.instance.textFont(window.fonts.main);
			p5.instance.textSize(32);
			if (this.percent < 100) {
				p5.instance.fill(255);
				p5.instance.text(this.percent + "", 9, 135);
				p5.instance.text("%", 14, 160);
			} else {
				p5.instance.fill(255, 255, 0);
				p5.instance.text("M", 9, 135);
				p5.instance.text("A", 14, 155);
				p5.instance.text("X", 19, 175);
			}
		}
	};
}

function initAnimations() { // for miscellaneous animations
	const sprites = window.sprites;
	window.animations = {
		playerSoul: new SpriteAnimation(p5.instance, sprites.soul, 2),
		tpGraze: new SpriteAnimation(p5.instance, sprites.tpGraze, 4)
	};
}

function initAll() {
	loadSprites();
	loadFonts();
	initParty();
	initTPBar();
	initAnimations();
}

//TODO: remove `window` references
window.initAll = initAll;
window.keys = keys;
window.keyPressed = keyPressed;
window.keyReleased = keyReleased;
window.handleKeys = handleKeys;
