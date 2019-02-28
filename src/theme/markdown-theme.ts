import * as fs from 'fs';
import * as path from 'path';
import {
  DeclarationReflection,
  DefaultTheme,
  ProjectReflection,
  Reflection,
  ReflectionKind,
  Renderer,
  UrlMapping,
} from 'typedoc';
import { getAnchorRef } from './utils';

export class MarkdownTheme extends DefaultTheme {
  public options: {
    flatten: boolean;
    markdownFlavor: string;
  };

  constructor(renderer: Renderer, basePath: string, options: any) {
    super(renderer, basePath);
    renderer.removeComponent('assets');
    renderer.removeComponent('javascript-index');
    renderer.removeComponent('toc');
    renderer.removeComponent('pretty-print');
    this.options = this.application.options.getRawValues();
  }

  public isOutputDirectory(outPath: string): boolean {
    const files = fs.readdirSync(outPath);
    return (
      fs.existsSync(path.join(outPath, 'README.md')) ||
      fs.existsSync(path.join(outPath, 'Home.md')) ||
      (files.length === 1 && path.extname(files[0]) === '.md')
    );
  }

  public getUrls(project: ProjectReflection): UrlMapping[] {
    const urlMappings: UrlMapping[] = [];

    const entryPoint = this.getEntryPoint(project);

    this.buildIndex(urlMappings, entryPoint);

    if (entryPoint.children) {
      entryPoint.children.forEach((child: DeclarationReflection) => {
        this.buildPages(child, urlMappings);
      });
    }

    if (this.options.markdownFlavor === 'gitbook') {
      this.buildNavigation(urlMappings, this.getNavigation(project).children);
    }

    return urlMappings;
  }

  public getUrl(
    reflection: Reflection,
    relative?: Reflection,
    separator: string = '.',
  ): string {
    let url =
      this.options.markdownFlavor === 'githubWiki'
        ? reflection.getAlias().replace(/_/g, '')
        : reflection.getAlias();
    url =
      this.options.markdownFlavor === 'githubWiki'
        ? url.charAt(0).toUpperCase() + url.slice(1)
        : url;
    if (
      reflection.parent &&
      reflection.parent !== relative &&
      !(reflection.parent instanceof ProjectReflection)
    ) {
      url = this.getUrl(reflection.parent, relative, separator) + separator + url;
    }

    return url;
  }

  public buildPages(reflection: DeclarationReflection, urls: UrlMapping[]) {
    const mapping = DefaultTheme.getMapping(reflection);

    if (mapping) {
      if (!reflection.url || !DefaultTheme.URL_PREFIX.test(reflection.url)) {
        const url =
          this.options.markdownFlavor === 'githubWiki'
            ? [this.getUrl(reflection, undefined, '-') + '.md'].join('/')
            : [mapping.directory, this.getUrl(reflection, undefined, '.') + '.md'].join(
                '/',
              );

        urls.push(new UrlMapping(url, reflection, mapping.template));
        reflection.url = url;
        reflection.hasOwnDocument = true;
      }
      if (reflection.children) {
        for (const key in reflection.children) {
          if (reflection.children.hasOwnProperty(key)) {
            const child = reflection.children[key];
            if (mapping.isLeaf || this.options.markdownFlavor === 'githubWiki') {
              this.applyAnchorUrl(child, reflection);
            } else {
              this.buildPages(child, urls);
            }
          }
        }
      }
    } else if (reflection.parent) {
      this.applyAnchorUrl(reflection, reflection.parent);
    }

    return urls;
  }

  public buildIndex(urlMappings: any, entryPoint: any) {
    urlMappings.push(
      new UrlMapping(
        this.options.markdownFlavor === 'githubWiki' ? 'Home.md' : 'README.md',
        Object.assign(entryPoint, { displayReadme: true }),
        'index.hbs',
      ),
    );
  }

  public buildNavigation(urlMappings: any, navigationChildren: any) {
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

  public applyAnchorUrl(reflection: Reflection, container: Reflection) {
    if (!reflection.url || !DefaultTheme.URL_PREFIX.test(reflection.url)) {
      let anchor = MarkdownTheme.getUrl(reflection, container, '.');

      if (reflection['isStatic']) {
        anchor = 'static-' + anchor;
      }

      let anchorRef = anchor;

      if (this.options.markdownFlavor === 'bitbucket') {
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
      }

      reflection.url =
        (container.url !== undefined ? container.url : '') + '#' + anchorRef;
      reflection.anchor = anchor;
      reflection.hasOwnDocument = false;
    }

    reflection.traverse((child: any) => {
      if (child instanceof DeclarationReflection) {
        this.applyAnchorUrl(child, container);
      }
    });
  }
}
