import {open} from 'fs/promises';
import {printOperationFailed} from '../lib/output.mjs';
import {combineFileName} from '../lib/fileUtils.mjs';

export const add = async (arg, folder, callback) => {
  try {
    const file = combineFileName(arg, folder);
    const handler = await open(file, 'a');
    await handler.close();
    callback();
  } catch (e) {
    printOperationFailed(e?.message ?? '')
    callback();
  }
}
