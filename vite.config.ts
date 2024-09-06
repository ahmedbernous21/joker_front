import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    react(),

    // VitePWA({
    //   registerType: "autoUpdate",
    //   includeAssets: ["favicon.svg"],
    //   manifest: {
    //     name: "Joker Graphics",
    //     short_name: "Joker",
    //     description: "Joker Graphics - Creative Designs",
    //     theme_color: "#ffffff",
    //     //         background_color: "#ffffff",
    //     //         display: "standalone",
    //     //         start_url: "/",
    //     icons: [
    //       {
    //         src: "/favicon.svg",
    //         sizes: "192x192",
    //         type: "image/svg+xml",
    //       },
    //       {
    //         src: "/favicon.svg",
    //         sizes: "512x512",
    //         type: "image/svg+xml",
    //       },
    //     ],
    //   },
    // }),
  ],
});
