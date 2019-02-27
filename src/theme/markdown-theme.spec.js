const { Application } = require('typedoc');
const { MarkdownTheme } = require('../../dist/theme/markdown-theme');
const jsonfile = require('jsonfile');
const path = require('path');

describe(`[theme] github flavor (default)`, () => {
  test('should generate URLs', () => {
    const app = new Application({
      mode: 'Modules',
      module: 'CommonJS',
      target: 'ES5',
      theme: 'markdown',
      plugin: path.join(__dirname, '../../dist/index'),
    });
    const project = app.convert(app.expandInputFiles(['./test/src']));
    const theme = app.renderer.theme;
    const urlMappings = theme.getUrls(project);
    const urls = urlMappings.map(urlMapping => {
      return urlMapping.url;
    });
    expect(urls).toMatchSnapshot();
  });
});

describe(`[theme] githubWiki`, () => {
  test('should generate URLs', () => {
    const app = new Application({
      mode: 'Modules',
      module: 'CommonJS',
      target: 'ES5',
      theme: 'markdown',

      plugin: path.join(__dirname, '../../dist/index'),
    });
    app.options.setValue('markdownFlavor', 'githubWiki');
    const project = app.convert(app.expandInputFiles(['./test/src']));
    const theme = app.renderer.theme;
    const urlMappings = theme.getUrls(project);
    const urls = urlMappings.map(urlMapping => {
      return urlMapping.url;
    });
    expect(urls).toMatchSnapshot();
  });
});
describe(`[theme] gitbook`, () => {
  test('should generate URLs', () => {
    const app = new Application({
      mode: 'Modules',
      module: 'CommonJS',
      target: 'ES5',
      theme: 'markdown',
      plugin: path.join(__dirname, '../../dist/index'),
    });
    app.options.setValue('markdownFlavor', 'gitbook');
    const project = app.convert(app.expandInputFiles(['./test/src']));
    const theme = app.renderer.theme;
    const urlMappings = theme.getUrls(project);
    const urls = urlMappings.map(urlMapping => {
      return urlMapping.url;
    });
    expect(urls).toMatchSnapshot();
  });
});
