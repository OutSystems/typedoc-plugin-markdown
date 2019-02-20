describe(`[partial] member.gettersetter`, () => {
  test('should compile getter', () => {
    const context = {
      name: 'readOnlyNameProperty',
      originalName: 'readOnlyNameProperty',
      getSignature: {},
    };
    const result = global.compileTemplate('member.getterSetter.hbs', context);
    expect(result).toMatchSnapshot();
  });

  test('should compile setter', () => {
    const context = {
      setSignature: {
        name: '__set',
        flags: [],
        id: 91,
        originalName: '__set',
        kind: 1048576,
        parameters: [
          {
            name: 'value',
            flags: [],
            id: 92,
            parent: null,
            originalName: 'value',
            kind: 32768,
            type: { type: 'intrinsic', name: 'string' },
          },
        ],
        type: { type: 'intrinsic', name: 'void' },
        kindString: 'Set signature',
      },
    };
    const result = global.compileTemplate('member.getterSetter.hbs', context);
    expect(result).toMatchSnapshot();
  });
});
