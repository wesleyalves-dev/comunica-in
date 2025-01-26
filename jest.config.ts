import type { Config } from "jest";
import nextJest from "./frontend/node_modules/next/jest";

async function createConfig(): Promise<Config> {
  const createJestConfig = nextJest({
    dir: "./frontend",
  });
  const config = createJestConfig({
    rootDir: "./frontend",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  });
  const frontendConfig = await config();

  return {
    collectCoverage: true,
    coverageProvider: "v8",
    testMatch: ["**/*.spec.ts"],
    projects: [
      {
        displayName: "backend",
        clearMocks: true,
        rootDir: "./backend",
        transform: {
          "^.+\\.ts$": "ts-jest",
        },
      },
      frontendConfig,
    ],
  };
}

module.exports = createConfig();
