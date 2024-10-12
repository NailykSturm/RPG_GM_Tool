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
        // fileParallelism: false,
        root: "./test",
        logHeapUsage: true,
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            exclude: ["**/[IE]*.ts", "**/*.vue", "**/assets/**", "**/**.d.ts"],
            // include: ["**/src/**"],
            reportsDirectory: "../coverage",
            cleanOnRerun: true,
            thresholds: {
                statements: 90,
                branches: 50,
                functions: 100,
                lines: 90,
                "**/server/utils/**.ts": {
                    statements: 60,
                    branches: 50,
                    functions: 55,
                    lines: 65,
                },
            },
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
