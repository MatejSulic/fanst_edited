import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Question from "../../../../../../../lib/db/models/Question";
import Section from "../../../../../../../lib/db/models/Section";
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
      await question.remove();
      const section = await Section.findById(new ObjectId(sectionId as string));
      section.questions = section.questions.filter(
        (item) => item !== questionId
      );
      await section.save();

      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "POST") {
    try {
      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
