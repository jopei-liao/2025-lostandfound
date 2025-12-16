import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/lostandfound/",
	build: {
		outDir: "dist",
	},
	plugins: [react(), mkcert()],
	server: {
		https: true,
		port: 5173,
	},
});
