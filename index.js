var postcss = require('postcss');

// list of all plugins
var processors = [
	{
		plugin: require('postcss-import'),
		namespace: 'import',
		defaults: {}
	},
	{
		plugin: require('postcss-advanced-variables'),
		namespace: 'variables',
		defaults: {}
	},
	{
		plugin: require('postcss-media-minmax'),
		namespace: 'minmax',
		defaults: {}
	},
	{
		plugin: require('postcss-mixins'),
		namespace: 'mixins',
		defaults: {}
	},
	{
		plugin: require('postcss-color-function'),
		namespace: 'color',
		defaults: {}
	},
	{
		plugin: require('postcss-nested'),
		namespace: 'nested',
		defaults: {}
	},
	{
		plugin: require('postcss-simple-extend'),
		namespace: 'extend',
		defaults: {}
	}
];

// load all plugins
module.exports = postcss.plugin('precss', function (options) {
	options = options || {};

	var instance = postcss();

	// for each plugin
	processors.forEach(function (processor) {
		var namespaceOptions = processor.namespace in options ? options[processor.namespace] : options;
		var processorOptions = {};

		Object.keys(processor.defaults).forEach(function (key) {
			processorOptions[key] = processor.defaults[key];
		});

		Object.keys(namespaceOptions).forEach(function (key) {
			processorOptions[key] = namespaceOptions[key];
		});

		if (namespaceOptions && !processorOptions.disable) {
			instance.use(processor.plugin(processorOptions));
		}
	});

	return instance;
});

// stand-alone process method
module.exports.process = function (css, opts) {
	var processed = postcss([module.exports(opts)]).process(css, opts);

	return opts && opts.map && !opts.map.inline ? processed : processed.css;
};
