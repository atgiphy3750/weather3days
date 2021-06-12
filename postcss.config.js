const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const postcssCalc = require('postcss-calc');
const postcssCssVariables = require('postcss-css-variables');
const postcssCustomProperties = require('postcss-custom-properties');

module.exports = {
	plugins: [
		tailwindcss(),
		autoprefixer(),
		postcssCssVariables(),
		postcssCustomProperties(),
		postcssCalc(),
		postcssPresetEnv({
			browsers: 'ios 9'
		})
	]
};
