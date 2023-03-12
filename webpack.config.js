const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    worker: "./lib/service-workers/main.js",
    content: "./lib/content-scripts/main.js",
    popup: "./lib/popup/main.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/"),
    clean: true,
  },
  module: {
    rules: [{ test: /\.s[ac]ss$/i, use: ["style-loader", "css-loader", "sass-loader"] }],
  },
  devtool: "inline-source-map",
};
