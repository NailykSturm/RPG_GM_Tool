import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // alias: {
    //     "~": "/<rootDir>",
    //     "@": "/<rootDir>",
    //     "~~": "/<rootDir>",
    //     "@@": "/<rootDir>",
    //     assets: "/<rootDir>/assets",
    //     public: "/<rootDir>/public",
    // },
    app: {
        head: {
            link: [{ rel: "favicon", href: "/favicons/de.ico" }],
        },
    },
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    srcDir: "src",
    modules: ["@nuxtjs/tailwindcss", "@nuxt/test-utils/module"],
    nitro: {
        plugins: ["@/server/db/index.ts"],
    },
    plugins: ["~/plugins/vee-validate.components.ts", "~/plugins/vee-validate.rules.ts"],
    build: {
        transpile: ["@vee-validate/rules"],
    },
    tailwindcss: {
        cssPath: "~/assets/css/tailwind.css",
    },
    runtimeConfig: {
        LOG_LEVEL: process.env.LOG_LEVEL,
        ENV: process.env.ENV,
        MONGO_URI: process.env.MONGO_URI,
        MONGO_URL: process.env.MONGO_URL,
        MONGO_DB_NAME: process.env.MONGO_DB_NAME,
        MONGO_DB_USER: process.env.MONGO_DB_USER,
        MONGO_DB_PASS: process.env.MONGO_DB_PASSWORD,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    },
});
