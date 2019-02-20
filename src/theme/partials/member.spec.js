describe(`member.hbs`, () => {
  test('should compile with delcaration', () => {
    const context = { name: 'member' };
    const result = global.compileTemplate('member.hbs', context);
    expect(result).toMatchSnapshot();
  });

  test('should compile with signature', () => {
    const context = {
      name: 'member',
      signatures: [{}],
    };
    const result = global.compileTemplate('member.hbs', context);
    expect(result).toMatchSnapshot();
  });

  test('should compile with getter setter', () => {
    const context = {
      name: 'member',
      hasGetterOrSetter: () => true,
    };
    const result = global.compileTemplate('member.hbs', context);
    expect(result).toMatchSnapshot();
  });
});
