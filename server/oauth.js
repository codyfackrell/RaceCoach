async function run() {
  const client = new AuthorizationCode(config);

  const authorizationUri = client.authorizeURL({
    redirect_uri: "http://localhost:3000/auth/callback",
    scope: "<scope>",
    state: "<state>",

    customParam: "foo", // non-standard oauth params may be passed as well
  });

  // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
  res.redirect(authorizationUri);

  const tokenParams = {
    code: "<code>",
    redirect_uri: "http://localhost:5000/auth/callback",
    scope: "<scope>",
  };

  try {
    const accessToken = await client.getToken(tokenParams);
  } catch (error) {
    console.log("Access Token Error", error.message);
  }
}

run();
