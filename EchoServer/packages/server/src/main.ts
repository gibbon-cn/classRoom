import * as http from "http";
import * as express from "express";
import * as httpolyglot from "httpolyglot";
import * as commander from "commander";
import * as expressStaticGzip from "express-static-gzip";
import * as path from "path";
import { stat } from "fs";

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
    const baseDir = path.join(__dirname, "../..");
    console.log("web path: " + path.join(baseDir, "web/dist"));
    const staticGzip = expressStaticGzip(path.join(baseDir, "web/dist"));
    app.use(staticGzip);

    app.get("/echo", (req, res, next) => {
        var m = req.query["m"];
        return res.status(200).send(m);
    });
    const server = httpolyglot.createServer({}, app) as unknown as http.Server;
    server.listen(options.port, options.host);

    const url = `http://localhost:${options.port}/`;
    console.log("Server started:");
    console.log(url);
})().catch((ex)=>{
    console.log(ex);
})