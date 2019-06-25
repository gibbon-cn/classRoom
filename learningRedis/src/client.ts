
import * as redis from "redis";
import {promisify} from "util";


export class RedisClient {

    private client;

    constructor() {
        this.client = redis.createClient();
        this.client.on("error", function (err) {
            console.log("Error " + err);
        });
        this.client.randomkey(redis.print);
    }
    private _getAsync: (string) => Promise<string>;
    private _setAsync: (k:string, v:string) => Promise<void>;
    private _randomKeyAsync: () => Promise<string>;

    private get getAsync(): (string) => Promise<string> {
        if(this._getAsync) return this._getAsync;
        this._getAsync = promisify(this.client.get).bind(this.client);
        return this._getAsync;
    }

    private get setAsync(): (k:string, v:string) => Promise<void> {
        if(this._setAsync) return this._setAsync;
        this._setAsync = promisify(this.client.set).bind(this.client);
        return this._setAsync;
    }    

    private get randomKeyAsync(): () => Promise<string> {
        if(this._randomKeyAsync) return this._randomKeyAsync;
        this._randomKeyAsync = promisify(this.client.randomkey).bind(this.client);
        return this._randomKeyAsync;
    }      

    public async get(key:string): Promise<string> {
        return await this.getAsync(key);
    }

    public async set(key:string, value: string): Promise<void> {
        return await this.setAsync(key, value);
    }

    public async randomKey(): Promise<string> {
        return await this.randomKeyAsync();
    }
}
