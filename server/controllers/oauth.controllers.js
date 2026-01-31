import { oauthClient } from "../config/oauth.config.js";
// import { generateCodeVerifier, generateCodeChallenge } from "../utils/pkce.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// OAuth2 Routes
const getAuthUri = async (req, res) => {
  // const codeVerifier = generateCodeVerifier();
  // const codeChallenge = generateCodeChallenge(codeVerifier);

  // req.session.pkceVerifier = codeVerifier;

  const state = crypto.randomBytes(16).toString("hex");
  req.session.oauthState = state;

  const authorizationUri = oauthClient.authorizeURL({
    redirect_uri: "http://localhost:5000/auth/callback",
    scope: "driving_data",
    state: state,
    // code_challenge: codeChallenge,
    // code_challenge_method: "S256",
  });

  res.redirect(authorizationUri);
};

const getAuthToken = async (req, res) => {
  const { code, state } = req.query;

  if (state != req.session.oauthState) {
    return res.status(403).send("Invalid state");
  }

  try {
    const token = await oauthClient.getToken({
      code,
      redirect_uri: "http://localhost:5000/auth/callback",
      // code_verifier: req.session.pkceVerifier,
      // client_id: process.env.GARAGE61_CLIENT_ID,
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
  } catch (err) {
    console.error("TOKEN ERROR:", err);
    if (err.data) {
      console.error("Error data:", err.data);
    }
  }
};

export default {
  getAuthUri,
  getAuthToken,
};
