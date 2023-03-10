const path = require("path");

module.exports = {
  mode: "production",
  entry: "./lib/content-scripts/main.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/content-scripts"),
    clean: true,
  },
  module: {
    rules: [{ test: /\.css$/i, use: ["style-loader", "css-loader"] }],
  },
};
