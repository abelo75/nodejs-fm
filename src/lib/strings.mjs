import * as os from "os";

export const removeCrLfFromStr = st => st.toString().split(os.EOL).join('');
