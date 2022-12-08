import {createReadStream} from 'fs';
import {printInvalidInput, printOperationFailed} from '../lib/output.mjs';
import {combineFileName} from '../lib/fileUtils.mjs';

export const cat = async (arg, folder, callback) => {
  try {
    if (!arg) {
      printInvalidInput();
      callback();
      return;
    }
    const file = combineFileName(arg, folder);
    const reader = createReadStream(file, {highWaterMark: 2, encoding: 'utf-8'});
    reader
      .on('error', () => {
        printOperationFailed();
        callback();
      })
      .on('end', () => {
        callback();
      })
      .pipe(process.stdout, {end: false})
    ;
  } catch {
    printOperationFailed();
  }
}
