import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js}'],
	extends: [
        'airbnb-base'
    ],
    languageOptions: {
      ecmaVersion: 2020,
      "node": true,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
		'import/resolver': {
			alias: {
				extensions: ['.js'],
				map: [
					['#routes','./src/api-routes'],
					['#controllers','./src/controllers'],
					['#services','./src/services'],
					['#utils','./src/utils'],
					['#middlewares', './src/middlewares'],
					['#validators', './src/validators'],
					['#config', './src/config'],
				]
			}
		}
	},
    rules: {
      quotes: [2, 'single', 'avoid-escape'],
	  semi: [2, 'always'],
    },
  },
];
