var sassy = require('./');
var prism = require('./playground.prism.js');

var defaultString = location.href.slice(-1) === '#' || location.hash ? location.hash.slice(1).replace(/(\\n|\\r)/g, '\n').replace(/\\t/g, '\t') : '@define-mixin icon $name {\n\tpadding-left: 16px;\n\n\t&::after {\n\t\tcontent: "";\n\t\tbackground-url: url(/icons/$(name).png);\n\t}\n}\n\n$blue: #056ef0;\n$column: 200px;\n\n.search {\n\t@mixin icon search;\n}\n\n.menu {\n\tbackground: $blue;\n\twidth: calc(4 * $column);\n}\n\n.foo {\n\t@if 3 < 5 {\n\t\tbackground: green;\n\t}\n}\n\n@for $i from 10 to 30 by 10 {\n\t.b-$i { width: $(i)px; }\n}\n\n@each $icon in (foo, bar, baz) {\n\t.icon-$(icon) {\n\t\tbackground: url(icons/$icon.png);\n\t}\n}';

document.addEventListener('DOMContentLoaded', function () {
	var input = document.getElementById('input');
	var highlight = document.getElementById('highlight');
	var output = document.getElementById('output');
	var caret = document.getElementById('caret');

	function update() {
		var buffer = '';
		var beforeHTML = '';
		var afterHTML = '';

		try {
			oncaretchange();

			beforeHTML = Prism.highlight(input.value, Prism.languages.scss);

			buffer = sassy.process(input.value, { safe: true });

			afterHTML = Prism.highlight(buffer, Prism.languages.scss);
		} catch (error) {}

		highlight.innerHTML = beforeHTML;

		output.innerHTML = afterHTML;
	}

	function onkeydown(event) {
		if (event.keyCode === 9) {
			event.preventDefault();

			var start = input.selectionStart;
			var end = input.selectionEnd;

			input.value = input.value.substring(0, start) + '\t' + input.value.substring(end);

			input.selectionStart = start + 1;
			input.selectionEnd = end + 1;

			update();
		}
	}

	function onscroll() {
		highlight.scrollTop = input.scrollTop;
	}

	function oncaretchange() {
		var end = input.selectionEnd;

		caret.innerHTML = input.value.substring(0, end).replace(/</g, '&lt;') + '<div id="cursor"></div>' + input.value.substring(end).replace(/</g, '&lt;');
	}

	input.addEventListener('keydown', function (event) {
		onkeydown(event);

		caret.setAttribute('down', '');

		setTimeout(oncaretchange);

		function onkeyup() {
			caret.removeAttribute('down');

			input.removeEventListener('keyup', onkeyup);
		}

		window.addEventListener('keyup', onkeyup);
	});

	input.addEventListener('input', update);

	input.addEventListener('scroll', onscroll);

	input.addEventListener('focus', function () {
		caret.setAttribute('focus', '');
		oncaretchange();
	});

	input.addEventListener('blur', function () {
		caret.removeAttribute('focus');
	});

	input.addEventListener('mousedown', function () {
		caret.setAttribute('down', '');
		setTimeout(oncaretchange);

		window.addEventListener('mouseup', function () {
			caret.removeAttribute('down');
			setTimeout(oncaretchange);
		});
	});

	input.value = defaultString;

	update();

	input.focus();
});
