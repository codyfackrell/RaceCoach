import dotenv from "dotenv";
import { AuthorizationCode } from "simple-oauth2";
dotenv.config();

const config = {
  client: {
    id: process.env.GARAGE61_CLIENT_ID,
    // secret: "<client-secret>", ** Not required for public (localhost) applications.
  },
  auth: {
    tokenHost: "https://garage61.net",
    tokenPath: "/api/oauth/token",
    authorizeHost: "https://garage61.net",
    authorizePath: "/app/account/oauth",
  },
  options: {
    authorizationMethod: "body",
  },
};

export const oauthClient = new AuthorizationCode(config);
