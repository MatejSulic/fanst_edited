import { NextApiRequest, NextApiResponse } from "next";
import Participant from "../../../../../../lib/db/models/Participant";
import dbConnect from "../../../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { participantId } = req.query;

  if (req.method === "POST") {
    try {
      await Participant.findByIdAndUpdate(participantId, { consent: true });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
