import * as fs from 'fs-extra';
import { Application } from 'typedoc';
const app = new Application({ mode: 'Modules', module: 'CommonJS', target: 'ES5' });
const result = app.convert(app.expandInputFiles(['./test/src']));

function replacer(key: any, value: any) {
  if (
    key === 'parent' ||
    key === 'reflection' ||
    key === 'reflections' ||
    key === 'symbolMapping' ||
    key === 'file' ||
    key === 'cssClasses' ||
    key === '_alias' ||
    key === '_aliases' ||
    key === 'directory' ||
    key === 'packageInfo' ||
    key === 'files'
  ) {
    return null;
  }
  return value;
}
fs.writeFileSync(`./test/fixtures/modules.json`, JSON.stringify(result, replacer));

// fs.writeFileSync(
// `./test/out/fixtures/reflection.json`,
// JSON.stringify(result.findReflectionByName('functionWithArguments'), replacer),
// );

console.log(`[typedoc-plugin-markdown(task:fixtures)] writing modules.json fixture`);
