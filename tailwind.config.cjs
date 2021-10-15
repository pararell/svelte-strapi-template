const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		fontFamily: {
      sans: ['Nunito', 'sans-serif']
    },
		extend: {},
	},
	plugins: [],
};

module.exports = config;
