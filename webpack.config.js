// webpack build
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const styles = "./assets/scss";
const scripts = "./assets/js";
const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: false
});

module.exports = {
    mode: "development",
    entry: scripts + '/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public')
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                include: [
                    path.resolve(__dirname, styles)
                ],
                exclude: /\.(liquid)$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader', options: { sourceMap: true }
                        },
                        {
                            loader: 'postcss-loader', options: { sourceMap: true }
                        },
                        {
                            loader: 'sass-loader', options: { sourceMap: true }
                        }
                    ],

                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(woff2?|ttf|otf|eot|svg)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[ext]'
                }
            }

        ]
    },
    plugins: [
        extractSass
    ]
};