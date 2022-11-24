import { NextApiRequest, NextApiResponse } from "next";
import Section from "../../../../../../lib/db/models/Section";
import dbConnect from "../../../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId, sectionId } = req.query;

  if (req.method === "GET") {
    try {
      const section = await Section.find({
        experimentId: experimentId,
        _id: sectionId,
      });
      res.status(200).json({ success: true, data: section });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "PATCH") {
    try {
      const section = await Section.findOne({
        experimentId: experimentId,
        _id: sectionId,
      });
      // update values from the request
      Object.entries(req.body).forEach(
        ([key, value]) => (section[key] = value)
      );
      await section.save();
      res.status(200).json({ success: true, data: section });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
