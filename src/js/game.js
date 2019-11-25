import TextBox from "./struct/TextBox.js";
import { processTurn } from "./turn_handler.js";
import { initAll } from "./init.js";

const keys = {
	all: [],
	up: 38, down: 40, left: 37, right: 39,
	select: 90, cancel: 88,
	pressed: function(code) {
		return keys.all[code];
	}
};

class Game {
	constructor() {
		this.sketch = new p5(() => {});

		this.turnPhase = 0;

		this.textBox = new TextBox(this.sketch);
		this.textBox.setText("* LET THE GAMES BEGIN!");

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
		initAll(this);
	}

	setup() {
		const canvas = this.sketch.createCanvas(640, 480);
		canvas.parent("game-container");
		this.sketch.noSmooth();
		this.sketch.frameRate(30);
	}

	keyPressed() {
		keys.all[this.sketch.keyCode] = true;
	}

	keyReleased() {
		keys.all[this.sketch.keyCode] = false;
	}

	draw() {
		this.sketch.background(43, 51, 159);

		const xy = [{ x: 74, y: 98 }, { x: 54, y: 156 }, { x: 100, y: 214 }]; // temporary variables; I plan to implement this better later
		for (let i = 0; i < 3; i++) {
			party[i].idle.play(xy[i].x, xy[i].y, true, 6);
		}
		if (this.turnPhase == 11) {
			this.sketch.background(0);
		}
		this.textBox.display(this.sketch);
		for (let i = 0; i < 3; i++) {
			party[i].drawMenu(i); // so that the menu will always appear on top of the character sprites
		}

		tpBar.display();
		processTurn(this);

		// if it's not in the bullet hell phase
		if (this.turnPhase !== 11) {
			keys.all = [];
		}
	}
}

window.game = new Game();

//TODO: remove `window` references
window.keys = keys;
window.currentTurn = 0;
