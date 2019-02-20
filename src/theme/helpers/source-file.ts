/**
 * Returns the source file definition
 */

export function sourceFile(fileName: string, line: string, url: string, settings: any) {
  let md = 'Defined in ';
  if (settings.mdEngine === 'bitbucket' && settings.mdSourceRepo) {
    const bitbucketUrl = `${settings.mdSourceRepo}/src/master/${fileName}`;
    const bitbucketParams = `fileviewer=file-view-default#${fileName}-${line}`;
    md += `[${fileName}:${line}](${bitbucketUrl}?${bitbucketParams})`;
  } else if (url) {
    md += `[${fileName}:${line}](${url})`;
  } else {
    md += `${fileName}:${line}`;
  }
  return md;
}
