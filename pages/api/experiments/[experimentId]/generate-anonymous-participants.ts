import { NextApiRequest, NextApiResponse } from "next";
import { generateAnonymousParticipant } from "../../../../lib/db/models/Experiment";
import dbConnect from "../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId } = req.query;

  if (req.method === "POST") {
    try {
      const count = Math.min(Math.max(1, Number(req.body.count) || 1), 50);

      const participantIds: string[] = [];
      for (let i = 0; i < count; i++) {
        const id = await generateAnonymousParticipant(experimentId as string);
        participantIds.push(id);
      }

      res.status(200).json({ success: true, data: { participantIds } });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
