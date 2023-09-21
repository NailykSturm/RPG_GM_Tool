// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    srcDir: 'src',
    modules: ['@nuxtjs/tailwindcss'],
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
    },
    nitro: {
        plugins: ['@/server/db/index.ts'],
    },
    plugins: ['~/plugins/vee-validate.components.ts', '~/plugins/vee-validate.rules.ts'],
    build: {
        transpile: ['@vee-validate/rules'],
    },
    runtimeConfig: {
        MONGO_URI: process.env.MONGO_URI,
        MONGO_URL: process.env.MONGO_URL,
        MONGO_DB_NAME: process.env.MONGO_DB_NAME,
        MONGO_DB_USER: process.env.MONGO_DB_USER,
        MONGO_DB_PASS: process.env.MONGO_DB_PASSWORD,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    },
});
