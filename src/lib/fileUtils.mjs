import {access} from "fs/promises";
import {constants} from "fs";
import path from "path";
import {getArgumentsFromString} from "./args.mjs";
import {printInvalidInput} from "./output.mjs";

export const fileExists = async (name) => {
  try {
    await access(name, constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

export const combineFileName = (arg, folder) => arg.charAt(0) === path.sep ? path.normalize(`${arg}`) : path.normalize(`${folder}${path.sep}${arg}`);

export const checkForFileAndFolder = async (arg, folder, callback = () => {
}) => {
  const argList = getArgumentsFromString(arg, '');
  if (!arg || argList.length < 2) {
    printInvalidInput(`: Not enough parameters ${arg.toString()}`);
    callback();
    return false;
  }

  const file = combineFileName(argList[0], folder);
  const outFolder = path.resolve(folder, argList[1]);
  if (!await fileExists(file) || !await fileExists(folder)) {
    printInvalidInput(`: Not exists ${file} or ${folder}`);
    callback();
    return false;
  }

  return {
    file, outFolder, fileName: argList[0],
  }
}
