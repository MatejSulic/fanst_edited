import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Experiment from "../../../lib/db/models/Experiment";
import dbConnect from "../../../lib/db/mongooseDb";
import { JwtTokenType } from "../../../types/auth";
import { parseAuthHeader } from "../../../utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const decodedToken = parseAuthHeader(
    req.headers.authorization
  ) as JwtTokenType;

  if (req.method === "GET") {
    const searchQuery = req.query;

    if (decodedToken === undefined) {
      res.status(401).end();
    } else {
      try {
        let experiments;
        if (searchQuery.category === "all") {
          experiments = await Experiment.find({
            userId: decodedToken.userId,
          });
        } else {
          experiments = await Experiment.find({
            userId: decodedToken.userId,
            archived: searchQuery.category === "archive",
          });
        }
        res.status(200).json({ success: true, data: experiments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
    }
  } else if (req.method === "POST") {
    try {
      const createdExperiment = new Experiment({
        ...req.body,
        userId: new ObjectId(decodedToken.userId),
      });
      await createdExperiment.save();

      res.status(200).json({ success: true, data: createdExperiment });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
