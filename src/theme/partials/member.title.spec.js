describe(`member.title.hbs`, () => {
  test('should compile', () => {
    const context = { name: 'member' };
    const result = global.compileTemplate('member.title.hbs', context);
    expect(result).toMatchSnapshot();
  });

  test('should compile with flags', () => {
    const context = { name: 'member', flags: ['Static'] };
    const result = global.compileTemplate('member.title.hbs', context);
    expect(result).toMatchSnapshot();
  });
});
