import { Member } from "./party_handler.js";
import { SpriteAnimation } from "./image_handler.js";

const loadSprites = function (game) {
	const { sketch } = game;

	return {
		kris: {
			idle: sketch.loadImage("src/sprites/kris-idle.png"),
			intro: sketch.loadImage("src/sprites/kris-intro.png"),
			fight: sketch.loadImage("src/sprites/kris-attack.png"),
			magic: sketch.loadImage("src/sprites/kris-pirouette.png"),
			act: sketch.loadImage("src/sprites/kris-act.png"),
			mercy: null, // TODO: Add spritesheet
			item: sketch.loadImage("src/sprites/kris-item.png"),
			defend: null, // TODO: Add spritesheet
			damage: sketch.loadImage("src/sprites/kris-damage.png"),
			down: sketch.loadImage("src/sprites/kris-down.png"),
			menuName: sketch.loadImage("src/sprites/kris-text.png"),
			icons: [
				sketch.loadImage("src/sprites/kris-icon0.png"),
				sketch.loadImage("src/sprites/kris-icon1.png")
			]
		},
		susie: {
			idle: sketch.loadImage("src/sprites/susie-idle.png"),
			intro: null, // TODO: Add spritesheet
			fight: sketch.loadImage("src/sprites/susie-attack.png"),
			magic: null, // TODO: Add spritesheet
			act: null, // TODO: Add spritesheet
			item: sketch.loadImage("src/sprites/susie-item.png"),
			mercy: sketch.loadImage("src/sprites/susie-spare.png"),
			defend: sketch.loadImage("src/sprites/susie-defend.png"),
			damage: sketch.loadImage("src/sprites/susie-damage.png"),
			down: sketch.loadImage("src/sprites/susie-down.png"),
			menuName: sketch.loadImage("src/sprites/susie-text.png"),
			icons: [
				sketch.loadImage("src/sprites/susie-icon0.png"),
				sketch.loadImage("src/sprites/susie-icon1.png")
			]
		},
		ralsei: {
			idle: sketch.loadImage("src/sprites/ralsei-idle.png"),
			intro: sketch.loadImage("src/sprites/ralsei-intro.png"),
			fight: sketch.loadImage("src/sprites/ralsei-attack.png"),
			magic: sketch.loadImage("src/sprites/ralsei-spell.png"),
			act: null, // TODO: Add spritesheet
			item: sketch.loadImage("src/sprites/ralsei-item.png"),
			//Same as magic
			mercy: sketch.loadImage("src/sprites/ralsei-spell.png"),
			defend: sketch.loadImage("src/sprites/ralsei-defend.png"),
			damage: sketch.loadImage("src/sprites/ralsei-damage.png"),
			down: sketch.loadImage("src/sprites/ralsei-down.png"),
			menuName: sketch.loadImage("src/sprites/ralsei-text.png"),
			icons: [
				sketch.loadImage("src/sprites/ralsei-icon0.png"),
				sketch.loadImage("src/sprites/ralsei-icon1.png")
			]
		},
		menu: {
			hpBar: sketch.loadImage("src/sprites/hpbar.png"),
			options: sketch.loadImage("src/sprites/menu.png"),
			selected: sketch.loadImage("src/sprites/selections.png")
		},
		tpBar: sketch.loadImage("src/sprites/tpBar.png"),
		tpGraze: sketch.loadImage("src/sprites/tpgraze.png"),
		soul: sketch.loadImage("src/sprites/playersoul.png"),
		jevil: {
			misc: sketch.loadImage("src/sprites/Jevil-misc.png")
		},
		bullets: {
			bombClub: sketch.loadImage("src/sprites/bullets/bomb-club.png"),
			bombDiamond: sketch.loadImage("src/sprites/bullets/bomb-diamond.png"),
			bombHeart: sketch.loadImage("src/sprites/bullets/bomb-heart.png"),
			bombSpade: sketch.loadImage("src/sprites/bullets/bomb-spade.png"),
			heart: sketch.loadImage("src/sprites/bullets/bullet-heart.png"),
			spade: sketch.loadImage("src/sprites/bullets/bullet-ace.png")
		}
	};
};

const loadFonts = function(game) {
	const { sketch } = game;

	window.fonts = {
		main: sketch.loadFont("src/fonts/8bitoperator_jve.ttf"),
		hp: sketch.loadFont("src/fonts/hpfont.ttf")
	};
};

const initParty = function(game) {
	const { sketch, sprites } = game;

	return [
		new Member(game, "Kris", sketch.color(0, 255, 255), 0, 90, 10, 2, 0, 4, 3, 2,
			new SpriteAnimation(sketch, sprites.kris.idle, 6), // idle
			new SpriteAnimation(sketch, sprites.kris.intro, 12), // intro
			new SpriteAnimation(sketch, sprites.kris.fight, 7), // fight
			new SpriteAnimation(sketch, sprites.kris.magic, 6), // magic (it's actually Kris' pirouette)
			new SpriteAnimation(sketch, sprites.kris.act, 12), // act
			new SpriteAnimation(sketch, sprites.kris.item, 7), // item
			null, // mercy   TODO: add SpriteAnimation
			null, // defend  TODO: add SpriteAnimation
		),
		new Member(game, "Susie", sketch.color(255, 0, 255), 1, 110, 14, 2, 1, 5, 5, 2,
			new SpriteAnimation(sketch, sprites.susie.idle, 4), // idle
			null, // intro
			new SpriteAnimation(sketch, sprites.susie.attack, 6), // fight
			null, // magic
			null, // act
			new SpriteAnimation(sketch, sprites.susie.item, 5), // item
			new SpriteAnimation(sketch, sprites.susie.spare, 9), // mercy
			new SpriteAnimation(sketch, sprites.susie.defend, 6) // defend
		),
		new Member(game, "Ralsei", sketch.color(0, 255, 0), 2, 70, 8, 2, 7, 9, 4, 2,
			new SpriteAnimation(sketch, sprites.ralsei.idle, 5), // idle
			new SpriteAnimation(sketch, sprites.ralsei.intro, 9), // intro
			new SpriteAnimation(sketch, sprites.ralsei.fight, 6), // fight
			new SpriteAnimation(sketch, sprites.ralsei.magic, 10) // magic
			// act
			//new SpriteAnimation(sketch, "images/ralsei-item.png", 8), // item
			//this.magic, // mercy
			//new SpriteAnimation(sketch, "images/ralsei-defend.png", 8) // defend
		)
	];
};

// for miscellaneous animations
const initAnimations = function(game) {
	const { sketch, sprites } = game;

	window.animations = {
		playerSoul: new SpriteAnimation(sketch, sprites.soul, 2),
		tpGraze: new SpriteAnimation(sketch, sprites.tpGraze, 4)
	};
};

const initAll = function(game) {
	loadFonts(game);
	initParty(game);
	initAnimations(game);
};

export { loadSprites, initParty, initAll };
