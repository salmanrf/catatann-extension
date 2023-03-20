const HtmlWebpackPlugin = require("html-webpack-plugin");
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
    publicPath: "/dist/",
  },
  module: {
    rules: [
      { test: /\.(sc|c)ss$/i, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "lib/popup/index.html",
    }),
  ],
  devtool: "inline-source-map",
};
