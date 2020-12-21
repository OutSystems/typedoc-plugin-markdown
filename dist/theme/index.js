"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const index_1 = require("typedoc/dist/lib/models/reflections/index");
const UrlMapping_1 = require("typedoc/dist/lib/output/models/UrlMapping");
const DefaultTheme_1 = require("typedoc/dist/lib/output/themes/DefaultTheme");
const props_1 = require("./props");
const utils_1 = require("./utils");
class MarkdownTheme extends DefaultTheme_1.DefaultTheme {
    static buildUrls(reflection, urls) {
        const mapping = DefaultTheme_1.DefaultTheme.getMapping(reflection);
        if (mapping) {
            if (!reflection.url || !DefaultTheme_1.DefaultTheme.URL_PREFIX.test(reflection.url)) {
                const url = [mapping.directory, DefaultTheme_1.DefaultTheme.getUrl(reflection) + '.md'].join('/');
                urls.push(new UrlMapping_1.UrlMapping(url, reflection, mapping.template));
                reflection.url = url;
                reflection.hasOwnDocument = true;
            }
            if (reflection.children) {
                for (const key in reflection.children) {
                    if (reflection.children.hasOwnProperty(key)) {
                        const child = reflection.children[key];
                        if (mapping.isLeaf) {
                            MarkdownTheme.applyAnchorUrl(child, reflection);
                        }
                        else {
                            MarkdownTheme.buildUrls(child, urls);
                        }
                    }
                }
            }
        }
        else if (reflection.parent) {
            MarkdownTheme.applyAnchorUrl(reflection, reflection.parent);
        }
        return urls;
    }
    static applyAnchorUrl(reflection, container) {
        if (!reflection.url || !DefaultTheme_1.DefaultTheme.URL_PREFIX.test(reflection.url)) {
            let anchor = DefaultTheme_1.DefaultTheme.getUrl(reflection, container, '.');
            if (reflection['isStatic']) {
                anchor = 'static-' + anchor;
            }
            let anchorRef = anchor;
            if (utils_1.getMarkdownEngine() === 'bitbucket') {
                let anchorPrefix = '';
                if (reflection.kind === index_1.ReflectionKind.ObjectLiteral) {
                    anchorPrefix += 'object-literal-';
                }
                reflection.flags.forEach(flag => {
                    anchorPrefix += `${flag}-`;
                });
                const prefixRef = utils_1.getAnchorRef(anchorPrefix);
                const reflectionRef = utils_1.getAnchorRef(reflection.name);
                anchorRef = `markdown-header-${prefixRef}${reflectionRef}`;
            }
            reflection.url =
                (container.url !== undefined ? container.url : '') + '#' + anchorRef;
            reflection.anchor = anchor;
            reflection.hasOwnDocument = false;
        }
        reflection.traverse((child) => {
            if (child instanceof index_1.DeclarationReflection) {
                MarkdownTheme.applyAnchorUrl(child, container);
            }
        });
    }
    constructor(renderer, basePath, options) {
        super(renderer, basePath);
        renderer.removeComponent('assets');
        renderer.removeComponent('javascript-index');
        renderer.removeComponent('toc');
        renderer.removeComponent('pretty-print');
        props_1.setProps(options, this.resources);
    }
    isOutputDirectory(outPath) {
        const files = fs.readdirSync(outPath);
        return (fs.existsSync(path.join(outPath, 'README.md')) ||
            (files.length === 1 && path.extname(files[0]) === '.md'));
    }
    getUrls(project) {
        const urlMappings = [];
        const entryPoint = this.getEntryPoint(project);
        entryPoint.url = 'README.md';
        urlMappings.push(new UrlMapping_1.UrlMapping('README.md', Object.assign({}, entryPoint, {
            displayReadme: this.application.options.getValue('readme') !== 'none',
            isIndex: true,
            url: 'README.md',
        }), 'reflection.hbs'));
        if (entryPoint.children) {
            entryPoint.children.forEach((child) => {
                MarkdownTheme.buildUrls(child, urlMappings);
            });
        }
        if (utils_1.getMarkdownEngine() === 'gitbook') {
            const navigationChildren = this.getNavigation(project).children;
            if (navigationChildren) {
                const navigation = navigationChildren.map(navigationItem => {
                    const dedicatedUrls = navigationItem.dedicatedUrls
                        ? navigationItem.dedicatedUrls.map(url => {
                            return {
                                title: () => {
                                    const urlMapping = urlMappings.find(item => {
                                        return item.url === url;
                                    });
                                    return urlMapping ? urlMapping.model.name : null;
                                },
                                url,
                            };
                        })
                        : null;
                    return Object.assign({}, navigationItem, { dedicatedUrls });
                });
                urlMappings.push(new UrlMapping_1.UrlMapping('SUMMARY.md', { navigation }, 'summary.hbs'));
            }
        }
        return urlMappings;
    }
}
exports.MarkdownTheme = MarkdownTheme;