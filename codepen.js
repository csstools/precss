// tooling
const browserslist = require('browserslist');
const postcss = require('postcss');
const plugin = require('precss');

// fragment
const $fragment = document.createDocumentFragment();

// stage control
const $stage = $fragment.appendChild(document.createElement('select')); $stage.className = 'option-stage';

[0, 1, 2, 3, 4, 5].forEach(stage => {
	const $option = $stage.appendChild(document.createElement('option')); $option.value = stage;

	$option.appendChild(document.createTextNode(`Stage ${stage}`));
}); $stage.value = 2;

$stage.addEventListener('change', updateStyle);

// browsers control
const $browsers = $fragment.appendChild(document.createElement('input')); $browsers.className = 'option-browsers'; $browsers.value = 'last 3 chrome versions, last 3 edge versions, last 3 firefox versions, last 3 safari versions, last 3 ios versions, last 3 android versions';

$browsers.addEventListener('input', () => {
	try {
		browserslist($browsers.value);

		updateStyle();
	} catch (error) {}
});

// result preformatted container
const $result = $fragment.appendChild(document.createElement('pre')); $result.className = 'css-root';

// cache
const cache = {};

// parse <style> after running its contents through a PostCSS plugin
function updateStyle($style) {
	if ($style instanceof Element) {
		cache.textContent = $style.textContent;
		cache.className = $style.className;
	}

	return postcss([
		plugin({
			browsers: $browsers.value,
			stage: $stage.value
		})
	]).process(cache.textContent, {
		from: cache.className
	}).then(
		(result) => postcss().process(result.css.trim(), {
			from: cache.className,
			stringifier: postcssToSyntaxHTML
		})
	).then(
		(result) => {
			if ($style instanceof Element && $style.parentNode) {
				$style.parentNode.removeChild($style);
			}

			if (result.css !== cache.css) {
				$result.innerHTML = cache.css = result.css;
			}
		},
		console.error
	);
}

// update any pre-existing <style> in <head> using the PostCSS plugin
const $styles = document.head.getElementsByTagName('style');

if ($styles.length) {
	[].filter.call($styles, node => node.nodeName === 'STYLE' && node.className === 'cp-pen-styles').concat($styles[0]).slice(0, 1).forEach(updateStyle);
}

// watch for and update any new <style> in <head> using the PostCSS plugin
(
	new MutationObserver(
		(mutations) => mutations.forEach(
			mutation => [].filter.call(mutation.addedNodes || [], node => node.nodeName === 'STYLE' && node.className === 'cp-pen-styles').forEach(updateStyle)
		)
	)
).observe(document.head, {
	childList: true
});

// on document ready
document.addEventListener('DOMContentLoaded', () => {
	document.body.appendChild($fragment);
});

// format css as syntax-highlighted HTML
function postcssToSyntaxHTML(root, builder) {
	function toString(node, semicolon) {
		if ('atrule' === node.type) {
			return atruleToString(node, semicolon);
		} if ('rule' === node.type) {
			return ruleToString(node, semicolon);
		} else if ('decl' === node.type) {
			return declToString(node, semicolon);
		} else if ('comment' === node.type) {
			return commentToString(node, semicolon);
		} else {
			return node.nodes ? node.nodes.map((childNodes) => toString(childNodes, semicolon)).join('') : node.toString();
		}
	}

	function atruleToString(atrule, semicolon) {
		return `${atrule.raws.before||''}<span class=css-atrule><span class=css-atrule-name>@${atrule.name}</span>${atrule.raws.afterName||''}<span class=css-atrule-params>${atrule.params}</span>${atrule.raws.between||''}${atrule.nodes?`<span class=css-block>{${atrule.nodes.map((node) => toString(node, atrule.raws.semicolon)).join('')}${atrule.raws.after||''}}</span>`:semicolon?';':''}</span>`;
	}

	function ruleToString(rule, semicolon) {
		return `${rule.raws.before||''}<span class=css-rule><span class=css-selector>${rule.selector}</span>${rule.raws.between||''}<span class=css-block>{${rule.nodes.map((node) => toString(node, rule.raws.semicolon)).join('')}${rule.raws.after||''}}</span></span>`;
	}

	function declToString(decl, semicolon) {
		return `${decl.raws.before || ''}<span class=css-declaration><span class=css-property>${decl.prop}</span>${decl.raws.between || ':'}<span class=css-value>${decl.value}</span>${semicolon?';':''}</span>`;
	}

	function commentToString(comment, semicolon) {
		return `${comment.raws.before}<span class=css-comment>/*${comment.raws.left}${comment.text}${comment.raws.right}*/</span>`;
	}

	builder(
		toString(root)
	);
}
