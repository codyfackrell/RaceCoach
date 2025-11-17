import express from "express";
import session from "express-session";

const app = express();

//OAuth2 configuration
const config = {
  client: {
    id: "<client-id>",
    secret: "<client-secret>",
  },
  auth: {
    tokenHost: "https://garage61.net",
    tokenPath: "/api/oauth/token",
    authorizeHost: "https://garage61.net",
    authorizePath: "/app/account/oauth",
  },
};

const { AuthorizationCode } = require("simple-oauth2");

const client = new AuthorizationCode(config);

// Session secret middleware
app.use(
  session({
    secret: process.env.SESSION.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Authorization
app.get("/auth", (req, res) => {
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

app.get("/auth/callback", (req, res) => {
  const { code, state } = req.query;

  if (req.session.oauthState === state) {
  } else {
  }
});
