class KeyboardHandler {
	constructor() {
		this.pressedKeyCodes = {};
	}

	isPressed(keyCode) {
		return this.pressedKeyCodes[keyCode];
	}

	pressKey(keyCode) {
		this.pressedKeyCodes[keyCode] = true;
	}

	releaseKey(keyCode) {
		if (keyCode in this.pressedKeyCodes) {
			delete this.pressedKeyCodes[keyCode];
		}
	}

	releaseAll() {
		this.pressedKeyCodes = {};
	}
}

KeyboardHandler.keyCodes = {
	LEFT_ARROW: 37,
	UP_ARROW: 38,
	RIGHT_ARROW: 39,
	DOWN_ARROW: 40,
	X: 88,
	Z: 90
};

export default KeyboardHandler;
