const path = require('path')

module.exports = {
  entry: './src/graph-to-html.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  cache: {
    type: 'filesystem',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'render-graph.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
}
