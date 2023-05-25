import jwt from "jsonwebtoken";
import { jwtPrivateKey, jwtPublicKey } from "../lib/auth";

export const generateAccessToken = (userId: string, userEmail: string) => {
  return jwt.sign(
    {
      userId,
      userEmail,
    },
    jwtPrivateKey,
    { algorithm: "RS256" }
  );
};

export const parseAuthHeader = (authHeader?: string) => {
  if (authHeader === undefined) {
    return {};
  }

  const parsedAuthHeader = authHeader.split(" ");

  if (parsedAuthHeader[0] !== "Bearer") {
    console.error("Invalid Authorization Header");
  }

  return verifyAccessToken(parsedAuthHeader[1]);
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, jwtPublicKey);
  } catch (err) {
    console.error("Invalid JWT");
  }
};

export const generateRefreshToken = (userId: string, userEmail: string) => {
  return jwt.sign(
    {
      userId,
      userEmail,
    },
    jwtPrivateKey,
    {
      expiresIn: "30d",
      algorithm: "RS256",
    }
  );
};
