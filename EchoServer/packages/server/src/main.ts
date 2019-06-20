import * as http from "http";
import * as express from "express";
import * as httpolyglot from "httpolyglot";
import * as commander from "commander";
import * as expressStaticGzip from "express-static-gzip";
import * as path from "path";
import { stat } from "fs";
import * as ws from "ws";
(async (): Promise<void> => {
    commander
        .version('1.0.1')
        .option('--host <value>', 'host name')
        .option('--port <number>', 'port binded')
        .parse(process.argv);

    const options = commander.opts() as {
        readonly host: string;
        readonly port: number;
    };

    const app = express();

    /// 静态文件服务路径 build/web
    const buildDir = process.env.BUILD_DIR ? path.resolve(process.env.BUILD_DIR, "..") : "";
    const baseDir = buildDir || path.join(__dirname, "..");
    console.log("web path: " + path.join(baseDir, "web/dist"));

    // if (process.env.NODE_ENV == "development") {
    //     const webpackDevMiddleware = require("webpack-dev-middleware");
    //     const webpackConfig = require(path.resolve(__dirname, "..", "..", "web", "webpack.dev.config.js"));
    //     const compiler = require("webpack")(webpackConfig);
    //     app.use(
    //         webpackDevMiddleware(compiler, {
    //             //绑定中间件的公共路径,与webpack配置的路径相同
    //             publicPath: webpackConfig.output.publicPath,
    //             quiet: true  //向控制台显示任何内容 
    //         })
    //     );
    //     app.use(require("webpack-hot-middleware")(compiler));
    // }


    const staticGzip = expressStaticGzip(path.join(baseDir, "web/dist"));
    app.use(staticGzip);

    app.get("/echo", (req, res, next) => {
        var m = req.query["m"];
        return res.status(200).send(m);
    });
    const server = httpolyglot.createServer({}, app) as unknown as http.Server;


    const wss = new ws.Server({ server });

    wss.on('connection', function connection(ws) {
        console.log("connected");
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });

        ws.send('something');
    });


    server.listen(options.port, options.host);

    const url = `http://localhost:${options.port}/`;
    console.log("Server started:");
    console.log(url);
})().catch((ex) => {
    console.log(ex);
})