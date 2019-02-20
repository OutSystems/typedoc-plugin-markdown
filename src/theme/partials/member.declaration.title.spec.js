describe(`member.declaration.title.hbs`, () => {
  test('should compile', () => {
    const context = {
      name: 'numbers',
      originalName: 'numbers',
      kind: 32,
      defaultValue: ' [1, 2, 3]',
      type: { type: 'array', elementType: { type: 'intrinsic', name: 'number' } },
      kindString: 'Variable',
    };
    const result = global.compileTemplate('member.declaration.title.hbs', context);
    expect(result).toMatchSnapshot();
  });
});
