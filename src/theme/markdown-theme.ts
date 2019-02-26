import * as fs from 'fs';
import * as path from 'path';
import {
  DeclarationReflection,
  ProjectReflection,
  Reflection,
} from 'typedoc/dist/lib/models/reflections/index';
import { UrlMapping } from 'typedoc/dist/lib/output/models/UrlMapping';
import { Renderer } from 'typedoc/dist/lib/output/renderer';
import { DefaultTheme } from 'typedoc/dist/lib/output/themes/DefaultTheme';

export class MarkdownTheme extends DefaultTheme {
  constructor(renderer: Renderer, basePath: string, options: any) {
    super(renderer, basePath);
    renderer.removeComponent('assets');
    renderer.removeComponent('javascript-index');
    renderer.removeComponent('toc');
    renderer.removeComponent('pretty-print');
  }

  public isOutputDirectory(outPath: string): boolean {
    const files = fs.readdirSync(outPath);
    return (
      fs.existsSync(path.join(outPath, 'README.md')) ||
      (files.length === 1 && path.extname(files[0]) === '.md')
    );
  }

  public getUrls(project: ProjectReflection): UrlMapping[] {
    const urlMappings: UrlMapping[] = [];

    const entryPoint = this.getEntryPoint(project);
    const markdownFlavor = this.application.options.getRawValues().markdownFlavor;

    MarkdownTheme.buildIndex(urlMappings, entryPoint);

    if (entryPoint.children) {
      entryPoint.children.forEach((child: DeclarationReflection) => {
        MarkdownTheme.buildPages({
          reflection: child,
          urls: urlMappings,
          markdownFlavor,
        });
      });
    }

    if (markdownFlavor === 'gitbook') {
      MarkdownTheme.buildNavigation(urlMappings, this.getNavigation(project).children);
    }
    return urlMappings;
  }

  public static buildPages({
    reflection,
    urls,
    markdownFlavor,
  }: {
    reflection: DeclarationReflection;
    urls: UrlMapping[];
    markdownFlavor: string;
  }) {
    const mapping = DefaultTheme.getMapping(reflection);

    if (mapping) {
      if (!reflection.url || !DefaultTheme.URL_PREFIX.test(reflection.url)) {
        const url =
          markdownFlavor === 'githubWiki'
            ? [MarkdownTheme.getUrl(reflection, undefined, '-') + '.md'].join('/')
            : [
                mapping.directory,
                MarkdownTheme.getUrl(reflection, undefined, '.') + '.md',
              ].join('/');

        urls.push(new UrlMapping(url, reflection, mapping.template));
        reflection.url = url;
        reflection.hasOwnDocument = true;
      }
      if (reflection.children) {
        for (const key in reflection.children) {
          if (reflection.children.hasOwnProperty(key)) {
            const child = reflection.children[key];
            if (mapping.isLeaf || markdownFlavor === 'githubWiki') {
              MarkdownTheme.applyAnchorUrl(child, reflection);
            } else {
              MarkdownTheme.buildPages({ reflection: child, urls, markdownFlavor });
            }
          }
        }
      }
    } else if (reflection.parent) {
      MarkdownTheme.applyAnchorUrl(reflection, reflection.parent);
    }

    return urls;
  }

  public static buildIndex(urlMappings: any, entryPoint: any) {
    urlMappings.push(
      new UrlMapping(
        'README.md',
        Object.assign(entryPoint, { displayReadme: true }),
        'index.hbs',
      ),
    );
  }

  public static buildNavigation(urlMappings: any, navigationChildren: any) {
    if (navigationChildren) {
      const navigation = navigationChildren.map((navigationItem: any) => {
        const dedicatedUrls = navigationItem.dedicatedUrls
          ? navigationItem.dedicatedUrls.map((url: string) => {
              return {
                title: () => {
                  const urlMapping = urlMappings.find((item: any) => {
                    return item.url === url;
                  });
                  return urlMapping ? urlMapping.model.name : null;
                },
                url,
              };
            })
          : null;

        return { ...navigationItem, dedicatedUrls };
      });
      urlMappings.push(new UrlMapping('SUMMARY.md', { navigation }, 'summary.hbs'));
    }
  }

  public static applyAnchorUrl(reflection: Reflection, container: Reflection) {
    if (!reflection.url || !DefaultTheme.URL_PREFIX.test(reflection.url)) {
      let anchor = DefaultTheme.getUrl(reflection, container, '.');

      if (reflection['isStatic']) {
        anchor = 'static-' + anchor;
      }

      const anchorRef = anchor;

      /* if (this.application.options.getRawValues().mdEngine= 'bitbucket') {
        let anchorPrefix = '';
        if (reflection.kind === ReflectionKind.ObjectLiteral) {
          anchorPrefix += 'object-literal-';
        }
        reflection.flags.forEach(flag => {
          anchorPrefix += `${flag}-`;
        });
        const prefixRef = getAnchorRef(anchorPrefix);
        const reflectionRef = getAnchorRef(reflection.name);
        anchorRef = `markdown-header-${prefixRef}${reflectionRef}`;
      } */

      reflection.url =
        (container.url !== undefined ? container.url : '') + '#' + anchorRef;
      reflection.anchor = anchor;
      reflection.hasOwnDocument = false;
    }

    reflection.traverse((child: any) => {
      if (child instanceof DeclarationReflection) {
        MarkdownTheme.applyAnchorUrl(child, container);
      }
    });
  }
}
