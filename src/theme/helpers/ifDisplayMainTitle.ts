import { getMarkdownEngine } from '../utils';

/**
 * Return true if index item should be displayed
 * @param item
 * @param opts
 */
export function ifDisplayMainTitle(item: any, opts: any) {
    if (
        getMarkdownEngine() === 'gitbook' ||
        item.model.displayReadme ||
        (getMarkdownEngine() === 'githubWiki' && !item.model.isIndex)
    ) {
        return opts.inverse(this);
    } else {
        return opts.fn(this);
    }
}
