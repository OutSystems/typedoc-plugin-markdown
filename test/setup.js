const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');

const { formatContents } = require('../dist/theme/utils');
const { compact } = require('typedoc/dist/lib/output/helpers/compact');

Handlebars.registerHelper('relativeURL', () => '[relativeURL]');
Handlebars.registerHelper('compact', compact);

fs.readdirSync('./dist/theme/partials').forEach(file => {
  const id = file.replace('.hbs', '');
  Handlebars.registerPartial(id, `[${id}]`);
});

fs.readdirSync('./dist/theme/helpers').forEach(file => {
  const helper = require(`../dist/theme/helpers/${file}`);
  const name = Object.keys(helper)[0];
  Handlebars.registerHelper(name, helper[name]);
});

global.compileTemplate = (name, context, type = 'partial') => {
  const hbs = fs.readFileSync(path.resolve(__dirname, `../src/theme/${type}s/${name}`));
  const output = formatContents(Handlebars.compile(hbs.toString())(context));
  return output;
};

global.compileString = (hbs, context) => {
  return Handlebars.compile(hbs)(context);
};
