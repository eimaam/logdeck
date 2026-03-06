import { NodeEnvEnum, type NodeEnv } from "@logdeck/shared";

const NODE_ENVIRONMENT = (import.meta.env.VITE_ENVIRONMENT as NodeEnv) || NodeEnvEnum.DEVELOPMENT;

// app config export
const app = {
  NAME: import.meta.env.VITE_APP_NAME || "LogDeck",
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173",
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || "support@logdeck.dev",
  X_HANDLE: import.meta.env.VITE_X_HANDLE || "logdeck",
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID
}

export const config = {
  NODE_ENVIRONMENT,
  app,
};
