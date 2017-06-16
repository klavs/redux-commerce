const path = require("path")
const webpack = require("webpack")

module.exports = {
    devtool: "source-map",
    entry: {
        "all-in-one-page": "./examples/all-in-one-page",
        "multi-page/login": "./examples/multi-page/login",
        "multi-page/customer-info": "./examples/multi-page/customer-info",
        "multi-page/cart": "./examples/multi-page/cart",
        "multi-page/delivery": "./examples/multi-page/delivery",
        "multi-page/billing": "./examples/multi-page/billing",
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: [
                    /node_modules/
                ],
                use: [{
                    loader: "babel-loader"
                }]
            }
        ]
    },
    resolve: {
        alias: {
            "redux-commerce": __dirname
        }
    },
    devServer: {
        contentBase: "./examples",
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {"^/api" : ""}
            }
        }
    }
}