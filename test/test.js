var postcss = require('postcss');
var expect  = require('chai').expect;
var plugin  = require('../');

var test = function (input, output, opts, done) {
	postcss([ plugin(opts) ]).process(input).then(function (result) {
		expect(result.css).to.eql(output);

		expect(result.warnings()).to.be.empty;

		done();
	}).catch(function (error) {
		done(error);
	});
};

describe('postcss-conditionals', function () {
	it('works with conditionals', function (done) {
		test('@if a == a { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if a == b { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if a != b { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if a != a { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 2 > 1 { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 1 > 2 { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 2 >= 2 { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 1 >= 2 { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 1 < 2 { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 2 < 1 { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 2 <= 2 { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 2 <= 1 { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if a == a AND b == b { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if a == a AND a == b { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if a == b OR b == b { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if a == b OR b == c { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if a == b OR b == c { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if a == a OR (c == b AND b == d) { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if NOT (a == b) { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 1 + 1 == 2 { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if (1 + 2) + 3 == 6 { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if (1 + 2) + 3 == 7 { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 1px + 2 == 3px { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 1 + 1px == 2px { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 3 - 2 == 1 { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if (3 - 2) + 1 == 2 { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if (3 + 2) + 1 == 3 { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 3px - 2px == 1px { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 2 - 1px == 1px { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 1 * 2 == 2 { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if (1 * 2) * 3 == 6 { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if (1 * 2) * 3 == 7 { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 3px * 2px == 6px { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 2 * 2px == 4px { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 2 / 2 == 1 { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if (4 / 2) / 2 == 1 { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if (4 / 2) * 2 == 2 { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 4px / 2px == 2px { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if 4 / 2px == 2px { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if aqua - blue == lime { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if lime + rgb(0, 0, 255) == #00ffff { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if #0ff == #00ffff { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if #0ff == #00ffffff { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if #0fff == #00ffff { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if #0fff == #00ffffff { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if hsl(0, 0%, 100%) == white { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if hsla(0, 0%, 100%, .5) == white { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if rgb(0, 255, 255) == aqua { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if rgba(0, 255, 255, .5) == aqua { success {} }', '', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if rgb(0, 255, 255) == rgb(0, 100%, 100%) { success {} }', 'success {}', {}, done);
	});

	it('works with conditionals', function (done) {
		test('@if rgba(0, 100%, 100%, 1) == rgb(0, 100%, 100%) { success {} }', 'success {}', {}, done);
	});
});

describe('postcss-for', function () {
	it('it iterates from and to', function (done) {
		test('@for @i from 1 to 2 { .b-@i { width: @ipx; } }',
			'.b-1 {\n    width: 1px\n}\n.b-2 {\n    width: 2px\n}',
		{}, done);
	});

	it('it iterates from bigger to smaller', function (done) {
		test('@for @i from 3 to 1 { .b-@i { width: @ipx; } }',
			'.b-3 {\n    width: 3px\n}\n.b-2 {\n    width: 2px\n}\n.b-1 {\n    width: 1px\n}',
		{}, done);
	});

	it('it iterates from and to by two', function (done) {
		test('@for @i from 1 to 4 by 2 { .b-@i { width: @ipx; } }',
			'.b-1 {\n    width: 1px\n}\n.b-3 {\n    width: 3px\n}',
		{}, done);
	});

	it('it work if range parameter is a variable', function (done) {
		test('$columns: 3; @for @i from 1 to $columns { .b-@i { width: @ipx; } }',
		'.b-1 {\n    width: 1px\n}\n.b-2 {\n    width: 2px\n}\n.b-3 {\n    width: 3px\n}',
		{}, done);
	});
});

describe('postcss-each', function () {
	it('iterates through given values', function (done) {
		var input     = '@each $icon in foo, bar { .icon-$(icon) {' +
										'background: url("$(icon).png"); } }';
		var expected  = '.icon-foo {\n    background: url("foo.png")\n}\n' +
										'.icon-bar {\n    background: url("bar.png")\n}';
		test(input, expected, {}, done);
	});

	it('iterates through one value', function (done) {
		var input     = '@each $icon in foo { .icon-$(icon) {' +
										'background: url("$(icon).png"); } }';
		var expected  = '.icon-foo {\n    background: url("foo.png")\n}';
		test(input, expected, {}, done);
	});

	it('iterates short names', function (done) {
		var input     = '@each $i in foo { .icon-$(i) {' +
										'background: url("$(i).png"); } }';
		var expected  = '.icon-foo {\n    background: url("foo.png")\n}';
		test(input, expected, {}, done);
	});

	it('iterates value and index', function (done) {
		var input     = '@each $val, $i in foo, bar { .icon-$(val) {' +
										'background: url("$(val)_$(i).png"); } }';
		var expected  = '.icon-foo {\n    background: url("foo_0.png")\n}\n' +
										'.icon-bar {\n    background: url("bar_1.png")\n}';
		test(input, expected, {}, done);
	});

	it('respects multiple selectors', function (done) {
		var input     = '@each $icon in foo, bar { .icon-$(icon), .$(icon)' +
										'{ background: url("$(icon).png"); } }';
		var expected  = '.icon-foo, .foo {\n    background: url("foo.png")\n}\n' +
										'.icon-bar, .bar {\n    background: url("bar.png")\n}';
		test(input, expected, {}, done);
	});

	it('respects multiple properties', function (done) {
		var input     = '@each $icon in foo, bar { .icon-$(icon) {' +
										'background: url("$(icon).png");' +
										'content: "$(icon)";' +
										'}}';
		var expected  = '.icon-foo {\n    background: url("foo.png");\n' +
																'    content: "foo"\n}\n' +
										'.icon-bar {\n    background: url("bar.png");\n' +
																'    content: "bar"\n}';
		test(input, expected, {}, done);
	});

	it('doesn\'t replace other variables', function (done) {
		var input     = '@each $icon in foo, bar { .icon-$(icon), .$(icon)' +
										'{ background: url("$(bg).png"); } }';
		var expected  = '.icon-foo, .foo {\n    background: url("$(bg).png")\n}\n' +
										'.icon-bar, .bar {\n    background: url("$(bg).png")\n}';
		test(input, expected, {}, done);
	});
});

describe('postcss-mixins', function () {
	it('cans remove unknown mixin on request', function (done) {
		test('@mixin A; a{}', 'a{}', { silent: true }, done);
	});

	it('supports functions mixins', function (done) {
		test('a { @mixin color black; }', 'a { color: black; }', {
			mixins: {
				color: function (rule, color) {
					rule.replaceWith({ prop: 'color', value: color });
				}
			}
		}, done);
	});

	it('removes mixin at-rule', function (done) {
		test('a { @mixin none; }', 'a { }', {
			mixins: {
				none: function () { }
			}
		}, done);
	});

	it('converts object from function to nodes', function (done) {
		test('a { @mixin color black; }', 'a { color: black; }', {
			mixins: {
				color: function (rule, color) {
					return { color: color };
				}
			}
		}, done);
	});

	it('supports object mixins', function (done) {
		test('@mixin obj;',
			'@media screen {\n    b {\n        one: 1\n    }\n}', {
			mixins: {
				obj: {
					'@media screen': {
						'b': {
							one: 1
						}
					}
				}
			}
		}, done);
	});

	it('supports CSS mixins', function (done) {
		test('@define-mixin black { color: black; } a { @mixin black; }', 'a { color: black; }', {}, done);
	});

	it('uses variable', function (done) {
		test('@define-mixin color $color { color: $color $other; } ' +
			'a { @mixin color black; }', 'a { color: black $other; }', {}, done);
	});

	it('supports default value', function (done) {
		test('@define-mixin c $color: black { color: $color; } a { @mixin c; }', 'a { color: black; }', {}, done);
	});

	it('supports mixins with content', function (done) {
		test('@define-mixin m { @media { @mixin-content; } } @mixin m { a {} }', '@media {\n    a {}\n}', {}, done);
	});

	it('uses variables', function (done) {
		test('@define-mixin m $a, $b: b, $c: c { v: $a $b $c; } @mixin m 1, 2;', 'v: 1 2 c;', {}, done);
	});
});

describe('postcss-minmax', function() {
	it('supports mixin transform', function (done) {
		test('@media screen and (500px <= device-width <= 1200px) {}', '@media screen and (min-device-width: 500px) and (max-device-width: 1200px) {}', {}, done);
	});
});

describe('postcss-simple-vars', function () {
	it('replaces variables in values', function (done) {
		test('$size: 10px;\na{ width: $size; height: $size }',
			'a{ width: 10px; height: 10px }', {}, done);
	});

	it('allows dashes and digits in variable name', function (done) {
		test('$a-b_10: 1;\na{ one: $a-b_10 a$(a-b_10) }', 'a{ one: 1 a1 }', {}, done);
	});

	it('needs space before variable', function (done) {
		test('$size: 10px; a { width: one$size }', 'a { width: one$size }', {}, done);
	});

	it('does not remove first symbol', function (done) {
		test('a{ a: 1 $a }', 'a{ a: 1 1 }', { variables: { a: 1 } }, done);
	});

	it('allows to use in negative numbers', function (done) {
		test('a{ a: -$a }', 'a{ a: -1 }', { variables: { a: 1 } }, done);
	});

	it('replaces multiple variables', function (done) {
		test('a{ a: $a $a }', 'a{ a: 1 1 }', { variables: { a: 1 } }, done);
	});

	it('has second syntax for varibles', function (done) {
		test('$size: 10; a { width: $(size)px }', 'a { width: 10px }', {}, done);
	});

	it('replaces variables in selector', function (done) {
		test('$name: a; $name $(name)b { }', 'a ab { }', {}, done);
	});

	it('replaces variables in at-rule params', function (done) {
		test('$name: a; @at $name; @at $(name)b { }', '@at a; @at ab { }', {}, done);
	});

	it('parses at-rule without params', function (done) {
		test('@atrule{}', '@atrule{}', {}, done);
	});

	it('overrides variables', function (done) {
		test('$var: 1; a{ one: $var } b{ $var: 2; two: $var } c{ two: $var }', 'a{ one: 1 } b{ two: 2 } c{ two: 2 }', {}, done);
	});

	it('allows to silent errors', function (done) {
		test('a{ width: $size }', 'a{ width: $size }', { silent: true }, done);
	});

	it('gets variables from options', function (done) {
		test('a{ width: $one }', 'a{ width: 1 }', { variables: { one: 1 } }, done);
	});

	it('cans get variables only from option', function (done) {
		test('$one: 2; $two: 2; a{ one: $one $two }',
			'$one: 2; $two: 2; a{ one: 1 $two }',
			{ only: { one: 1 } }, done);
	});

	it('works with false value', function (done) {
		test('a{ zero: $zero }', 'a{ zero: 0 }', { variables: { zero: 0 } }, done);
	});

	it('allows to use var in other vars', function (done) {
		test('$one: 1; $two: $one 2; a{ value: $two }', 'a{ value: 1 2 }', {}, done);
	});

	it('set default values by function', function (done) {
		var value;
		var config = function () {
			return { config: value };
		};

		value = 1;
		test('a{ width: $config }', 'a{ width: 1 }', { variables: config }, done);
	});

	it('set default values by function', function (done) {
		var value;
		var config = function () {
			return { config: value };
		};

		value = 2;
		test('a{ width: $config }', 'a{ width: 2 }', { variables: config }, done);
	});
});
