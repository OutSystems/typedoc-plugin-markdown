import { Application } from 'typedoc';
import { ParameterType } from 'typedoc/dist/lib/utils/options/declaration';
import { MarkdownPlugin } from './plugin';

module.exports = (PluginHost: Application) => {
  const app = PluginHost.owner;

  if (app.converter.hasComponent('markdown')) {
    return;
  }

  app.options.addDeclaration({
    component: 'markdown',
    help: 'Markdown Plugin: Suppress file sources from output.',
    name: 'mdHideSources',
    type: ParameterType.Boolean,
  });

  app.options.addDeclaration({
    component: 'markdown',
    defaultValue: 'github',
    help:
      'Markdown Plugin: (github|bitbucket|gitbook) Specifies the markdown rendering engine.',
    name: 'mdEngine',
    type: ParameterType.String,
  });

  app.options.addDeclaration({
    component: 'markdown',
    defaultValue: 'github',
    help: 'Markdown Plugin: Deprectated - use --mdEngine.',
    name: 'mdFlavour',
    type: ParameterType.String,
  });

  app.options.addDeclaration({
    component: 'markdown',
    help:
      'The repository to use for source files (ignored unless markdownFlavour is set)',
    name: 'mdSourceRepo',
    type: ParameterType.String,
  });

  app.converter.addComponent('markdown', new MarkdownPlugin(app.converter));
};
