import {checkForFileAndFolder} from '../lib/fileUtils.mjs';
import path from 'path';
import {createReadStream, createWriteStream} from 'fs';
import {printInvalidInput, printLn, printOperationFailed} from '../lib/output.mjs';
import {unlink} from 'fs/promises';

export const mv = async (arg, folder, callback) => {
  try {
    const result = await checkForFileAndFolder(arg, folder, callback);
    if (!result) {
      return;
    }

    const {file, outFolder, fileName} = result;

    const name = path.basename(file);
    const outFile = path.normalize(`${outFolder}${path.sep}${name}`)
    if (file === outFile) {
      printInvalidInput(': Need to use different files');
      callback();
      return;
    }

    const reader = createReadStream(file);
    const writer = createWriteStream(outFile);
    const processError = () => {
      printOperationFailed(`: Cannot write to file ${outFile}`);
      callback();
    }
    writer.on('error', processError);
    reader
      .on('error', processError)
      .on('end', () => {
        unlink(file).then(() => {
          printLn(`File ${fileName} moved to ${outFile}`);
          callback();
        }).catch(() => {
          printOperationFailed();
          callback()
        })
      })
      .pipe(writer);
  } catch (e) {
    printOperationFailed(`${e?.message ?? ''}`);
  }
}
