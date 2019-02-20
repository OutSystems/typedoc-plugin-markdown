const context = {
  project: {
    name: 'typedoc-plugin-markdown',
  },
  model: {
    kindString: 'External module',
    name: 'Reflection name',
    hasComment: true,
    typeHierarchy: {},
    typeParameters: {},
    implementedTypes: [0, 0],
    implementedBy: [0, 0],
    signatures: {},
    indexSignature: {},
    args: {},
  },
};

describe(`reflection.hbs`, () => {
  test('should compile', () => {
    const result = global.compileTemplate('reflection.hbs', context, 'template');
    expect(result).toMatchSnapshot();
  });
});
