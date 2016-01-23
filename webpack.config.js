var webpack = require('webpack');

module.exports = {
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: __dirname,
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
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
};