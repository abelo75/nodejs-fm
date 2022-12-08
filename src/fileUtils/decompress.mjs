import {printLn, printOperationFailed} from '../lib/output.mjs';
import {checkForFileAndFolder} from '../lib/fileUtils.mjs';
import path from 'path';
import {createReadStream, createWriteStream} from 'fs';
import zlib from 'zlib';

export const decompress = async (arg, folder, callback) => {
  try {
    const result = await checkForFileAndFolder(arg, folder, callback);
    if (!result) {
      return;
    }

    const {file, outFolder, fileName} = result;
    const name = path.basename(file, '.brotli');
    const ext = path.extname(file);
    if (ext !== '.brotli') {
      printLn(`Invalid input. ${file} is not Brotli compressed file`);
      callback();
      return;
    }
    const outFile = path.normalize(`${outFolder}${path.sep}${name}`)

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
        printLn(`File ${fileName} decompressed to ${outFile}`);
        callback();
      })
      .pipe(zlib.createBrotliDecompress())
      .pipe(writer);
  } catch (e) {
    printOperationFailed(e?.message ?? '');
  }
}
