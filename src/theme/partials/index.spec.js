const context = {
  groups: [
    {
      children: [
        {
          name: 'amount',
          url: 'modules/_variables_.md#amount',
        },
        {
          name: 'color',
          url: 'modules/_variables_.md#color',
        },
        {
          name: 'isDone',
          url: 'modules/_variables_.md#isdone',
        },
        {
          name: 'numbers',
          url: 'modules/_variables_.md#numbers',
        },
      ],
      title: 'Variables',
      someChildrenAreExported: true,
      allChildrenAreInherited: false,
      allChildrenArePrivate: false,
      allChildrenAreProtectedOrPrivate: false,
      allChildrenAreExternal: false,
    },
  ],
  args: {},
};

describe(`index.hbs`, () => {
  test('should compile', () => {
    const result = global.compileTemplate('index.hbs', context);
    expect(result).toMatchSnapshot();
  });
});
