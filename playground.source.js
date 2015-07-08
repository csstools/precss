var sassy = require('./');
var prism = require('./playground.prism.js');

document.addEventListener('DOMContentLoaded', function () {
	var input = document.getElementById('input');
	var highlight = document.getElementById('highlight');
	var output = document.getElementById('output');

	function update() {
		var buffer = '';
		var beforeHTML = '';
		var afterHTML = '';

		try {
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

	input.addEventListener('keydown', onkeydown);

	input.addEventListener('input', update);

	input.addEventListener('scroll', onscroll);

	update();

	input.focus();
});
