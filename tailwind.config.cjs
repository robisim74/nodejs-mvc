module.exports = {
	/**
	 * Whenever you compile your CSS with NODE_ENV set to production, Tailwind will automatically purge unused styles from your CSS
	 */
	purge: [
		'./src/views/**/*.html'
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
