const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./packages/core/lib/index.js",
    mode: process.env.NODE_ENV || "development",
    output: {
        path: path.join(__dirname, "static"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" },
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{ loader: "file-loader" }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "StratoCAD",
        }),
        new MonacoWebpackPlugin()
    ]
};
