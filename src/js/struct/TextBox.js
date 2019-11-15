class TextBox {
	constructor(sketch) {
		this.sketch = sketch;
		this.text = "";
		this.pointer = 0;
	}

	setText(text) {
		this.text = text;
		this.pointer = 0;
	}

	clear() {
		this.setText("");
	}

	display() {
		const { sketch } = this;

		sketch.fill(0);
		sketch.noStroke();
		sketch.rect(0, 326, 640, 154);

		sketch.fill(255);
		sketch.text(this.text.slice(0, sketch.ceil(this.pointer)), 35, 394);

		if (this.pointer < this.text.length) {
			this.pointer++;
		}
	}
}

export default TextBox;
