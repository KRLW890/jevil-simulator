var krisAnim;

function preload() {
    initAll();
}

function setup() {
    canvas = createCanvas(640, 480);
    canvas.parent("game-container");
    noSmooth();
    frameRate(30);
}

function draw() {
    background(43, 51, 159);
    var xy = [{ x: 74, y: 98 }, { x: 54, y: 156 }, { x: 100, y: 214 }]; // temporary variables; I plan to implement this better later
    for (var i = 0; i < 3; i++) {
        //party[i].idle.play(xy[i].x, xy[i].y, true, 4);
        //party[i].drawMenu(i);
    }

    //tpBar.display();
}