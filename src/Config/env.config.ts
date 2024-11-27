import dotenv from "dotenv";
import { Config } from "../Interfaces";

dotenv.config();

/**
 * Get the application configuration from environment variables.
 * @returns {Config} The configuration object.
 */
const getConfig = (): Config => {
	return {
		// Define database URL based on the environment.
		dbName:
			String(process.env.ENVIRONMENT) === "developement"
				? String(process.env.DB_DEV_NAME?.trim())
				: String(process.env.DB_PROD_NAME?.trim()),
		dbUser:
			String(process.env.ENVIRONMENT) === "developement"
				? String(process.env.DB_DEV_USER?.trim())
				: String(process.env.DB_PROD_USER?.trim()),
		dbPass:
			String(process.env.ENVIRONMENT) === "developement"
				? String(process.env.DB_DEV_PASS?.trim())
				: String(process.env.DB_PROD_PASS?.trim()),
		dbHost:
			String(process.env.ENVIRONMENT) === "developement"
				? String(process.env.DB_DEV_HOST?.trim())
				: String(process.env.DB_PROD_HOST?.trim()),
		environment: process.env.ENVIRONMENT ? String(process.env.ENVIRONMENT) : "",
		jwtSecret: process.env.JWT_SECRET_DEV ? String(process.env.JWT_SECRET_DEV) : String(process.env.JWT_SECRET_PROD),


		// Application port with a default value.
		port: process.env.PORT ? String(process.env.PORT) : "8002",
	};
};

/**
 * Validate the keys in the configuration object to ensure they are defined.
 * @param {Config} config - The application configuration object.
 * @returns {Config} The sanitized configuration object.
 * @throws {Error} If any required keys are missing.
 */
const getSanitizedConfig = (config: Config): Config => {
	for (const [key, value] of Object.entries(config)) {
		if (value === undefined) {
			throw new Error(`Missing key ${key} in .env`);
		}
	}
	return config as Config;
};

// Get the configuration and sanitize it.
const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
