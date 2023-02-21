import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Experiment, {
  deleteExperiment,
} from "../../../../lib/db/models/Experiment";
import dbConnect from "../../../../lib/db/mongooseDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { experimentId } = req.query;

  if (req.method === "PATCH") {
    try {
      const experiment = await Experiment.findOne({
        _id: experimentId,
      });

      Object.entries(req.body).forEach(
        ([key, value]) => (experiment[key] = value)
      );
      await experiment.save();

      res.status(200).json({ success: true, data: experiment });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "GET") {
    try {
      const experiment = await Experiment.findById(
        new ObjectId(experimentId as string)
      );

      res.status(200).json({ success: true, data: experiment });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  } else if (req.method === "DELETE") {
    try {
      deleteExperiment(experimentId as string);

      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
