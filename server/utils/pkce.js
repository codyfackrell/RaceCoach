import base64url from "base64url";
import crypto from "crypto";

export const generateCodeVerifier = () => base64url(crypto.randomBytes(32));

export const generateCodeChallenge = (verifier) =>
  base64url(crypto.createHash("sha256").update(verifier).digest());
