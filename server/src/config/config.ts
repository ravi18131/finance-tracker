import dotenv from "dotenv";
dotenv.config();

/**
 * Function to validate environment variables in application
 * @param key
 * @param defaultValue
 * @param warnDefault
 * @returns
 */
const validateEnv = <T extends string = string>(
  key: keyof NodeJS.ProcessEnv,
  defaultValue?: T,
  warnDefault = false
): T => {
  const value = process.env[key] as T | undefined;

  if (!value) {
    if (typeof defaultValue !== "undefined") {
      if (warnDefault) {
        const message = `validateEnv is using a default value for ${key} and has this warning enabled.`;
        console.warn(new Error(message));
      }

      return defaultValue;
    } else {
      throw new Error(`${key} is not defined in environment variables`);
    }
  }

  return value;
};

/**
 * Register all environment variables here for better error handling and use this config in place of process.env
 */
const config = {
  PORT: validateEnv("PORT", "5021", true),
  DATABASE_URL: validateEnv("DATABASE_URL"),
  ACCESS_TOKEN_PUBLIC_KEY: validateEnv("ACCESS_TOKEN_PUBLIC_KEY"),
  ACCESS_TOKEN_PRIVATE_KEY: validateEnv("ACCESS_TOKEN_PRIVATE_KEY"),
  REFRESH_PUBLIC_KEY: validateEnv("REFRESH_PUBLIC_KEY"),
  REFRESH_PRIVATE_KEY: validateEnv("REFRESH_PRIVATE_KEY"),
  REDIS_URL: validateEnv("REDIS_URL"),
};

export default config;
