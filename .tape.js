module.exports = {
	'basic': {
		message: 'supports basic usage'
	},
	'basic:color-mod': {
		message: 'supports { features: { "color-mod-function": true } } usage',
		options: {
			features: {
				'color-mod-function': true
			}
		}
	},
	'basic:variables': {
		message: 'supports { variables } usage',
		options: {
			variables: {
				faded: false
			}
		}
	},
	'basic:stage': {
		message: 'supports { stage } usage',
		options: {
			stage: 4
		}
	}
};
