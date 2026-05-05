import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db/mongooseDb";
import { exportExperimentResultsDetailToCsv } from "../../../utils/csv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { experimentId } = req.query;

      const csv = await exportExperimentResultsDetailToCsv(
        experimentId as string
      );
      res.status(200).json({ success: true, data: csv });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
