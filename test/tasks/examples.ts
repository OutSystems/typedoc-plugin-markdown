import { Application } from 'typedoc';

const path = require('path');

const gitbook = new Application({
  mode: 'Modules',
  module: 'CommonJS',
  target: 'ES5',
  theme: 'markdown',
  plugin: path.join(__dirname, '../../dist/index'),
});
gitbook.options.setValue('markdownFlavor', 'gitbook');
gitbook.generateDocs(
  gitbook.expandInputFiles(['./test/src']),
  path.join(__dirname, '../out/gitbook'),
);

const githubWiki = new Application({
  mode: 'Modules',
  module: 'CommonJS',
  target: 'ES5',
  theme: 'markdown',
  plugin: path.join(__dirname, '../../dist/index'),
});
githubWiki.options.setValue('markdownFlavor', 'githubWiki');
githubWiki.generateDocs(
  gitbook.expandInputFiles(['./test/src']),
  path.join(__dirname, '../out/githubWiki'),
);
