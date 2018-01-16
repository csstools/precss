// tooling
import postcss from 'postcss';
import postcssAdvancedVariables from 'postcss-advanced-variables';
import postcssAtroot from 'postcss-atroot';
import postcssExtendRule from 'postcss-extend-rule';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import postcssPropertyLookup from 'postcss-property-lookup';

// plugin chain
const plugins = [
	postcssExtendRule,
	postcssAdvancedVariables,
	postcssPresetEnv,
	postcssAtroot,
	postcssPropertyLookup,
	postcssNested
];

// plugin
export default postcss.plugin('precss', rawopts => {
	// initialize options, defaulting preset-env to stage 0 features
	const opts = Object.assign({ stage: 0 }, rawopts);

	// initialize all plugins
	const initializedPlugins = plugins.map(
		plugin => plugin(opts)
	);

	// process css with all plugins
	return (root, result) => initializedPlugins.reduce(
		(promise, plugin) => promise.then(
			() => plugin(result.root, result)
		),
		Promise.resolve()
	);
});
