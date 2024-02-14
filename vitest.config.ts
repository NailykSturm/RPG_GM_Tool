import { defineVitestConfig } from "@nuxt/test-utils/config";
import { configDefaults } from "vitest/config";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

export default defineVitestConfig({
    optimizeDeps: {
        noDiscovery: true,
        include: undefined,
    },
    test: {
        environment: "nuxt",
        exclude: [...configDefaults.exclude],
        deps: {
            web: {
                transformCss: false,
                transformAssets: false,
            },
        },
        coverage: {
            exclude: ["**/[IE]*.ts", "**/*.vue", "**/assets/**"],
            include: ["**/src/**"],
        },
        environmentOptions: {
            nuxt: {
                mock: {
                    intersectionObserver: true,
                    indexedDb: true,
                },
            },
        },
    },
});
