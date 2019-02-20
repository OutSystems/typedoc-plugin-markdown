export function getAnchorRef(ref: string) {
  return ref
    .replace(/_|\/|\.| /g, '-')
    .replace(/"/g, '')
    .replace(/ /g, '-');
}

export function formatContents(contents: string) {
  return contents ? contents.replace(/[\r?\n]{3,}/g, '\n\n').trim() : '';
}
