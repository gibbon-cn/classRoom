import {readLine} from "../src/FS";

async function main(){
    await readLine('e:\\temp\\a.txt', (line)=>{
        console.log(line);
    }, null, ()=>{
        console.log('before file close');
    });
    
    console.log('after file close');
}

main();