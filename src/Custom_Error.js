export class ConfigError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConfigError';
        this.isCustom = true;
    }
}

export class FlagError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FlagError';
        this.isCustom = true;
    }
}

export class PathError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PathError';
        this.isCustom = true;
    }
}