import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxImportSource: "react",
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 8080,
        host: true,
    },
    optimizeDeps: {
        include: ["react", "react-dom"],
    },
    define: {
        'process.env.APP_TYPE': '"vendor"',
        'process.env.DEFAULT_LOGIN': '"/vendor/login"',
    },
    build: {
        outDir: 'dist-vendor',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
                },
            },
        },
    },
}); 