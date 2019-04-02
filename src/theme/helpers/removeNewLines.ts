/**
 * Returns text with newlines replaced by spaces
 * @param comment
 */
export function removeNewLines(text: any) {
  return text.replace(/\r\n/g, ' ').replace(/\n/g, ' ');
}
