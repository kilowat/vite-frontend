import { defineConfig, splitVendorChunkPlugin } from "vite";
import handlebars from "vite-plugin-handlebars";
import liveReload from "vite-plugin-live-reload";
import { glob } from "glob";
import { fileURLToPath } from "node:url";
import path from "path";
const pageData = require("./hbr.conf").default;
const buildFolder = "assets";
//const isProd = process.env.NODE_ENV === "production" || null;

let getHtmlPages = () =>
  Object.fromEntries(
    glob
      .sync("src/*.html")
      .map((file) => [
        path.relative(
          "src",
          file.slice(0, file.length - path.extname(file).length)
        ),
        fileURLToPath(new URL(file, import.meta.url)),
      ])
  );

export default defineConfig({
  plugins: [
    liveReload([__dirname + "src/*.html"]),
    handlebars({
      context(pagePath) {
        return pageData[pagePath];
      },
      partialDirectory: path.resolve(__dirname, "src/html_parts"),
    }),
    splitVendorChunkPlugin(),
  ],
  root: "src",
  build: {
    target: "esnext",
    modulePreload: false,
    outDir: "../../dist",
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        styles: path.resolve(__dirname, "src/styles/module.scss"),
        scripts: path.resolve(__dirname, "src/js/main.js"),
        ...getHtmlPages(),
      },
      output: {
        entryFileNames: `${buildFolder}/js/[name].js`,
        chunkFileNames: `${buildFolder}/chunks/[name].js`,
        assetFileNames: (e) => {
          if (/\.css|.scss$/.test(e.name))
            return `${buildFolder}/css/[name].css`;
          return `${buildFolder}/images/[name].[hash].[ext]`;
        },
      },
    },
  },
  server: {
    strictPort: true,
    port: 5133,
  },
  resolve: {
    alias: {},
  },
});
