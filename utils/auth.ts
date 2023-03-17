import jwt from "jsonwebtoken";
import { jwtRefreshSecret, jwtSecret } from "../lib/auth";

export const generateAccessToken = (userId: string, userEmail: string) => {
  return jwt.sign(
    {
      userId,
      userEmail,
    },
    jwtSecret as string
    // {
    //   expiresIn: "1h",
    // }
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
    return jwt.verify(token, jwtSecret as string);
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
    jwtRefreshSecret as string,
    {
      expiresIn: "30d",
    }
  );
};
