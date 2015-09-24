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

describe('postcss-advanced-vars basic usage', function () {
	it('variables', function (done) {
		test(
			'$red: #f00; .x { color: $red } $blue: #00f; .y { color: $blue } .z {}',
			'.x { color: #f00 } .y { color: #00f } .z {}',
			{},
			done
		);
	});

	it('fors', function (done) {
		test(
			'@for $i from 1 to 5 by 2 { .x-$i {} } @for $i from 5 to 1 by 2 { .y-$i {} } .z {}',
			'.x-1 {} .x-3 {} .x-5 {} .y-5 {} .y-3 {} .y-1 {} .z {}',
			{},
			done
		);
	});

	it('ifs (==)', function (done) {
		test(
			'@if 1 == 1 { .x {} } @if 1 == 2 { .y {} } .z {}',
			'.x {} .z {}',
			{},
			done
		);
	});

	it('ifs (!=)', function (done) {
		test(
			'@if 1 != 1 { .x {} } @if 1 != 2 { .y {} } .z {}',
			'.y {} .z {}',
			{},
			done
		);
	});

	it('ifs (<)', function (done) {
		test(
			'@if 1 < 2 { .x {} } @if 1 < 1 { .y {} } .z {}',
			'.x {} .z {}',
			{},
			done
		);
	});

	it('ifs (>)', function (done) {
		test(
			'@if 1 > 1 { .x {} } @if 1 > 0 { .y {} } .z {}',
			'.y {} .z {}',
			{},
			done
		);
	});

	it('ifs (<=)', function (done) {
		test(
			'@if 1 <= 1 { .x {} } @if 1 <= 0 { .y {} } .z {}',
			'.x {} .z {}',
			{},
			done
		);
	});

	it('ifs (>=)', function (done) {
		test(
			'@if 1 >= 2 { .x {} } @if 1 >= 1 { .y {} } .z {}',
			'.y {} .z {}',
			{},
			done
		);
	});

	it('eaches', function (done) {
		test(
			'@each $i in (foo, bar) { .$i {} } @each $i in (foo, bar, baz) { .x-$i {} } .y {}',
			'.foo {} .bar {} .x-foo {} .x-bar {} .x-baz {} .y {}',
			{},
			done
		);
	});
});

describe('postcss-advanced-vars nested usage', function () {
	it('variable as variable', function (done) {
		test(
			'$red: #f00; $color: $red; .x { color: $color } .y {}',
			'.x { color: #f00 } .y {}',
			{},
			done
		);
	});

	it('for in for', function (done) {
		test(
			'@for $i from 1 to 5 by 2 { @for $j from 3 to 1 { .x-$(i)-$(j) {} } } .y {}',
			'.x-1-3 {} .x-1-2 {} .x-1-1 {} .x-3-3 {} .x-3-2 {} .x-3-1 {} .x-5-3 {} .x-5-2 {} .x-5-1 {} .y {}',
			{},
			done
		);
	});

	it('each in each', function (done) {
		test(
			'@each $i in ((foo, bar), (baz, qux)) { @each $j in $i { .x-$j {} } } .y {}',
			'.x-foo {} .x-bar {} .x-baz {} .x-qux {} .y {}',
			{},
			done
		);
	});
});

