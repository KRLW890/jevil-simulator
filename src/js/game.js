/* eslint-disable no-unused-vars */

import { textbox, processTurn } from "./turn_handler.js";

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

function preload() {
	initAll(p5.instance);
}

function setup() {
	canvas = p5.instance.createCanvas(640, 480);
	canvas.parent("game-container");
	p5.instance.noSmooth();
	p5.instance.frameRate(30);
	//For testing only
	//TODO: remove `window` references
	window.printText = function (t, x, y) {
		p5.instance.text(t.slice(0, p5.instance.ceil(pointer)), x, y);
	};
}

function draw() {
	var i;

	p5.instance.background(43, 51, 159);

	var xy = [{ x: 74, y: 98 }, { x: 54, y: 156 }, { x: 100, y: 214 }]; // temporary variables; I plan to implement this better later
	for (i = 0; i < 3; i++) {
		party[i].idle.play(xy[i].x, xy[i].y, true, 6);
	}
	if (turnPhase == 11) {
		p5.instance.background(0);
	}
	textbox.display(p5.instance);
	for (i = 0; i < 3; i++) {
		party[i].drawMenu(i); // so that the menu will always appear on top of the character sprites
	}

	tpBar.display();
	processTurn(p5.instance);

	/*
    //for testing fonts:
    textFont(fonts.main);
    fill(255);
    textSize(150);
    printText("Hello,\n World", 100, 100, 10);
    pointer += 0.1;
*/

	// if it's not in the bullet hell phase
	if (turnPhase !== 11) {
		handleKeys();
	}
}

//TODO: remove `window` references
window.pointer = 0;

window.preload = preload;
window.setup = setup;
window.draw = draw;

window.keys = keys;
window.keyPressed = keyPressed;
window.keyReleased = keyReleased;
