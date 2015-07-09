'use strict';

var plugin = require('./');
require('./playground.prism.js');

function pen() {
	// create elements
	var block  = document.createElement('span');
	var style  = block.appendChild(document.createElement('span'));
	var caret  = block.appendChild(document.createElement('span'));
	var input  = block.appendChild(document.createElement('textarea'));
	var output = block.appendChild(document.createElement('span'));
	var symbol = document.createElement('span');

	// define input
	input.setAttribute('wrap', 'off');
	input.setAttribute('spellcheck', 'false');

	// style elements
	block.className  = 'pen-block';
	style.className  = 'pen-style';
	caret.className  = 'pen-caret';
	input.className  = 'pen-input';
	output.className = 'pen-output';
	symbol.className = 'pen-caret-symbol';

	// symbol solidity
	var symbolIsActive;

	function activateSymbol() {
		if (!symbolIsActive) {
			symbol.className += ' is-active';

			symbolIsActive = true;
		}
	}

	function deactivateSymbol() {
		if (symbolIsActive) {
			symbol.className = symbol.className.replace(' is-active', '');

			symbolIsActive = false;
		}
	}

	function removeSymbol() {
		caret.removeChild(symbol);
	}

	// focus event
	function onfocus(event) {
		oncaretmove();
	}

	// blur event
	function onblur(event) {
		removeSymbol();
	}

	// keydown event
	function onkeydown(event) {
		if (event.keyCode === 9) ontabdown(event);
		if (event.metaKey && event.keyCode === 83) onsave(event);

		// update caret symbol
		activateSymbol();

		// bind key up event
		document.addEventListener('keyup', onkeyup);

		setTimeout(oncaretmove);
	}

	// keyup event
	function onkeyup(event) {
		// update caret symbol
		deactivateSymbol();

		// unbind key up event
		document.removeEventListener('keyup', onkeyup);
	}

	// pointerdown event
	function onpointerdown(event) {
		// update caret symbol
		activateSymbol();

		// delay caret
		setTimeout(oncaretmove);

		// bind pointerdown event
		window.addEventListener('mouseup', onpointerup);
	}

	// pointerup event
	function onpointerup(event) {
		// update caret symbol
		deactivateSymbol();

		// unbind pointerup event
		window.removeEventListener('mouseup', onpointerup);
	}

	// tabdown event
	function ontabdown(event) {
		// prevent default action
		event.preventDefault();

		var start = input.selectionStart;

		// insert tab character
		input.value = input.value.slice(0, start) +
			'\t' +
			input.value.slice(input.selectionEnd);

		// update selection range
		input.selectionStart = input.selectionEnd = start + 1;

		// dispatch input event
		oninput();
	}

	// save event
	function onsave(event) {
		// prevent default action
		event.preventDefault();

		location.hash = toHash(input.value);
	}

	// scroll event
	function onscroll() {
		// match scroll position
		caret.scrollTop = style.scrollTop = input.scrollTop;
		caret.scrollLeft = style.scrollLeft = input.scrollLeft;
	}

	// input event
	function oninput(event) {
		oncaretmove();

		// set input and output
		var inputValue  = input.value;
		var outputValue = inputValue;

		// try to process output 
		try { outputValue = plugin.process(outputValue, { safe: true }); } catch (e) {}

		// set style and output
		style.innerHTML  = Prism.highlight(inputValue,  Prism.languages.scss);
		output.innerHTML = Prism.highlight(outputValue, Prism.languages.scss);
	}

	// caretmove event
	function oncaretmove(event) {
		// remove caret elements
		while (caret.lastChild) caret.removeChild(caret.lastChild);

		// set selection point
		var selectionPoint = input.selectionDirection === 'backward' ? input.selectionStart : input.selectionEnd;

		// append content before selection point
		caret.appendChild(document.createTextNode(input.value.slice(0, selectionPoint)));

		// conditionally append caret symbol
		if (document.activeElement === input) caret.appendChild(symbol);

		// append content after selection point
		caret.appendChild(document.createTextNode(input.value.slice(selectionPoint)));
	}

	function fromHash(string) {
		return decodeURIComponent(string.replace(/\+/g, ' '));
	}

	function toHash(string) {
		return encodeURIComponent(string)
			.replace(/%20/g, '+')
			.replace(/%24/g, '$')
			.replace(/%26/g, '&')
			.replace(/%3A/g, ':')
			.replace(/%3B/g, ';')
			.replace(/%40/g, '@');
	}

	// bind events
	input.addEventListener('focus', onfocus);
	input.addEventListener('keydown', onkeydown);
	input.addEventListener('input', oninput);
	input.addEventListener('mousedown', onpointerdown);
	input.addEventListener('scroll', onscroll);

	// set value
	input.value = location.href.slice(-1) === '#' || location.hash ? fromHash(location.hash.slice(1)) : '@define-mixin icon $name {\n\tpadding-left: 16px;\n\n\t&::after {\n\t\tcontent: "";\n\t\tbackground-url: url(/icons/$(name).png);\n\t}\n}\n\n$blue: #056ef0;\n$column: 200px;\n\n.search {\n\t@mixin icon search;\n}\n\n.menu {\n\tbackground: color($blue blackness(20%));\n\twidth: calc(4 * $column);\n}\n\n.foo {\n\t@if 3 < 5 {\n\t\tbackground: green;\n\t} @else {\n\t\tbackground: yellow;\n\t}\n}\n\n@for $i from 10 to 30 by 10 {\n\t.b-$i { width: $(i)px; }\n}\n\n@each $icon in (foo, bar, baz) {\n\t.icon-$(icon) {\n\t\tbackground: url(icons/$icon.png);\n\t}\n}';

	oninput();

	// append element
	document.body.appendChild(block);
}

// run
pen();
