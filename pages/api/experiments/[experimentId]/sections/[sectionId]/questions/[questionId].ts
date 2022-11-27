import { NextApiRequest, NextApiResponse } from "next";
import Question from "../../../../../../../lib/db/models/Question";
import dbConnect from "../../../../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId, sectionId, questionId } = req.query;

  if (req.method === "DELETE") {
    try {
      const question = await Question.findOne({
        experimentId: experimentId,
        sectionId: sectionId,
        _id: questionId,
      });
      question.remove();

      res.status(204).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "POST") {
    try {
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
