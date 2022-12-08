import {printInvalidInput, printOperationFailed, table} from '../lib/output.mjs';
import {opendir} from 'fs/promises';
import * as path from 'path';
import {fileExists} from '../lib/fileUtils.mjs';

const sortByNameFunction = (a, b) => {
  if (a.name > b.name) {
    return 1
  } else if (a.name < b.name) {
    return -1
  }
  return 0;
}
const fileSortFunction = (a, b) => {
  if (a.type === b.type) {
    return sortByNameFunction(a, b);
  } else {
    if (a.type === 'dir') {
      return -1
    } else if (b.type === 'dir') {
      return 1;
    }
    return sortByNameFunction(a, b);
  }
}
export const ls = async (arg, folder, callback) => {

  const getType = item => item?.isFile?.() ? 'file' : item?.isDirectory?.() ? 'dir' : item?.isSymbolicLink?.() ? 'link' : 'other';
  try {
    const pathToList = path.resolve(folder, arg ?? '');
    if (!await fileExists(pathToList)) {
      printInvalidInput(`: Not exists ${pathToList}`);
      callback();
      return;
    }
    const items = await opendir(pathToList);
    const result = [];
    for await (const item of items) {
      result.push({name: item.name, type: getType(item)});
    }
    table(result.sort(fileSortFunction));
    callback();
  } catch (e) {
    printOperationFailed();
    callback();
  }
}
