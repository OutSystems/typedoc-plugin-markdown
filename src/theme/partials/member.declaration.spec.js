describe(`member.declaration.hbs`, () => {
  test('should compile', () => {
    const context = {
      name: 'numbers',
      comment: {},
      sources: [],
    };

    const result = global.compileTemplate('member.declaration.hbs', context);
    expect(result).toMatchSnapshot();
  });

  test('should compile with type declarations', () => {
    const context = {
      name: 'specular',
      sources: [],
      type: {
        type: 'reflection',
        declaration: {
          sources: [],
          signatures: [],
        },
      },
    };

    const result = global.compileTemplate('member.declaration.hbs', context);
    expect(result).toMatchSnapshot();
  });
});
