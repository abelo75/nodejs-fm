import * as os from 'os';
import {up} from './fs/up.mjs';
import {cd} from './fs/cd.mjs';
import {ls} from './fs/ls.mjs';
import {goodBye, log} from './lib/output.mjs';
import {cat} from './fs/cat.mjs';
import {add} from './fileUtils/add.mjs';
import {osFunctions} from './lib/osFunctions.mjs';
import {compress} from './fileUtils/compress.mjs';
import {hash} from './fileUtils/hash.mjs';
import {decompress} from './fileUtils/decompress.mjs';
import {cp} from './fs/cp.mjs';
import {rn} from './fs/rn.mjs';
import {rm} from './fs/rm.mjs';
import {mv} from './fs/mv.mjs';

export const caseSensitive = !os.platform().toString().startsWith('win')
export const promptSymbol = os.platform().toString().startsWith('win') ? '>' : '# ';

export const commandHandlers = {
  up,
  cd,
  ls,
  '.exit': () => {
    goodBye();
    process.exit();
  },
  cat,
  add,
  os: osFunctions,
  compress,
  hash,
  decompress,
  'unknown': (command, folder, callback) => {
    log('Unknown command', command);
    callback();
  },
  cp,
  rn,
  rm,
  mv,
}

