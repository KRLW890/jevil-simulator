class TPBar {
	constructor(game) {
		this.game = game;

		this.percent = 0;
		this.displayedPercent = 0;
		this.image = game.sprites.tpBar;
	}

	display() {
		const { sketch } = this.game;

		sketch.noStroke();
		sketch.fill(128, 0, 0);
		sketch.rect(42, 46, 19, 187);
		sketch.stroke(255);
		sketch.strokeWeight(2);
		if (this.percent === this.displayedPercent) {
			sketch.fill(255, 160, 64);
			sketch.rect(40, (1 - (this.percent / 100)) * 190 + 45, 23, 189 - (1 - (this.percent / 100)) * 190);
		} else if (this.percent > this.displayedPercent) {
			sketch.fill(255);
			sketch.rect(40, (1 - (this.percent / 100)) * 190 + 45, 23, 189 - (1 - (this.percent / 100)) * 190);
			sketch.fill(255, 160, 64);
			sketch.rect(40, (1 - (this.displayedPercent / 100)) * 190 + 45, 23, 189 - (1 - (this.displayedPercent / 100)) * 190);
			this.displayedPercent += (this.percent - this.displayedPercent) / 4;
		} else {
			sketch.fill(255, 0, 0);
			sketch.rect(40, (1 - (this.displayedPercent / 100)) * 190 + 45, 23, 189 - (1 - (this.displayedPercent / 100)) * 190);
			sketch.noStroke();
			sketch.fill(255, 160, 64);
			sketch.rect(40, (1 - (this.percent / 100)) * 190 + 45, 23, 189 - (1 - (this.percent / 100)) * 190);
			this.displayedPercent += (this.percent - this.displayedPercent) / 4;
		}
		sketch.noStroke();

		sketch.image(this.image, 9, 41);

		sketch.textFont(window.fonts.main);
		sketch.textSize(32);
		if (this.percent < 100) {
			sketch.fill(255);
			sketch.text(this.percent + "", 9, 135);
			sketch.text("%", 14, 160);
		} else {
			sketch.fill(255, 255, 0);
			sketch.text("M", 9, 135);
			sketch.text("A", 14, 155);
			sketch.text("X", 19, 175);
		}
	}
}

export default TPBar;
