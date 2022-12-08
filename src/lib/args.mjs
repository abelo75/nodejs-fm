const PREFIX = '--';
export const getArguments = () => {
  const {argv} = process;
  return argv
    .slice(2)
    .filter(item => item.startsWith(PREFIX))
    .reduce((prev, item) => {
      const [key, value] = item.substring(PREFIX.length).split('=');
      return {...prev, [key]: value};
    }, {});
}

export const getArgumentsFromString = (s, prefix = PREFIX) => s
  //.split(' ') need to handle long path with "
  .match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)
  .map(item => item.charAt(0) === '"' ? item.substring(1, item.length - 1) : item) //and remove trailing "
  .filter(item => item.startsWith(prefix))
  .map(item => item.substring(prefix.length));

export const getUserName = () => getArguments()?.username ?? '';
