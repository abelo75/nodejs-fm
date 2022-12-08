import os from 'os';
import {getArgumentsFromString} from "./args.mjs";
import {log, printOperationFailed} from "./output.mjs";

export const osFunctions = (arg, folder, callback) => {
  const mapCommands = {
    architecture: 'arch',
    username: () => os.userInfo()?.username,
  }
  try {
    const argumentList = getArgumentsFromString(arg);
    argumentList.forEach((item) => {
      const command = mapCommands[item] ?? item;
      if (typeof command === 'function') {
        log(item, command());
        return;
      }
      const osFn = os[command ?? item];
      if (!osFn) {
        log('Invalid argument', item);
        return;
      }
      if (typeof osFn === 'function') {
        log(item, osFn());
        return;
      }
      log(item, osFn);
    });
    callback();
  } catch (e) {
    printOperationFailed(`${e?.message ?? ''}`);
  }
}
