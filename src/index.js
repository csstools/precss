// tooling
import postcss from 'postcss';
import postcssAdvancedVariables from 'postcss-advanced-variables';
import postcssAtroot from 'postcss-atroot';
import postcssExtendRule from 'postcss-extend-rule';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import postcssPropertyLookup from 'postcss-property-lookup';

// plugin chain
const pluginsObj = {
	postcssExtendRule,
	postcssAdvancedVariables,
	postcssPresetEnv,
	postcssAtroot,
	postcssPropertyLookup,
	postcssNested
};

// split plugins into key/value
const plugins = Object.values(pluginsObj);
const pluginKeys = Object.keys(pluginsObj);

// plugin
export default postcss.plugin('precss', rawopts => {
	// initialize options, defaulting preset-env to stage 0 features
	const opts = Object.assign({ stage: 0 }, rawopts);

	// initialize all plugins
	const initializedPlugins = plugins.map(
		(plugin, key) => {

			let optionNames = Object.keys(opts);
			let currentPluginName = pluginKeys[key];

			//check if options specify current plugin
			if(optionNames.includes(currentPluginName) ) {

				let pluginSpecificOptions = opts[currentPluginName];

				//delete top-level option from opts
				delete opts[currentPluginName];

				//create new Object with all known options to top-level
				let allPluginOpts = Object.assign({}, opts, pluginSpecificOptions );

				//delete used-plugin key from opts
				delete opts[key];

				return plugin( allPluginOpts );
			}
			//default return all options for the plugin
			return plugin(opts)
		}
	);

	// process css with all plugins
	return (root, result) => initializedPlugins.reduce(
		(promise, plugin) => promise.then(
			() => plugin(result.root, result)
		),
		Promise.resolve()
	);
});
