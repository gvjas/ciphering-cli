const { ConfigError, FlagError, PathError } = require("../src/Custom_Error");

function compileCode(error) {
    throw error;
  }

test('compiling goes as expected', () => {
    expect(() => compileCode(new PathError('you are using the wrong'))).toThrow();
    expect(() => compileCode(new ConfigError('you are using the wrong'))).toThrow(ConfigError); 
    expect(() => compileCode(new FlagError('you are using the wrong'))).toThrow('you are using the wrong');
    expect(new FlagError().name).toMatch('FlagError');
    expect(new PathError().isCustom).toBeTruthy();
  });