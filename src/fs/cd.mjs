import path from 'path';
import {printInvalidInput, printOperationFailed} from '../lib/output.mjs';
import {fileExists} from '../lib/fileUtils.mjs';

export const cd = async (arg, folder, callback) => {
  try {
    const pathToList = path.resolve(folder, arg ?? '');
    if (arg && await fileExists(pathToList)) {
      callback(pathToList);
      return;
    }
    printInvalidInput(`: Wrong path ${pathToList}`);
    callback()
  } catch (e) {
    printOperationFailed();
    callback();
  }

}
