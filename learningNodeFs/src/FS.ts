import * as fs from 'fs';
import { promisify } from 'util';

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
