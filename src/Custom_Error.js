class ConfigError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConfigError';
        this.isCustom = true;
    }
}

class FlagError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FlagError';
        this.isCustom = true;
    }
}

class PathError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PathError';
        this.isCustom = true;
    }
}

// export { ConfigError, FlagError, PathError }
module.exports = { ConfigError, FlagError, PathError }