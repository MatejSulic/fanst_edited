import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db/mongooseDb";
import bcrypt from "bcrypt";
import User from "../../../lib/db/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const reqBody = req.body;
    try {
      const hashedPass = await bcrypt.hash(reqBody.password, 10);

      const createdUser = new User({
        email: reqBody.email,
        password: hashedPass,
      });
      await createdUser.save();

      res.status(201).json({ success: true, data: createdUser });
    } catch (e) {
      res.status(500).json({ success: false, data: "Error creating user" });
    }
  }
}
