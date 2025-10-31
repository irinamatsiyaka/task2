const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
   const isDev = argv.mode === "development";

   return {
      entry: "./src/index.js",
      output: {
         path: path.resolve(__dirname, "dist"),
         filename: isDev ? "bundle.js" : "bundle.[contenthash].js",
         clean: true,
         publicPath: "/",
      },
      mode: isDev ? "development" : "production",

      devServer: isDev
         ? {
              static: [
                 { directory: path.resolve(__dirname, "public") },
                 { directory: path.resolve(__dirname, "dist") },
              ],
              port: 3002,
              open: true,
              hot: true,
              historyApiFallback: true,
           }
         : undefined,

      plugins: [
         new HtmlWebpackPlugin({
            template: "./public/index.html",
            minify: isDev
               ? false
               : {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                 },
         }),
         ...(isDev ? [new ReactRefreshWebpackPlugin()] : []),
         new CopyWebpackPlugin({
            patterns: [{ from: "public/sw.js", to: "sw.js" }],
         }),
      ],
      module: {
         rules: [
            { test: /\.css$/, use: ["style-loader", "css-loader"] },

            {
               test: /\.[jt]sx?$/,
               exclude: /node_modules/,
               use: {
                  loader: "babel-loader",
                  options: {
                     presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-typescript",
                     ],
                     plugins: isDev
                        ? [require.resolve("react-refresh/babel")]
                        : [],
                  },
               },
            },
         ],
      },
      resolve: {
         extensions: [".ts", ".tsx", ".js", ".jsx"],
      },

      optimization: isDev
         ? undefined
         : {
              splitChunks: { chunks: "all" },
              minimize: true,
           },
   };
};
