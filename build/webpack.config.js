const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        // 入口文件
        main: ["@babel/polyfill", path.resolve(__dirname, '../src/index.js')]
    },
    output: {
        // 输出文件夹
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        port: 3000,
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            },
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass')
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
    ],
    resolve: {
        alias: {
          vue$: 'vue/dist/vue.runtime.esm.js'
        },
        extensions: [
            '.js',
            '.vue'
        ]
    },
}