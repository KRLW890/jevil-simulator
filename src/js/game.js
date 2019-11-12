/* eslint-disable no-unused-vars */



function preload() {
	initAll();
}

function setup() {
	canvas = createCanvas(640, 480);
	canvas.parent("game-container");
	noSmooth();
	frameRate(30);
	//For testing only
	//TODO: remove `window` references
	window.printText = function (t, x, y) {
		text(t.slice(0, ceil(pointer)), x, y);
	};
}

function draw() {
	var i;

	background(43, 51, 159);

	var xy = [{ x: 74, y: 98 }, { x: 54, y: 156 }, { x: 100, y: 214 }]; // temporary variables; I plan to implement this better later
	for (i = 0; i < 3; i++) {
		party[i].idle.play(xy[i].x, xy[i].y, true, 6);
	}
	if (turnPhase == 11) {
		background(0);
	}
	textbox.display();
	for (i = 0; i < 3; i++) {
		party[i].drawMenu(i); // so that the menu will always appear on top of the character sprites
	}

	tpBar.display();
	processTurn();

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
