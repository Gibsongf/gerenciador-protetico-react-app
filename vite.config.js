import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/gerenciador-protetico-react-app":
                "https://gibsongf.github.io/gerenciador-protetico-react-app",
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "src/_test_/setup.js",
    },
    base: "/gerenciador-protetico-react-app/",
});
