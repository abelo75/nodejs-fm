import {getUserName} from "./args.mjs";
import {Console} from 'console';
import * as os from "os";

const con = new Console(process.stdout);

export const print = string => process.stdout.write(string.toString());
export const printLn = string => print(`${string}${os.EOL}`)

export const log = (text, value) => con.log(`${text}`, value ?? '');
// export const log = (text, value) => printLn(`${text} ${typeof value !== 'undefined' ? JSON.stringify(value) : ''}`)
export const hello = () => printLn(`Welcome to the File Manager, ${getUserName()}!`);
export const goodBye = () => printLn(`Thank you for using File Manager, ${getUserName()}, goodbye!`);

export const table = values => con.table(values);

export const printInvalidInput = comment => printLn(`Invalid input ${comment ?? ''}`);
export const printOperationFailed = comment => printLn(`Operation failed ${comment ?? ''}`);
