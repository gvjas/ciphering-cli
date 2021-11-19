const { errorHandler } = require('../src/error_handler.js');
const { ConfigError, FlagError, PathError } = require("../src/Custom_Error");

test('should system Error', () => {
    expect(() => errorHandler(new Error)).toThrow();
});


