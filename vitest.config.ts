import {
    configDefaults,
    defineConfig,
} from "vitest/config";

export default defineConfig({
    test: {
        exclude: [...configDefaults.exclude],
        deps: {
            web: {
                transformCss: false,
                transformAssets: false,
            },
        },
        coverage: {
            exclude: [
                // ...configDefaults.coverage.exclude,
                "**/[IE]*.ts",
                "**/*.vue",
                "**/assets/**",
                // "**/models/**",
                // "**/validations/**",
            ],
            include: [
                // ...configDefaults.coverage.include,
                "**/src/**",
            ],
        },
    },
});
