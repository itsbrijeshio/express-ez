import dotenv from "dotenv";
dotenv.config();
/* The `EnvConfig` class provides a way to manage environment configuration variables with default
values and the ability to get, set, and retrieve all configuration values. */

class EnvConfig {
  constructor(defaults = {}) {
    this.defaults = {
      NODE_ENV: process.env.NODE_ENV || "development",
      JWT_SECRET: process.env.JWT_SECRET || "default_secret",
      JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
      MAX_AGE: process.env.MAX_AGE || 24,
      ...defaults, // User-provided defaults
    };
  }

  get(key) {
    return process.env[key] ?? this.defaults[key];
  }

  getAll() {
    return { ...this.defaults, ...process.env }; // Merged values
  }

  set({ key: value }) {
    this.defaults[key] = value;
  }
}

export default new EnvConfig();
