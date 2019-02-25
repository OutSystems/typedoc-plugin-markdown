import { Application } from 'typedoc';
import { ParameterType } from 'typedoc/dist/lib/utils/options/declaration';
import { MarkdownPlugin } from './plugin';

module.exports = (PluginHost: Application) => {
  const app = PluginHost.owner;

  app.options.addDeclaration({
    component: 'markdown',
    help: 'Markdown Plugin: Suppress file sources from output.',
    name: 'omitSourceFiles',
    type: ParameterType.Boolean,
  });

  app.options.addDeclaration({
    component: 'markdown',
    defaultValue: 'github',
    help:
      'Markdown Plugin: (github|bitbucket|gitbook) Specifies the markdown rendering engine.',
    name: 'markdownFlavor',
    type: ParameterType.String,
  });

  app.options.addDeclaration({
    component: 'markdown',
    help:
      'The repository to use for source files (ignored unless markdownFlavour is set)',
    name: 'bitbucketRepo',
    type: ParameterType.String,
  });

  app.converter.addComponent('markdown', new MarkdownPlugin(app.converter));
};
