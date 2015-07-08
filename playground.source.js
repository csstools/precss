var sassy = require('./');
var prism = require('./playground.prism.js');

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

	update();

	input.focus();
});
