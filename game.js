var canvas = document.getElementById("screen");
var ctx = canvas.getContext('2d');

var main = function () {
    processing.background(43, 51, 159);
    var xy = [{ x: 74, y: 98 }, { x: 54, y: 156 }, { x: 100, y: 214 }]; // temporary variables; I plan to implement this better later
    for (var i = 0; i < 3; i++) {
        party[i].idle.play(xy[i].x, xy[i].y, true, 4);
        party[i].drawMenu(processing, i);
    }

    tp.draw(processing);
};

var processing = new Processing(canvas, function (processing) {
    processing.setup = function () {
        processing.size(640, 480);
        processing.background(43, 51, 159);
        processing.frameRate(30);

        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
    }
    processing.draw = main;
});
