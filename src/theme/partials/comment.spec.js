describe(`comment.hbs`, () => {
  test('should compile with tags', () => {
    const context = {
      comment: {
        shortText: '',
        text: '',
        tags: [
          { tagName: 'name', paramName: '', text: 'AbstractMetadataModule' },
          {
            tagName: 'description',
            paramName: '',
            text:
              '\nProvides the module for the [[BaseClass]]\n```json\n{\n "declarations": ["AbstractMetadataComponent"],\n "exports": ["AbstractMetadataComponent"],\n "imports": [\n   "IonicModule",\n   "StackIonSelectModule"\n ],\n "providers": []\n}\n```\n',
          },
        ],
        hasVisibleComponent: () => true,
      },
    };
    const result = global.compileTemplate('comment.hbs', context);
    expect(result).toMatchSnapshot();
  });

  test('should compile with deprecation', () => {
    const context = {
      comment: {
        shortText: 'Some deprecation',
        text: '',
        tags: [
          {
            tagName: 'deprecated',
            paramName: '',
            text: '\n```typescript\nsomethingElse();\n```\n',
          },
        ],
        hasVisibleComponent: () => true,
      },
    };
    const result = global.compileTemplate('comment.hbs', context);
    expect(result).toMatchSnapshot();
  });
});
