import {goodBye, hello, printLn} from './lib/output.mjs';
import * as os from 'os';
import {caseSensitive, commandHandlers} from './config.mjs';
import {removeCrLfFromStr} from './lib/strings.mjs';
import {showCommandPrompt} from './lib/showCommandPrompt.mjs';
import {getArgumentsFromString} from './lib/args.mjs';

const {stdin} = process;
let folder = os.homedir();

hello();
showCommandPrompt(folder);
process.on('SIGINT', () => {
  printLn('');
  goodBye();
  process.exit(0)
});
stdin.on('data', async (data) => {
  const stringInput = removeCrLfFromStr(data.toString());
  const args = getArgumentsFromString(stringInput, '') ?? [];
  const cmdName = caseSensitive ? args[0] ?? 'unknown' : (args[0] ?? 'unknown').toLowerCase();
  let params = (args ?? []).slice(1).join(' ');
  if (!cmdName) {
    showCommandPrompt(folder);
    return;
  }
  let command = commandHandlers[cmdName];
  if (!command) {
    command = commandHandlers.unknown;
    params = cmdName;
  }
  if (typeof command === 'function') {
    await (command(params, folder, (newFolder) => {
      if (newFolder) {
        folder = newFolder;
      }
      showCommandPrompt(folder);
    }));
  }
});
