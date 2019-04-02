import { EOL } from 'os';

/**
 * In win32, returns a string with any '\n' newline characters normalized as '\r\n'.
 */
export function normalizeNewLines(text: string) {
  if (process.platform !== 'win32') {
    return text;
  }
  var newlineRegex = /([^\r])\n/g;
  return text.replace(newlineRegex, "$1" + EOL);
}
