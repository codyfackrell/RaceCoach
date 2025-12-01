import base64url from "base64url";
import crypto from "crypto";

const sha256 = (str) => crypto.createHash("sha256").update(str).digest();

export const generateUUID = () => crypto.randomUUID();

export const generateCodeChallenge = (verifier) => base64url(sha256(verifier));
