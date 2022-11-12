import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Question from "../../../../../../lib/db/models/Question";
import dbConnect from "../../../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId, sectionId } = req.query;

  if (req.method === "GET") {
    try {
      const questions = await Question.find({
        experimentId: experimentId,
        sectionId: sectionId,
      });

      res.status(200).json({ success: true, data: questions });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "POST") {
    try {
      const experimentIdObjectId = new Types.ObjectId(experimentId as string);
      const sectionIdObjectId = new Types.ObjectId(sectionId as string);
      const createdQuestion = new Question({
        ...req.body,
        experimentId: experimentIdObjectId,
        sectionId: sectionIdObjectId,
      });
      createdQuestion.save();

      res.status(200).json({ success: true, data: createdQuestion });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
