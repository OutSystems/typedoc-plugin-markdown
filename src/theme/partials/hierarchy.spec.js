const context = {
  types: [
    {
      type: 'reference',
      name: 'PrivateClass',
      symbolID: -1,
      reflection: { extendedTypes: true },
    },
  ],
};

describe(`hierachy.hbs`, () => {
  test('should compile', () => {
    const result = global.compileTemplate('hierarchy.hbs', context);
    expect(result).toMatchSnapshot();
  });
});
