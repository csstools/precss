'use strict';

var Dacoda  = require('dacoda').Dacoda;
var dacoda  = new Dacoda();
var postcss = require('postcss');
var prism   = require('./index.prism.js');
var plugins = [
	require('precss')
];
var container = document.createElement('span');
var output    = document.createElement('span');

container.className = 'dacoda-container';
output.className    = 'dacoda-output';

document.addEventListener('DOMContentLoaded', function () {
	var defaultValue = '$blue: #056ef0;\n$column: 200px;\n\n@define-mixin icon $name {\n\tpadding-left: 16px;\n\n\t&::after {\n\t\tcontent: "";\n\t\tbackground-url: url(/icons/$name.png);\n\t}\n}\n\n@define-extend bg-green {\n\tbackground: green;\n}\n\n@define-extend bg-yellow {\n\tbackground: yellow;\n}\n\n.search {\n\t@mixin icon search;\n\n\t@extend bg-green;\n}\n\n.menu {\n\tbackground: color($blue blackness(20%));\n\twidth: calc(4 * $column);\n}\n\n.notice {\n\t@if 3 < 5 {\n\t\t@extend bg-green;\n\t} @else {\n\t\t@extend bg-yellow;\n\t}\n}\n\n@for $i from 10 to 30 by 10 {\n\t.col-$i { width: $i%; }\n}\n\n@each $icon in (foo, bar, baz) {\n\t.icon-$(icon) {\n\t\tbackground: url(icons/$icon.png);\n\t}\n}';

	dacoda.element.input.value = location.href.slice(-1) === '#' || location.hash ? fromHash(location.hash.slice(1)) : defaultValue;

	dacoda.observe('keydown').then(onkeydown);

	dacoda.observe('input').then(oninput);

	dacoda.dispatch('input');

	container.appendChild(dacoda.element.block);
	container.appendChild(output);

	document.body.appendChild(container);
});

function onkeydown(event) {
	if (event.keyCode === 9) return ontab.call(this, event);
	if (event.metaKey && event.keyCode === 83) return onsave.call(this, event);
}

function ontab(event) {
	var input = dacoda.element.input;
	var end = dacoda.current.end;
	var value = dacoda.current.value;

	// prevent default action
	event.preventDefault();

	// insert tab character
	input.value = value.slice(0, end) + '\t' + value.slice(end);

	// update selection range
	input.selectionStart = input.selectionEnd = end + 1;

	// dispatch value change event
	dacoda.dispatch('input', event);
}

function oninput(event) {
	var before = dacoda.current.value;
	var after  = before;

	// try to process output 
	try {
		after = postcss(plugins).process(before, {
			parser: require('postcss-scss')
		}).then(function (result) {
			output.innerHTML = Prism.highlight(String(result.css), Prism.languages.cssnext);
		});
	} catch (e) {}

	// set style and output
	dacoda.element.style.innerHTML  = Prism.highlight(before,  Prism.languages.cssnext);
}

// save event
function onsave(event) {
	// prevent default action
	event.preventDefault();

	location.hash = toHash(dacoda.current.value);
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