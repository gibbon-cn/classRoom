import {RedisClient} from "./client";

async function main() {
    var client = new RedisClient();
    var s = await client.get("abc");
    await client.set("k1", "v1");
    var v = await client.get("k1");
    if(v) {
        console.log("k1 has existed in redis");
    }
    var k = await client.randomKey();
    console.log("random key:" + k);
}

main();