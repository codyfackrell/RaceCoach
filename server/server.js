import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import oauthRoutes from "./routes/oauth.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Session secret middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/", oauthRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
