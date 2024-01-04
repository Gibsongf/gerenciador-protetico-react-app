// vite.config.js
import { defineConfig } from "file:///home/gibson/Desktop/All%20Projects/gerenciador-protetico-react-app/node_modules/vite/dist/node/index.js";
import react from "file:///home/gibson/Desktop/All%20Projects/gerenciador-protetico-react-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  // server: {
  //     proxy: {
  //         "/gerenciador-protetico-react-app/":
  //             "https://gibsongf.github.io/gerenciador-protetico-react-app",
  //     },
  // },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "src/_test_/setup.js"
  },
  base: "/gerenciador-protetico-react-app/"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9naWJzb24vRGVza3RvcC9BbGwgUHJvamVjdHMvZ2VyZW5jaWFkb3ItcHJvdGV0aWNvLXJlYWN0LWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZ2lic29uL0Rlc2t0b3AvQWxsIFByb2plY3RzL2dlcmVuY2lhZG9yLXByb3RldGljby1yZWFjdC1hcHAvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZ2lic29uL0Rlc2t0b3AvQWxsJTIwUHJvamVjdHMvZ2VyZW5jaWFkb3ItcHJvdGV0aWNvLXJlYWN0LWFwcC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgICAvLyBzZXJ2ZXI6IHtcbiAgICAvLyAgICAgcHJveHk6IHtcbiAgICAvLyAgICAgICAgIFwiL2dlcmVuY2lhZG9yLXByb3RldGljby1yZWFjdC1hcHAvXCI6XG4gICAgLy8gICAgICAgICAgICAgXCJodHRwczovL2dpYnNvbmdmLmdpdGh1Yi5pby9nZXJlbmNpYWRvci1wcm90ZXRpY28tcmVhY3QtYXBwXCIsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gfSxcbiAgICB0ZXN0OiB7XG4gICAgICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXG4gICAgICAgIGdsb2JhbHM6IHRydWUsXG4gICAgICAgIHNldHVwRmlsZXM6IFwic3JjL190ZXN0Xy9zZXR1cC5qc1wiLFxuICAgIH0sXG4gICAgYmFzZTogXCIvZ2VyZW5jaWFkb3ItcHJvdGV0aWNvLXJlYWN0LWFwcC9cIixcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1WCxTQUFTLG9CQUFvQjtBQUNwWixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT2pCLE1BQU07QUFBQSxJQUNGLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFBQSxJQUNULFlBQVk7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsTUFBTTtBQUNWLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
