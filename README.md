# typedoc-plugin-markdown

A plugin for [TypeDoc](https://github.com/TypeStrong/typedoc) that exposes a theme and additional arguments for rendering markdown.

[![npm](https://img.shields.io/npm/v/typedoc-plugin-markdown.svg)](https://www.npmjs.com/package/typedoc-plugin-markdown)
[![Build Status](https://travis-ci.org/tgreyuk/typedoc-plugin-markdown.svg?branch=master)](https://travis-ci.org/tgreyuk/typedoc-plugin-markdown)

## Installation

```bash
npm install --save-dev typedoc typedoc-plugin-markdown
```

## Usage

The plugin provides an additional 'markdown' theme that can be referenced by name:

#### shell

```bash
$ node_modules/.bin/typedoc --theme markdown
```

#### npm script

```json
"scripts": {
 "docs": "typedoc --theme markdown"
}
```

## Additional arguments

The plugin exposes the following arguments in addition to TypeDoc's defaults:

- `--markdownFlavor <github|githubWiki|bitbucket|gitbook>`<br>
  Specify the target markdown flavor: "github" (default), "githubWiki", "bitbucket" or "gitbook"

* `--flatten`<br>
  Flattens output, merges classes and modules to single files.

* `--omitSourceFiles`<br>
  Suppress source file linking from output.

- `--bitbucketRepo <path.to.repo>`<br>
  For projects hosted on GitHub TypeDoc resolves source files. This argument allows targeting of source files hosted on other environments use the format `https://bitbucket.org/owner/repository_name`.

## Flavors

### github (default)

Optimized for GitHub Flavored markdown.

### githubWiki

Generates stuff for githubWiki.

### bitbucket

Renders markdown to support Bitbucket's internal anchor linking.

### gitbook

Generates additional SUMMARY.md file to enable a table of contents.

## What does it look like?

The markdown theme aims to provide the same functionality as the default theme with a simple breadcrumb navigation. To get an idea of the output view [some generic example output](https://github.com/tgreyuk/typedoc-plugin-markdown/tree/master/examples/out/README.md).

## Version 2

Version 2 has been re-written contains no dependancies.

- Argument names have been made more verbose
- Zero dependancies
- Introdocues flatten and github wiki flavors.
- Support for categorization.

## Acknowledgements

Thanks to kimamula's [typedoc-markdown-theme](https://github.com/kimamula/typedoc-markdown-theme) for the inspiration behind this project.
