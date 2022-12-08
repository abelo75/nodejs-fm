import path from 'path';
import {printInvalidInput, printOperationFailed} from '../lib/output.mjs';

export const up = (arg, folder, callback) => {
  try {
    if (arg) {
      printInvalidInput();
      callback();
      return folder;
    }
    if (path.parse(folder).root === folder) {
      callback();
      return folder;
    }
    const pathToList = path.resolve(folder, arg ?? '');
    callback(pathToList.split(path.sep).slice(0, -1).join(path.sep));
  } catch {
    printOperationFailed();
  }
}
