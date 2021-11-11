class ConfigError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConfigError';
        this.isCustom = true;
    }
}

export default ConfigError