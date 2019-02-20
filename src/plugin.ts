import * as path from 'path';
import { Component, ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Converter } from 'typedoc/dist/lib/converter/converter';
import { PageEvent } from 'typedoc/dist/lib/output/events';
import { MarkdownTheme } from './theme/markdown-theme';

@Component({ name: 'markdown' })
export class MarkdownPlugin extends ConverterComponent {
  public initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_RESOLVE_BEGIN]: this.onBegin,
    });
    this.listenTo(this.application.renderer, {
      [PageEvent.END]: this.onPageEnd,
    });
  }

  private onBegin() {
    const renderer = this.application.renderer;
    const options = this.application.options;
    if (options.getValue('theme') === 'markdown') {
      renderer.theme = renderer.addComponent(
        'theme',
        new MarkdownTheme(
          renderer,
          path.join(__dirname, './theme/'),
          options.getRawValues(),
        ),
      );
    }
  }

  private onPageEnd(page: PageEvent) {
    page.contents = page.contents ? page.contents.replace(/[\r?\n]{3,}/g, '\n\n') : '';
  }
}
