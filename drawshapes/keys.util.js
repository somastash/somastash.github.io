export const keyCodes = {
	backspace: 8,
	tab: 9,
	enter: 13,
	shift: 16,
	ctrl: 17,
	alt: 18,
	// pause/break: 19,
	// caps lock: 20,
	esc: 27,
	space: 32,
	pageUp: 33,
	pageDown: 34,
	end: 35,
	home: 36,
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	insert: 45,
	delete: 46,
	command: 91,
	// left command: 91,
	// right command: 93,
	numpadMultiply: 106,
	numpadAdd: 107,
	numpadSubtract: 109,
	// numpad .: 110,
	numpadDivide: 111,
	// num lock: 144,
	// scroll lock: 145,
	// my computer: 182,
	// my calculator: 183,
	semicolon: 186,
	equal: 187,
	comma: 188,
	minus: 189,
	period: 190,
	slash: 191,
	backquote: 192,
	bracketleft: 219,
	backslash: 220,
	bracketright: 221,
	quote: 222,
};

// lower case chars
for (let i = 97; i < 123; i++) keyCodes[String.fromCharCode(i)] = i - 32;

// numbers
for (let i = 48; i < 58; i++) keyCodes[i - 48] = i

// function keys
for (let i = 1; i < 13; i++) keyCodes['f'+i] = i + 111

// numpad keys
for (let i = 0; i < 10; i++) keyCodes['numpad'+i] = i + 96

