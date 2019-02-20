describe(`[partial] member.parameters`, () => {
  test('should compile', () => {
    const context = {
      parameters: [
        {
          name: 'paramZ',
          flags: [],
          id: 350,
          parent: null,
          originalName: 'paramZ',
          kind: 32768,
          type: { type: 'intrinsic', name: 'string' },
          comment: { shortText: '', text: 'This is a string parameter.' },
          kindString: 'Parameter',
        },
        {
          name: 'paramG',
          flags: [],
          id: 351,
          parent: null,
          originalName: 'paramG',
          kind: 32768,
          type: { type: 'intrinsic', name: 'any' },
          comment: {
            shortText: '',
            text:
              'This is a parameter flagged with any.\n\n    This sentence is placed in the next line.\n',
          },
          kindString: 'Parameter',
        },
        {
          name: 'paramA',
          flags: [],
          id: 352,
          parent: null,
          originalName: 'paramA',
          kind: 32768,
          type: {
            type: 'reference',
            name: 'INameInterface',
            symbolID: -1037,
            reflection: null,
          },
          comment: {
            shortText: '',
            text:
              "\nThis is a **parameter** pointing to an interface.\n\n```\nvar value:BaseClass = new BaseClass('test');\nfunctionWithArguments('arg', 0, value);\n```\n\n",
          },
          kindString: 'Parameter',
        },
      ],
    };
    const result = global.compileTemplate('member.parameters.hbs', context);
    expect(result).toMatchSnapshot();
  });
});
