import jwt from "jsonwebtoken";
import { jwtRefreshSecret, jwtSecret } from "../lib/auth";

export const generateAccessToken = (userId: string, userEmail: string) => {
  return jwt.sign(
    {
      userId,
      userEmail,
    },
    jwtSecret as string,
    {
      expiresIn: "1h",
    }
  );
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
