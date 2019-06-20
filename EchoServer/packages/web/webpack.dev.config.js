const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    "context": __dirname,
    "mode": "development",
    "entry": ["webpack-hot-middleware/client", "./src/index.ts"],
    "target": "node",
    "output": {
        "path": __dirname+'/dist',
        "filename": "[name].js"
    },
    "devtool": "source-map",
    "plugins": [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'        
    }), new webpack.HotModuleReplacementPlugin()],
    "module": {
        "rules": [
            {
                "test": /\.tsx?$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "ts-loader",
                    "options": {
                        "transpileOnly": true
                    }
                }
            }
        ]
    }
}