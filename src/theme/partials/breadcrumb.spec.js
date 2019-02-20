const context = {
  parent: {},
  name: 'name',
  url: 'url',
};

describe(`breadcrumb.hbs`, () => {
  test('should compile', () => {
    const result = global.compileTemplate('breadcrumb.hbs', context);
    expect(result).toMatchSnapshot();
  });
});
