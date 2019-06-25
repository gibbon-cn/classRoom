import * as FS from "../src/FS";
import { isMainThread } from "worker_threads";

async function main() {
    await FS.writeFile("E:\\temp\\1.txt", Buffer.from("some content"));
    var content = await FS.readFile("E:\\temp\\1.txt");
    debugger
    console.log(content.toString());
}

main();