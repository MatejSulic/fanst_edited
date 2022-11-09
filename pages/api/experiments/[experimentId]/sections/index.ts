import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Section from "../../../../../lib/db/models/Section";
import dbConnect from "../../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId } = req.query;

  if (req.method === "GET") {
    try {
      const sections = await Section.find({
        experimentId: experimentId,
      });
      res.status(200).json({ success: true, data: sections });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "POST") {
    try {
      const experimentIdObjectId = new Types.ObjectId(experimentId as string);
      const createdSection = new Section({
        ...req.body,
        experimentId: experimentIdObjectId,
      });
      createdSection.save();
      res.status(200).json({ success: true, data: createdSection });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
