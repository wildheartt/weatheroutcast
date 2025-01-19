import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

export const entry = './src/index.js';
export const output = {
  filename: 'bundle.[contenthash].js',
  path: resolve(__dirname, 'dist'),
  clean: true,
};
export const devServer = {
  static: './dist',
  port: 3000,
  open: true,
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new ESLintPlugin(),
];
export const module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
  ],
};
