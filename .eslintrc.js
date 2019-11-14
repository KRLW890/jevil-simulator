const temporaryGlobals = {
	"animations": "writable",
	"fonts": "writable",
	"keys": "writable",
	"party": "writable",
	"pointer": "writable",
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
		"p5": "readonly",
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
		/*
		Causes issues with git's autocrlf
		"linebreak-style": [
			"error",
			"unix"
		],
		*/
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
