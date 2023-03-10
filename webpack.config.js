const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    content: "./lib/content-scripts/main.js",
    popup: "./lib/popup/main.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/"),
    clean: true,
  },
  module: {
    rules: [{ test: /\.css$/i, use: ["style-loader", "css-loader"] }],
  },
};
