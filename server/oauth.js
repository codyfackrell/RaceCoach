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

const state = crypto.randomUUID();

const authorizationUri = client.authorizeURL({
  redirect_uri: "http://localhost:5000/auth/callback",
  scope: "driving_data datapacks_subscriptions",
  state: state,
});

// *********************

// Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
res.redirect(authorizationUri);

const tokenParams = {
  code: "<code>",
  redirect_uri: "http://localhost:5000/auth/callback",
  scope: "driving_data datapacks_subscriptions", // Optional string or array including a subset of the original client scopes to request
};

try {
  const accessToken = await client.getToken(tokenParams);
} catch (error) {
  console.log("Access Token Error", error.message);
}

run();
