import { Mutex } from 'windows-mutex';
 
var mutex = new Mutex('my-mutex');
console.log(mutex.isActive());
mutex.release();