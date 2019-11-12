const temporaryGlobals = {
	"animations": "writable",
	"canvas": "writable",
	"fonts": "writable",
	"handleKeys": "writable",
	"initAll": "writable",
	"keys": "writable",
	"p5": "readonly",
	"party": "writable",
	"pointer": "writable",
	"printText": "writable",
	"sprites": "writable",
	"tpBar": "writable",
	"turnPhase": "writable",
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
