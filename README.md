# PostCSS Sassy [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[PostCSS Sassy] is a [PostCSS] plugin pack that allows you to use [Sass]-like markup in your CSS files.

The Sass syntax allows you to use variables, mixins, conditionals, and other goodies.

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

.foo {
	@if 3 < 5 {
		background: green;
	}
	@else {
		background: blue;
	}
}

/* after */

.foo {
	background: green;
}
```

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

magic {}
```

### Imports

```css
/* Before */

@import "partials/_base.css"; /* Contents of _base: `body { background: black; }` */


/* After */

body { background: black; }
```

## Usage

You just need to follow these two steps to use [PostCSS Sassy]:

1. Add [PostCSS] to your build tool.
2. Add [PostCSS Sassy] as a PostCSS process.

```sh
npm install postcss-sassy --save-dev
```

### Node

```js
postcss([ require('postcss-sassy')({ /* options */ }) ])
```

### Grunt

Add [Grunt PostCSS] to your build tool:

```sh
npm install postcss-sassy --save-dev
```

Enable [PostCSS Sassy] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			processors: [
				require('postcss-sassy')({ /* options */ })
			]
		},
		dist: {
			src: 'css/*.css'
		}
	}
});
```

## Differences between Sassy and Sass

...

### Options

...

[ci]: https://travis-ci.org/jonathantneal/postcss-sassy
[ci-img]: https://travis-ci.org/jonathantneal/postcss-sassy.svg
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Sassy]: https://github.com/jonathantneal/postcss-sassy
[Sass]: http://sass-lang.com/
