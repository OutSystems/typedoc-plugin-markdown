const { Application } = require('typedoc');
const { MarkdownTheme } = require('../../dist/theme/markdown-theme');

describe(`[theme] markdown theme`, () => {
  test('should compile', () => {
    const app = new Application({
      mode: 'Modules',
      module: 'CommonJS',
      target: 'ES5',
    });
    const theme = new MarkdownTheme(app.renderer, './dist/theme', {
      mode: 'Modules',
      module: 'CommonJS',
      target: 'ES5',
    });
    const project = app.convert(app.expandInputFiles(['./test/src']));
    const urlMappings = theme.getUrls(project);
    const urls = urlMappings.map(urlMapping => {
      return urlMapping.url;
    });
    expect(urls).toMatchSnapshot();
  });
});
