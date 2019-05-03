module.exports = {
	'precss': {
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
		},
		'options': {
			message: 'supports passing no { options }'
		},
		'options:global': {
			message: 'supports global { stage } usage ',
			options: {
				stage: false
			}
		},
		'options:plugin-specific': {
			message: 'supports passing grid and color-mod { options } to postcssPresetEnv only',
			options: {
				'postcssPresetEnv': {
					features: {
						'color-mod-function': false,
					},
					'autoprefixer': {
						'grid': 'autoplace'
					}

				}
			}
		},
		'options:disabled': {
			message: 'supports disabling plugins',
			options: {
				features: {
					'color-mod-function': true,
				},
				'postcssAtroot': {
					'disable': true
				}
			}
		}
	}
};
