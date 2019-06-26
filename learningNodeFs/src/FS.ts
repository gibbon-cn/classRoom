import * as fs from 'fs';
import { promisify } from 'util';
import * as readline from "readline";

export function readFile(path: string): Promise<Buffer>;
export function readFile(path: string, encoding: string): Promise<string>;
export function readFile(path: string, encoding?: string): Promise<Buffer | string> {
	return promisify(fs.readFile)(path, encoding);
}

export function exists(path: string): Promise<boolean> {
	return promisify(fs.exists)(path);
}

export async function writeFile(path:string, content: Uint8Array): Promise<void> {
    const handle = await promisify(fs.open)(path, "w");
    await await promisify(fs.write)(handle, content, 0, content.byteLength, 0);
    await promisify(fs.fdatasync)(handle);
    return await promisify(fs.close)(handle);
}

/**
 * 逐行处理文件读取
 * @param path 
 * @param onLine 
 * @param onClose 
 * https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
 */
export async function readLine(path:string, onLine: (chunk:string)=>void, onOpen?:(fd:number)=>void, onClose?: ()=>void) {
    const fileStream = fs.createReadStream(path);
    if(onOpen) {
        fileStream.on('open', onOpen);
    }

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
  
    rl.on('line', onLine);

    await new Promise(function(c, r){
        rl.on('close', ()=>{
            if(onClose) onClose();
            c();
        });
    });
}