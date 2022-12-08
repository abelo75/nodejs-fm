import {print} from "./output.mjs";
import {promptSymbol} from "../config.mjs";

export const showCommandPrompt = folder => print(`You are currently in ${folder}${promptSymbol}`);
