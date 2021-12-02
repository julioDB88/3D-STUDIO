// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new UglifyJsPlugin({
      minify(file, sourceMap) {
        const extractedComments = [];

        // Custom logic for extract comments

        const { error, map, code, warnings } = require('uglify-js') // Or require('./path/to/uglify-module')
          .minify(file, {
            /* Your options for minification */
          });

        return { error, map, code, warnings, extractedComments };
    }})
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      {
        test: /\.(glb|gltf|obj|hdr)$/,
        use:
        [
            {
                loader: 'file-loader',
                options:
                {
                    outputPath: 'assets/models/'
                }
            }
        ]
    },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
