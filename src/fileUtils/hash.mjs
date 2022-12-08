import {createHash} from 'crypto';
import {createReadStream} from 'fs';
import {printLn, printOperationFailed} from '../lib/output.mjs';
import {combineFileName} from '../lib/fileUtils.mjs';

export const hash = async (arg, folder, callback) => {
  try {
    const file = combineFileName(arg, folder);
    const reader = createReadStream(file);
    const hash = createHash('sha256').setEncoding('hex');
    reader
      .on('error', (e) => {
        printOperationFailed(e?.message ?? '');
        callback();
      })
      .on('end', () => {
        hash.end();
        printLn(hash.read());
        callback();
      })
      .pipe(hash);
  } catch (e) {
    printOperationFailed(e?.message ?? '');
    callback();
  }
}
