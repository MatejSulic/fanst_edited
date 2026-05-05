import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import {
  default as Experiment,
  default as ExperimentModel,
} from "../../../../../lib/db/models/Experiment";
import Question from "../../../../../lib/db/models/Question";
import Section from "../../../../../lib/db/models/Section";
import dbConnect from "../../../../../lib/db/mongooseDb";
import { CreateNewSectionType } from "../../../../../types/section/section";

const createSection = async (sectionDetails: CreateNewSectionType) => {
  let createdSection;
  if (sectionDetails.type === "INTRODUCTION") {
    createdSection = await createIntroductionSection(sectionDetails);
  } else if (sectionDetails.type === "2AFC") {
    createdSection = await create2AFCSection(sectionDetails);
  } else if (sectionDetails.type === "ACKNOWLEDGEMENT") {
    createdSection = await createAcknowledgementSection(sectionDetails);
  } else {
    createdSection = await createBlankSection(sectionDetails);
  }
  return createdSection;
};

const createBlankSection = async (sectionDetails: CreateNewSectionType) => {
  const experimentIdObjectId = new Types.ObjectId(sectionDetails.experimentId);
  const experiment = await Experiment.findById(experimentIdObjectId);

  const createdSection = new Section({
    ...sectionDetails,
    experimentId: experimentIdObjectId,
    position: experiment.sections.length + 1,
    title: "Blank Section",
  });
  await createdSection.save();

  experiment.sections.push(createdSection._id.toString());
  await experiment.save();

  return createdSection;
};

const create2AFCSection = async (sectionDetails: CreateNewSectionType) => {
  const createdSection = await createBlankSection(sectionDetails);
  const created2AFCQuestion = new Question({
    experimentId: createdSection.experimentId,
    sectionId: createdSection._id,
    type: "2AFC",
    title: "Which one do you like better?",
  });
  createdSection.title = "2-AFC Section";
  // createdSection.description = "The best 2AFC section yet!";
  createdSection.questions.push(created2AFCQuestion._id.toString());

  await createdSection.save();
  await created2AFCQuestion.save();

  return createdSection;
};

const createIntroductionSection = async (
  sectionDetails: CreateNewSectionType
) => {
  const createdSection = await createBlankSection(sectionDetails);
  const createdIntroductionQuestion = new Question({
    experimentId: createdSection.experimentId,
    sectionId: createdSection._id,
    type: "PLAIN_TEXT",
    title: `Introduction to experiment ${sectionDetails.experimentTitle}`,
    content: {
      text: `Welcome to experiment ${sectionDetails.experimentTitle}!
You will see a series of questions, each one may be with a different assignment.
Please, answer the questions honestly and as fast as possible.`,
    },
  });
  createdSection.title = "Introduction Section";
  // createdSection.description = "The best Introduction section yet!";
  createdSection.questions.push(createdIntroductionQuestion._id.toString());

  await createdSection.save();
  await createdIntroductionQuestion.save();

  return createdSection;
};

const createAcknowledgementSection = async (
  sectionDetails: CreateNewSectionType
) => {
  const createdSection = await createBlankSection(sectionDetails);
  const createdAcknowledgmentQuestion = new Question({
    experimentId: createdSection.experimentId,
    sectionId: createdSection._id,
    type: "PLAIN_TEXT",
    title: "Acknowledgment",
    content: {
      text: `Thank you for completing the experiment ${sectionDetails.experimentTitle}.
All your answers will be saved anonymously, without any connection to your person. The results of the experiment will be used purely for statistical purposes.
If you would want to withdraw your consent to the collection of your data, your answers, you will have to choice to do that anytime in the future.
Just click the link that you have received for the experiment completion.`,
    },
  });
  createdSection.title = "Acknowledgement Section";
  // createdSection.description = "The best Acknowledgement section yet!";
  createdSection.questions.push(createdAcknowledgmentQuestion._id.toString());

  await createdSection.save();
  await createdAcknowledgmentQuestion.save();

  return createdSection;
};

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
      const experiment = await ExperimentModel.findById(
        new ObjectId(experimentId as string)
      );
      const sectionDetails: CreateNewSectionType = {
        ...req.body,
        experimentId,
        experimentTitle: experiment.title,
      };

      const createdSection = await createSection(sectionDetails);

      res.status(200).json({ success: true, data: createdSection });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
