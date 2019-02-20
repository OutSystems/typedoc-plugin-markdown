describe(`members.group.hbs`, () => {
  const context = {
    children: [{}, {}, {}],
    title: 'Variables',
    kind: 32,
    someChildrenAreExported: true,
    allChildrenAreInherited: false,
    allChildrenArePrivate: false,
    allChildrenAreProtectedOrPrivate: false,
    allChildrenAreExternal: false,
    args: {},
  };
  test('should compile', () => {
    const result = global.compileTemplate('members.group.hbs', context);
    expect(result).toMatchSnapshot();
  });
});
