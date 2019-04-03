"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const os_1 = require("os");
const components_1 = require("typedoc/dist/lib/converter/components");
const converter_1 = require("typedoc/dist/lib/converter/converter");
const events_1 = require("typedoc/dist/lib/output/events");
const options_1 = require("typedoc/dist/lib/utils/options");
const theme_1 = require("./theme/");
let MarkdownPlugin = class MarkdownPlugin extends components_1.ConverterComponent {
    initialize() {
        this.listenTo(this.owner, {
            [converter_1.Converter.EVENT_RESOLVE_BEGIN]: this.onBegin,
        });
        this.listenTo(this.application.renderer, {
            [events_1.PageEvent.END]: this.onPageEnd,
        });
    }
    onBegin(context, reflection) {
        const renderer = this.application.renderer;
        const options = this.application.options;
        options.read({}, options_1.OptionsReadMode.Prefetch);
        const themeName = options.getValue('theme');
        const themePath = this.getThemeDirectory();
        if (themeName === 'markdown') {
            const markdownTheme = new theme_1.MarkdownTheme(renderer, themePath, options.getRawValues());
            renderer.theme = renderer.addComponent('theme', markdownTheme);
        }
    }
    onPageEnd(page) {
        var newlineRegex = (process.platform === 'win32' ? /(\r\n){3,}/g : /\n{3,}/g);
        page.contents = page.contents ? page.contents.replace(newlineRegex, os_1.EOL + os_1.EOL) : '';
    }
    getThemeDirectory() {
        return path.join(__dirname, './theme/');
    }
};
MarkdownPlugin = __decorate([
    components_1.Component({ name: 'markdown' })
], MarkdownPlugin);
exports.MarkdownPlugin = MarkdownPlugin;