describe('postcss-advanced-vars mixed nested usage', function () {
	it('variable + for', function (done) {
		test(
			'$red: #f00; @for $i from 1 to 5 by 2 { .x-$i { color: $red; } } .y {}',
			'.x-1 { color: #f00\n} .x-3 { color: #f00\n} .x-5 { color: #f00\n} .y {}',
			{},
			done
		);
	});

	it('if + variable', function (done) {
		test(
			'$red: #f00; $i: 5; @if $i >= 3 { .x-$i { color: $red; } } .y {}',
			'.x-5 { color: #f00\n} .y {}',
			{},
			done
		);
	});

	it('if + fors', function (done) {
		test(
			'@for $i from 1 to 5 by 2 { @if $i >= 3 { .x-$i {} } } .y {}',
			'.x-3 {} .x-5 {} .y {}',
			{},
			done
		);
	});

	it('if + variable + for', function (done) {
		test(
			'$red: #f00; @for $i from 1 to 5 by 2 { @if $i >= 3 { .x-$i { color: $red; } } } .y {}',
			'.x-3 { color: #f00\n} .x-5 { color: #f00\n} .y {}',
			{},
			done
		);
	});

	it('each + if', function (done) {
		test(
			'@each $i in (foo, bar, baz) { @if $i == foo { .x-$i { background: url($i.png); } } } .y {}',
			'.x-foo { background: url(foo.png)\n} .y {}',
			{},
			done
		);
	});

	it('each + for', function (done) {
		test(
			'@each $i in (1, 2, 3) { @for $j from $i to 3 { .x-$i { background: url($j.png); } } } .y {}',
			'.x-1 { background: url(1.png)\n} .x-1 { background: url(2.png)\n} .x-1 { background: url(3.png)\n} .x-2 { background: url(2.png)\n} .x-2 { background: url(3.png)\n} .x-3 { background: url(3.png)\n} .y {}',
			{},
			done
		);
	});

	it('each + for + if', function (done) {
		test(
			'@each $i in (1, 2, 3) { @for $j from $i to 3 { @if $i >= 3 { .x-$i { background: url($j.png); } } } } .y {}',
			'.x-3 { background: url(3.png)\n} .y {}',
			{},
			done
		);
	});

	it('each + variable + for + if', function (done) {
		test(
			'$dir: assets/images; @each $i in (1, 2, 3) { @for $j from $i to 3 { @if $i >= 3 { .x-$i { background: url($dir/$j.png); } } } } .y {}',
			'.x-3 { background: url(assets/images/3.png)\n} .y {}',
			{},
			done
		);
	});
});

describe('postcss-mixins', function () {
	it('cans remove unknown mixin on request', function (done) {
		test('@mixin A; a{}', 'a{}', { silent: true }, done);
	});

	it('supports functions mixins', function (done) {
		test('a { @mixin color black; }', 'a { color: black; }', {
			mixins: {
				mixins: {
					color: function (rule, color) {
						rule.replaceWith({ prop: 'color', value: color });
					}
				}
			}
		}, done);
	});

	it('removes mixin at-rule', function (done) {
		test('a { @mixin none; }', 'a { }', {
			mixins: {
				mixins: {
					none: function () { }
				}
			}
		}, done);
	});

	it('converts object from function to nodes', function (done) {
		test('a { @mixin color black; }', 'a { color: black; }', {
			mixins: {
				mixins: {
					color: function (rule, color) {
						return { color: color };
					}
				}
			}
		}, done);
	});

	it('supports object mixins', function (done) {
		test('@mixin obj;',
			'@media screen {\n    b {\n        one: 1\n    }\n}', {
			mixins: {
				mixins: {
					obj: {
						'@media screen': {
							'b': {
								one: 1
							}
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
		test(
			'$other: red; ' +
			'@define-mixin color $color { ' +
				'color: $color; ' +
				'background-color: $other; ' +
			'} ' +
			'a { ' +
				'@mixin color black; ' +
			'}',
			'a { ' +
				'color: black; ' +
				'background-color: red; ' +
			'}',
			{},
			done
		);
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

describe('postcss-sass-extend', function() {
	it('supports extend', function (done) {
		test(
			'@define-extend black-color { ' +
				'color: black; ' +
			'} ' +
			'.a { ' +
				'@extend black-color; ' +
			'} ' +
			'.b { ' +
				'@extend black-color; ' +
			'}',

			'.a, .b { ' +
				'color: black;\n' +
			'}',

			{},

			done
		);
	});
});

describe('postcss-nesting', function() {
	it('supports nesting', function (done) {
		test('a { @nest & b { color: blue } } z {}', 'a { } a b { color: blue } z {}', {}, done);
	});

	it('supports extend + nesting', function (done) {
		test('%a { @nest & b { color: blue } } c { @extend %a; } z {}', 'c { } c b { color: blue } z {}', {}, done);
	});

	it('supports nesting + extend', function (done) {
		test('%a { color: red } b { @nest & c { @extend %a; } color: white } z {}', 'b c { color: red } b { color: white } z {}', {}, done);
	});
});
