import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import base64url from "base64url";
import crypto from "crypto";
dotenv.config();

const router = express.Router();

//OAuth2 configuration
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
};

const sha256 = (str) => {
  return crypto.createHash("sha256").update(str).digest();
};

import { AuthorizationCode } from "simple-oauth2";

const client = new AuthorizationCode(config);

// Session secret middleware
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Authorization
router.get("/auth", (req, res) => {
  const codeVerifier = crypto.randomUUID();
  const codeChallenge = base64url(sha256(codeVerifier));

  req.session.pkceVerifier = codeVerifier;

  const state = crypto.randomUUID();
  req.session.oauthState = state;

  const authorizationUri = client.authorizeURL({
    redirect_uri: "http://localhost:5000/auth/callback",
    scope: "driving_data datapacks_subscriptions",
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  res.redirect(authorizationUri);
});

router.get("/auth/callback", async (req, res) => {
  const { code, state } = req.query;

  if (state != req.session.oauthState) {
    return res.status(403).send("Invalid state");
  }

  try {
    const token = await client.getToken({
      code,
      redirect_uri: "http://localhost:5000/auth/callback",
      code_verifier: req.session.pkceVerifier,
    });

    res.cookie("access_token", token.access_token, {
      maxAge: 1000 * 60 * 60, // one hour
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });
    res.cookie("refresh_token", token.refresh_token, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    return res.redirect("/"); // Need to update with correct route
  } catch (error) {
    return res.redirect("/auth/error"); // Need to update with correct route
  }
});

export default router;
