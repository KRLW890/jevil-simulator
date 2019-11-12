const temporaryGlobals = {
	"animations": "writable",
	"armors": "writable",
	"attackData": "writable",
	"attacks": "writable",
	"canvas": "writable",
	"executeAttack": "writable",
	"fonts": "writable",
	"handleKeys": "writable",
	"HeartBomb": "writable",
	"initAll": "writable",
	"keys": "writable",
	"Member": "writable",
	"p5": "readonly",
	"party": "writable",
	"pointer": "writable",
	"printText": "writable",
	"processTurn": "writable",
	"SpriteAnimation": "writable",
	"sprites": "writable",
	"textbox": "writable",
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
		"brace-style": [
			"error",
			"1tbs"
		],
		"curly": [
			"error"
		],
		"indent": [
			"error",
			"tab"
		],
		"keyword-spacing": [
			"error"
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
