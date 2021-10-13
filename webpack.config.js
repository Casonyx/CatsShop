const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
            miniCss.loader,
            'css-loader',
            'sass-loader',
         ],
      },
      {
        test: /\.(png|svg|jpg|gif|)$/,
        use: [
         'file-loader',
        ],
      },
    ]
  },
  plugins: [
      new miniCss({
         filename: 'style.css',
      }),
   ]
};
