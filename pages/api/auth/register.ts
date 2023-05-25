import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db/mongooseDb";
import bcrypt from "bcrypt";
import cookie from "cookie";
import User from "../../../lib/db/models/User";
import { generateAccessToken, generateRefreshToken } from "../../../utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const reqBody = req.body;
    try {
      const hashedPass = await bcrypt.hash(reqBody.password, 10);

      const existingUser = await User.findOne({ email: reqBody.email });
      if (existingUser) {
        res.status(400).json({
          success: false,
          data: "User with that email already exists.",
        });
      }

      const createdUser = new User({
        email: reqBody.email,
        password: hashedPass,
      });
      await createdUser.save();

      const token = generateAccessToken(
        createdUser._id.toString(),
        createdUser.email
      );
      const refreshToken = generateRefreshToken(
        createdUser._id.toString(),
        createdUser.email
      );

      res
        .status(201)
        .setHeader(
          "Set-Cookie",
          cookie.serialize("accessToken", token, {
            httpOnly: true,
            path: "/",
          })
        )
        .json({
          success: true,
          data: { user: { email: createdUser.email }, token: token },
        });
    } catch (e) {
      res.status(500).json({ success: false, data: "Error creating user" });
    }
  }
}
