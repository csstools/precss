# PreCSS [![Build Status][ci-img]][ci]

<img align="right" width="150" height="150" src="https://i.imgur.com/zxxN3OX.png" alt="">

[PreCSS] is a tool that allows you to use Sass-like markup in your CSS files.

Enjoy a familiar syntax with variables, mixins, conditionals, and other goodies.

### Variables

```css
/* before */

$blue: #056ef0;
$column: 200px;

.menu {
	width: calc(4 * $column);
}

.menu_link {
	background: $blue;
	width: $column;
}

/* after */

.menu {
	width: calc(4 * 200px);
}

.menu_link {
	background: #056ef0;
	width: 200px;
}
```

### Conditionals

```css
/* before */

.notice--clear {
	@if 3 < 5 {
		background: green;
	}
	@else {
		background: blue;
	}
}

/* after */

.notice--clear {
	background: green;
}
```

### Loops

```css
/* before */

@for $i from 1 to 3 {
	.b-$i { width: $(i)px; }
}

/* after */

.b-1 {
	width: 1px
}
.b-2 {
	width: 2px
}
.b-3 {
	width: 3px
}
```

```css
/* before */

@each $icon in (foo, bar, baz) {
	.icon-$(icon) {
		background: url('icons/$(icon).png');
	}
}

/* after */

.icon-foo {
	background: url('icons/foo.png');
}

.icon-bar {
	background: url('icons/bar.png');
}

.icon-baz {
	background: url('icons/baz.png');
}
```

### Mixins

```css
/* before */

@define-mixin icon $name {
	padding-left: 16px;

	&::after {
		content: "";
		background-url: url(/icons/$(name).png);
	}
}

.search {
	@mixin icon search;
}

/* after */

.search {
	padding-left: 16px;
}

.search::after {
	content: "";
	background-url: url(/icons/$(name).png);
}
```

### Extends

```css
/* before */

@define-extend bg-green {
	background: green;
}

.notice--clear {
	@extend bg-green;
}

/* after */

.notice--clear {
	background: green;
}
```

### Imports

```css
/* Before */

@import "partials/_base.css"; /* Contents of _base: `body { background: black; }` */


/* After */

body { background: black; }
```

## Usage

You just need to follow these two steps to use [PreCSS]:

1. Add [PostCSS] to your build tool.
2. Add [PreCSS] as a PostCSS process.

```sh
npm install precss --save-dev
```

### Node

```js
postcss([ require('precss')({ /* options */ }) ])
```

### Grunt

Add [Grunt PostCSS] to your build tool:

```sh
npm install precss --save-dev
```

Enable [PreCSS] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			processors: [
				require('precss')({ /* options */ })
			]
		},
		dist: {
			src: 'css/*.css'
		}
	}
});
```

### Options

...

[ci]: https://travis-ci.org/jonathantneal/precss
[ci-img]: https://travis-ci.org/jonathantneal/precss.svg
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PreCSS]: https://github.com/jonathantneal/precss
