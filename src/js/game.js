import TextBox from "./struct/TextBox.js";
import TBBar from "./struct/TPBar.js";
import KeyboardHandler from "./struct/KeyboardHandler.js";

import { processTurn } from "./turn_handler.js";
import { loadSprites, initParty, loadFonts, initAnimations } from "./init.js";

class Game {
	constructor() {
		this.sketch = new p5(() => {});

		this.preload = this.preload.bind(this);
		this.setup = this.setup.bind(this);
		this.keyPressed = this.keyPressed.bind(this);
		this.keyReleased = this.keyReleased.bind(this);
		this.draw = this.draw.bind(this);

		this.sketch.preload = this.preload;
		this.sketch.setup = this.setup;
		this.sketch.keyPressed = this.keyPressed;
		this.sketch.keyReleased = this.keyReleased;
		this.sketch.draw = this.draw;
	}

	preload() {
		this.sprites = loadSprites(this);
		this.party = initParty(this);
		this.fonts = loadFonts(this);
		this.animations = initAnimations(this);
	}

	setup() {
		const canvas = this.sketch.createCanvas(640, 480);
		canvas.parent("game-container");

		this.sketch.noSmooth();
		this.sketch.frameRate(30);

		const { keyCodes } = KeyboardHandler;

		this.keyNames = {
			up: keyCodes.UP_ARROW,
			down: keyCodes.DOWN_ARROW,
			left: keyCodes.LEFT_ARROW,
			right: keyCodes.RIGHT_ARROW,
			cancel: keyCodes.X,
			select: keyCodes.Z
		};

		this.keys = new KeyboardHandler();

		this.currentTurn = 0;
		this.turnPhase = 0;

		this.tpBar = new TBBar(this);

		this.textBox = new TextBox(this.sketch);
		this.textBox.setText("* LET THE GAMES BEGIN!");

	}

	keyPressed() {
		this.keys.pressKey(this.sketch.keyCode);
		if (this.sketch.key === "l") {
			this.tpBar.percent += 10;
		}
	}

	keyReleased() {
		this.keys.releaseKey(this.sketch.keyCode);
	}

	draw() {
		this.sketch.background(43, 51, 159);

		const xy = [{ x: 74, y: 98 }, { x: 54, y: 156 }, { x: 100, y: 214 }]; // temporary variables; I plan to implement this better later
		for (let i = 0; i < 3; i++) {
			this.party[i].idle.play(xy[i].x, xy[i].y, true, 6);
		}
		if (this.turnPhase === 11) {
			this.sketch.background(0);
		}
		this.textBox.display(this.sketch);
		for (let i = 0; i < 3; i++) {
			this.party[i].drawMenu(i); // so that the menu will always appear on top of the character sprites
		}

		this.tpBar.display();
		processTurn(this);

		// if it's not in the bullet hell phase
		if (this.turnPhase !== 11) {
			this.keys.releaseAll();
		}
	}
}

window.game = new Game();
