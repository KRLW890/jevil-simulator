/* eslint-disable no-unused-vars */

import { textbox, processTurn } from "./turn_handler.js";
import { initAll } from "./init.js";

const sketch = new p5(() => {});

window.turnPhase = 0;
window.currentTurn = 0;

var keys = {
	all: [],
	up: 38, down: 40, left: 37, right: 39,
	select: 90, cancel: 88,
	pressed: function(code) {
		return keys.all[code];
	}
};
function keyPressed() {
	keys.all[sketch.keyCode] = true;
}
function keyReleased() {
	keys.all[sketch.keyCode] = false;
}
function handleKeys() {
	for (var i = 0; i < keys.all.length; i++) {
		keys.all[i] = false;
	}
}

function preload() {
	initAll(sketch);
}

function setup() {
	const canvas = sketch.createCanvas(640, 480);
	canvas.parent("game-container");
	sketch.noSmooth();
	sketch.frameRate(30);
}

function draw() {
	var i;

	sketch.background(43, 51, 159);

	var xy = [{ x: 74, y: 98 }, { x: 54, y: 156 }, { x: 100, y: 214 }]; // temporary variables; I plan to implement this better later
	for (i = 0; i < 3; i++) {
		party[i].idle.play(xy[i].x, xy[i].y, true, 6);
	}
	if (turnPhase == 11) {
		sketch.background(0);
	}
	textbox.display(sketch);
	for (i = 0; i < 3; i++) {
		party[i].drawMenu(i); // so that the menu will always appear on top of the character sprites
	}

	tpBar.display();
	processTurn(sketch);

	// if it's not in the bullet hell phase
	if (turnPhase !== 11) {
		handleKeys();
	}
}

sketch.preload = preload;
sketch.setup = setup;
sketch.draw = draw;
sketch.keyPressed = keyPressed;
sketch.keyReleased = keyReleased;

//TODO: remove `window` references
window.keys = keys;
