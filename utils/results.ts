import { ObjectId } from "mongodb";
import ExperimentModel from "../lib/db/models/Experiment";
import ExperimentResultsModel from "../lib/db/models/ExperimentResults";
import dbConnect from "../lib/db/mongooseDb";

export const createExperimentResultsDetail = async (experimentId: string) => {
  await dbConnect();

  const experiment = await ExperimentModel.findById(
    new ObjectId(experimentId)
  ).lean();
  const results = await ExperimentResultsModel.find({
    experimentId: experimentId,
  }).lean();
  return { ...experiment, results };
};
