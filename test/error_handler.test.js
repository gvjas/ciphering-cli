const { errorHandler } = require('../src/error_handler.js');
const { ConfigError, FlagError, PathError } = require("../src/Custom_Error");


describe("errorHandler", () => {
    test('should system Error', () => {
        expect(() => errorHandler(new Error)).toThrow(Error);
    });

    const realProcessExit = process.exit;
    process.exit = jest.fn(() => { throw new ConfigError("mockExit"); });
    afterAll(() => { process.exit = realProcessExit; });


    test("should exit the program", () => {
        try {
            errorHandler(new ConfigError("mockExit"))
            expect(() => errorHandler(new ConfigError("mockExit"))).toThrow(ConfigError)
        } catch (error) {
            expect(process.exit).toBeCalledWith(1);
        }
    });
});