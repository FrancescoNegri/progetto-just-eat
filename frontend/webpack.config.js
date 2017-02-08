const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: "./src/index.js",
    output: {
        path: "./dist/",
        filename: "scripts.js",
        publicPath: "/",
    },
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        contentBase: "./dist/",
        inline: true,
        host: "0.0.0.0"
    },
    module: {
        loaders: [
            {//SCRIPTS
                test: /.js?$/,
                loader: "babel",
                query: {
                    presets: ["es2015", "react"]
                },
                exclude: /node_modules/
            },
            {//JSON
                test: /.json?$/,
                loader: "json",
                exclude: /node_modules/
            },
            {//SASS
                test: /\.(scss)$/,
                loader: ExtractTextPlugin.extract("css!sass")
            },
            {//CSS
                test: /\.css$/,
                loaders: ["style", "css"]
            },
            {//IMAGES
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "file?name=/images/[name].[ext]",
                    "image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false"
                ]
            },
            {//FONTS
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: "file?name=/fonts/[name].[ext]"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.js'
        }),
        new HtmlWebpackPlugin({
            title: "progetto Just-Eat",
            inject: false,
            template: require("html-webpack-template"),
            appMountId: "root",
            meta: {
                viewport: 'width=device-width, initial-scale=1.0'
            },
            links: [
                "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            ],
            scripts: [
                "https://code.jquery.com/jquery-3.1.1.slim.min.js"
            ],
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};


module.exports = config;
