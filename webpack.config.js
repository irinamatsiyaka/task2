const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

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
      port: 3002,
      open: true,
      hot: true,
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./public/index.html",
      }),
      new ReactRefreshWebpackPlugin(),
   ],
   module: {
      rules: [
         { test: /\.css$/, use: ["style-loader", "css-loader"] },

         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  plugins: [require.resolve("react-refresh/babel")],
               },
            },
         },
      ],
   },
   resolve: {
      extensions: [".js", ".jsx"],
   },
};
