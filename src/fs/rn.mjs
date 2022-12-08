import {printInvalidInput, printOperationFailed} from '../lib/output.mjs';
import {combineFileName} from '../lib/fileUtils.mjs';
import {getArgumentsFromString} from '../lib/args.mjs';
import {rename} from 'fs/promises';

export const rn = async (arg, folder, callback) => {
  try {
    const argList = getArgumentsFromString(arg, '');
    if (!arg || argList.length < 2) {
      printInvalidInput(`: Not enough parameters ${arg.toString()}`);
      callback();
      return false;
    }

    const inFile = combineFileName(argList[0], folder);
    const outFile = combineFileName(argList[1], folder);
    await rename(inFile, outFile);
    callback();
  } catch (e) {
    printOperationFailed(`${e?.message ?? ''}`);
    callback();
  }
}
