var webpack = require('webpack');
var path = require("path");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.js",
  devServer: {
    contentBase: "./public"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader?presets[]=es2015"
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.svg$/,
        loader: "svg-inline"
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        FIREBASE_URL: JSON.stringify(process.env.FIREBASE_URL)
      }
    })
  ]
};
