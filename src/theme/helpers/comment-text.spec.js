describe(`[helper] comment-text`, () => {
  test('should compile with include', () => {
    const context = {
      text: '[[include:class-example.md]]\n',
      root: {
        settings: {
          includes: 'test/src/inc/',
          media: 'test/src/media/',
        },
        url: 'modules/_flattened_.md',
      },
    };
    const hbs = '{{{commentText text root}}}';
    const result = global.compileString(hbs, context);
    const fixture = `This is a simple example on how to use BaseClass.

![My image alt text](../media/logo-128.png)
`;
    expect(result).toEqual(fixture);
  });
  test('should compile with links', () => {
    const context = {
      text: 'Link to a class: [[BaseClass]]',
      root: {
        project: {
          findReflectionByName: () => {
            return {
              name: 'BaseClass',
              url: 'classes/_classes_.baseclass.md',
            };
          },
        },
        url: 'modules/_flattened_.md',
      },
    };
    const hbs = '{{{commentText text root}}}';
    const result = global.compileString(hbs, context);
    const fixture = `Link to a class: [BaseClass](../classes/_classes_.baseclass.md)`;
    expect(result).toEqual(fixture);
  });

  test('should compile with internal links', () => {
    const context = {
      text: 'Link to an internal function: [[someFunction]]',
      root: {
        project: {
          findReflectionByName: () => {
            return {
              name: 'someFunction',
              url: 'classes/_classes_.baseclass.md#someFunction',
            };
          },
        },
        url: 'classes/_classes_.baseclass.md',
      },
    };
    const hbs = '{{{commentText text root}}}';
    const result = global.compileString(hbs, context);
    const fixture = `Link to an internal function: [someFunction](_classes_.baseclass.md#someFunction)`;
    expect(result).toEqual(fixture);
  });
});
