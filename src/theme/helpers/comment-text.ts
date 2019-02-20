import * as fs from 'fs';
import * as path from 'path';
import { DeclarationReflection } from 'typedoc/dist/lib/models';

const brackets: RegExp = /\[\[([^\]]+)\]\]/g;
const urlPrefix: RegExp = /^(http|ftp)s?:\/\//;
const inlineTag: RegExp = /(?:\[(.+?)\])?\{@(link|linkcode|linkplain)\s+((?:.|\n)+?)\}/gi;

export function commentText(text: string, root: any) {
  const model = root.model;
  const settings = root.settings;
  const project = root.project;
  const url = root.url;

  const reflection = model && model instanceof DeclarationReflection ? model : undefined;

  const includePattern: RegExp = /\[\[include:([^\]]+?)\]\]/g;
  const mediaPattern: RegExp = /media:\/\/([^ "\)\]\}]+)/g;

  if (settings && settings.includes) {
    text = text.replace(includePattern, (match: string, pathString: string) => {
      pathString = path.join(settings.includes!, pathString.trim());
      if (fs.existsSync(pathString) && fs.statSync(pathString).isFile()) {
        const contents = fs.readFileSync(pathString, 'utf-8');
        if (pathString.substr(-4).toLocaleLowerCase() === '.hbs') {
          const template = Handlebars.compile(contents);
          return template(this);
        } else {
          return contents;
        }
      } else {
        return '';
      }
    });
  }

  if (settings && settings.media) {
    text = text.replace(mediaPattern, (match: string, pathString: string) => {
      if (fs.existsSync(path.join(settings.media!, pathString))) {
        return getRelativeUrl('media', url) + '/' + pathString;
      } else {
        return match;
      }
    });
  }

  text = replaceInlineTags(
    replaceBrackets(text, reflection, project, url),
    reflection,
    project,
    url,
  );

  return text;
}

function getRelativeUrl(absolute: string, location: string): string {
  if (urlPrefix.test(absolute)) {
    return absolute;
  } else {
    const relative = path.relative(path.dirname(location), path.dirname(absolute));
    return path.join(relative, path.basename(absolute)).replace(/\\/g, '/');
  }
}

function replaceBrackets(
  text: string,
  reflection: any,
  project: any,
  url: string,
): string {
  return text.replace(
    brackets,
    (match: string, content: string): string => {
      const split = splitLinkText(content);
      return buildLink(match, split.target, split.caption, reflection, project, url);
    },
  );
}

function splitLinkText(text: string): { caption: string; target: string } {
  let splitIndex = text.indexOf('|');
  if (splitIndex === -1) {
    splitIndex = text.search(/\s/);
  }

  if (splitIndex !== -1) {
    return {
      caption: text.substr(splitIndex + 1).replace(/\n+/, ' '),
      target: text.substr(0, splitIndex),
    };
  } else {
    return {
      caption: text,
      target: text,
    };
  }
}

function replaceInlineTags(
  text: string,
  reflection: any,
  project: any,
  url: string,
): string {
  return text.replace(
    inlineTag,
    (match: string, leading: string, tagName: string, content: string): string => {
      const split = splitLinkText(content);
      const target = split.target;
      const caption = leading || split.caption;
      return buildLink(match, target, caption, reflection, project, url);
    },
  );
}

function buildLink(
  original: string,
  target: string,
  caption: string,
  reflection: any,
  project: any,
  url: string,
): string {
  if (reflection) {
    reflection = reflection.findReflectionByName(target);
  } else if (project) {
    reflection = project.findReflectionByName(target);
  }

  if (reflection && reflection.url) {
    if (urlPrefix.test(reflection.url)) {
      target = reflection.url;
    } else {
      target = getRelativeUrl(reflection.url, url);
    }
  } else {
    return original;
  }

  return `[${caption}](${target})`;
}
