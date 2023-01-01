import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { jwtSecret } from "../../../lib/cloudinary";
import User from "../../../lib/db/models/User";
import dbConnect from "../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const reqBody = req.body;
    try {
      const user = await User.findOne({ email: reqBody.email });
      if (user) {
        const passwordMatch = await bcrypt.compare(
          reqBody.password,
          user.password
        );
        if (!passwordMatch) {
          res.status(400).json({ success: false, data: "Wrong password" });
        }

        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          jwtSecret as string
        );

        res
          .status(200)
          .setHeader(
            "Set-Cookie",
            cookie.serialize("accessToken", token, { httpOnly: true })
          )
          .json({
            success: true,
            data: { user: { email: user.email }, token: token },
          });
      } else {
        res.status(400).json({ success: false, data: "Email not found" });
      }
    } catch (e) {
      res.status(500).json({ success: false, data: "Error logging user" });
    }
  }
}
