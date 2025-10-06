const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   entry: "./src/index.js",
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
   },
   mode: "development",
   devServer: {
      static: "./dist",
      port: 3000,
      open: true,
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./public/index.html",
      }),
   ],
};
