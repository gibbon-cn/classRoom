const webpack = require("webpack");
module.exports = {
    "context": __dirname,
    "mode": "development",
    "entry": "./src/main.ts",
    "target": "node",
    "output": {
        "path": __dirname+'/dist',
        "filename": "[name].js"
    },
    "devtool": "source-map",
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
    },
    "plugins": [
        new webpack.DefinePlugin({
            "process.env.BUILD_DIR": `"${__dirname.replace(/\\/g, "\\\\")}"`
        }),
    ],    
}