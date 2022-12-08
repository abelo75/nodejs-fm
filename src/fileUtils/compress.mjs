import {printLn, printOperationFailed} from '../lib/output.mjs';
import {checkForFileAndFolder} from '../lib/fileUtils.mjs';
import path from 'path';
import {createReadStream, createWriteStream} from 'fs';
import zlib from 'zlib';

export const compress = async (arg, folder, callback) => {
  try {
    const result = await checkForFileAndFolder(arg, folder, callback);
    if (!result) {
      return;
    }

    const {file, outFolder, fileName} = result;

    const name = path.basename(file);
    const outFile = path.normalize(`${outFolder}${path.sep}${name}.brotli`)

    const reader = createReadStream(file);
    const writer = createWriteStream(outFile);
    const processError = () => {
      printOperationFailed();
      callback();
    }
    writer
      .on('error', processError);

    reader
      .on('error', processError)
      .on('end', () => {
        printLn(`File ${fileName} compressed to ${outFile}`);
        callback();
      })
      .pipe(zlib.createBrotliCompress())
      .pipe(writer);
  } catch (e) {
    printOperationFailed(e?.message ?? '');
  }
}
