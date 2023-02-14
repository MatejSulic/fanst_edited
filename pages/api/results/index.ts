import { NextApiRequest, NextApiResponse } from "next";
import ExperimentModel from "../../../lib/db/models/Experiment";
import ExperimentResultsModel from "../../../lib/db/models/ExperimentResults";
import dbConnect from "../../../lib/db/mongooseDb";
import { createExperimentResultsDetail } from "../../../utils/results";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const result = [];

      const experimentResults = await ExperimentResultsModel.find({});
      const experiments = await ExperimentModel.find({
        _id: {
          $in: experimentResults.map((item) => item.experimentId.toString()),
        },
      }).lean();

      await Promise.all(
        experiments.map(async (experiment) => {
          const experimentResultsDetail = await createExperimentResultsDetail(
            experiment._id.toString()
          );
          result.push(experimentResultsDetail);
        })
      );
      console.log(result);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
