import { EOL } from 'os';

export function getCommentTag(tagName: string, text: string) {
  let md = `*__${tagName}__*:`;
  if (text.startsWith('\n```')) {
    md = md + EOL;
  }
  return md;
}
