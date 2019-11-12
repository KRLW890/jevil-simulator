const temporaryGlobals = {
	"animations": "writable",
	"armors": "writable",
	"attackData": "writable",
	"attacks": "writable",
	"background": "writable",
	"canvas": "writable",
	"ceil": "writable",
	"color": "writable",
	"createCanvas": "writable",
	"executeAttack": "writable",
	"fill": "writable",
	"fonts": "writable",
	"frameRate": "writable",
	"handleKeys": "writable",
	"HeartBomb": "writable",
	"image": "writable",
	"initAll": "writable",
	"keyCode": "writable",
	"keys": "writable",
	"LEFT": "writable",
	"loadFont": "writable",
	"loadImage": "writable",
	"Member": "writable",
	"noFill": "writable",
	"noSmooth": "writable",
	"noStroke": "writable",
	"party": "writable",
	"pointer": "writable",
	"printText": "writable",
	"processTurn": "writable",
	"rect": "writable",
	"RIGHT": "writable",
	"SpriteAnimation": "writable",
	"sprites": "writable",
	"strokeWeight": "writable",
	"stroke": "writable",
	"textAlign": "writable",
	"textbox": "writable",
	"textFont": "writable",
	"textSize": "writable",
	"text": "writable",
	"tpBar": "writable",
	"turnPhase": "writable",
	"weapons": "writable",
};

module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly",
		...temporaryGlobals
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
