import {unlink} from 'fs/promises';
import {printOperationFailed} from '../lib/output.mjs';
import {combineFileName} from '../lib/fileUtils.mjs';

export const rm = async (arg, folder, callback) => {
  try {
    const file = combineFileName(arg, folder);
    await unlink(file);
    callback();
  } catch (e) {
    printOperationFailed(`${e?.message ?? ''}`);
    callback();
  }
}
