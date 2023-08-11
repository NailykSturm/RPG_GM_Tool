module.exports = {
    content: [
        './src/components/**/*.{js,vue,ts}',
        './src/layouts/**/*.vue',
        './src/pages/**/*.vue',
        './src/plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "dark", "night"],
        base: true,
        styled: true,
        utils: true, 
        prefix: "", 
        logs: true,
    },
    theme: {
        extend: {},
    },
};
