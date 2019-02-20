describe(`[partial] member.indexSignatures`, () => {
  test('should compile', () => {
    const context = {
      indexSignature: {
        name: '__index',
        flags: [],
        id: 534,
        parent: null,
        originalName: '__index',
        kind: 8192,
        parameters: [
          {
            name: 'index',
            flags: [],
            id: 535,
            parent: null,
            originalName: 'index',
            kind: 32768,
            type: { type: 'intrinsic', name: 'number' },
            kindString: 'Parameter',
          },
        ],
        type: { type: 'intrinsic', name: 'string' },
        sources: [
          {
            file: null,
            fileName: 'interfaces.ts',
            line: 70,
            character: 32,
            url:
              'https://github.com/tgreyuk/typedoc-plugin-markdown/blob/master/test/src/interfaces.ts#L70',
          },
        ],
        kindString: 'Index signature',
      },
    };
    const result = global.compileTemplate('member.indexSignatures.hbs', context);
    expect(result).toMatchSnapshot();
  });
});
