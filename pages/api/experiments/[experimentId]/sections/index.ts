import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Question from "../../../../../lib/db/models/Question";
import Section from "../../../../../lib/db/models/Section";
import dbConnect from "../../../../../lib/db/mongooseDb";
import {
  CreateNewSectionType,
  SectionType,
} from "../../../../../types/section/section";

const createBlankSection = async (sectionDetails: CreateNewSectionType) => {
  const experimentIdObjectId = new Types.ObjectId(sectionDetails.experimentId);

  const createdSection = new Section({
    ...sectionDetails,
    experimentId: experimentIdObjectId,
  });
  await createdSection.save();

  return createdSection;
};

const create2AFCSection = async (sectionDetails: CreateNewSectionType) => {
  const createdSection = await createBlankSection(sectionDetails);
  const created2AFCQuestion = new Question({
    experimentId: createdSection.experimentId,
    sectionId: createdSection._id,
    type: "2AFC",
    title: "New 2AFC Question containing multiple images",
  });
  createdSection.questions.push(created2AFCQuestion._id.toString());

  await createdSection.save();
  await created2AFCQuestion.save();

  return createdSection;
};

const createIntroductionSection = async (
  sectionDetails: CreateNewSectionType
) => {
  const createdSection = await createBlankSection(sectionDetails);
  const created2AFCQuestion = new Question({
    experimentId: createdSection.experimentId,
    sectionId: createdSection._id,
    type: "PLAIN_TEXT",
    title: "Experiment Introduction",
    content: {
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta leo et elit lobortis accumsan. Quisque condimentum gravida urna, sed tempus purus facilisis sed. Duis et dapibus nunc. Aliquam eu ex eget lorem pretium molestie eu eget tellus. Morbi sodales, nibh eu gravida congue, eros elit hendrerit purus, ac viverra urna nibh suscipit lorem. Phasellus ut condimentum nulla. Aenean venenatis mauris eget libero sagittis bibendum. Etiam dignissim mi sit amet suscipit consectetur. Suspendisse dapibus mauris malesuada ipsum pellentesque, facilisis ultrices sapien efficitur. Pellentesque non est eu lacus consectetur suscipit. Integer congue, augue vitae lacinia suscipit, libero erat sagittis quam, nec elementum mauris est non magna. Nam aliquet iaculis tortor, id convallis sapien lacinia quis. Phasellus eget blandit nulla. Morbi pharetra tincidunt nulla eget tempor. Proin volutpat nulla eget nisi pretium, et luctus arcu ultricies.
      Ut diam arcu, faucibus id sollicitudin vitae, auctor id lacus. Integer ornare tincidunt viverra. Sed eget tristique ante, sit amet gravida mi. Aliquam massa tortor, gravida tempor commodo quis, molestie non justo. Nam consectetur ante eget risus accumsan, id malesuada enim bibendum. Praesent pulvinar urna id vulputate iaculis. Pellentesque posuere nunc mauris, et ornare nisl pharetra eu. Phasellus ac ipsum facilisis, gravida ante eu, feugiat odio. Nulla mattis placerat ligula, ac viverra metus pulvinar ac.`,
    },
  });
  createdSection.questions.push(created2AFCQuestion._id.toString());

  await createdSection.save();
  await created2AFCQuestion.save();

  return createdSection;
};

const createAcknowledgementSection = async (
  sectionDetails: CreateNewSectionType
) => {
  const createdSection = await createBlankSection(sectionDetails);
  const created2AFCQuestion = new Question({
    experimentId: createdSection.experimentId,
    sectionId: createdSection._id,
    type: "PLAIN_TEXT",
    title: "Experiment Acknowledgement",
    content: {
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta leo et elit lobortis accumsan. Quisque condimentum gravida urna, sed tempus purus facilisis sed. Duis et dapibus nunc. Aliquam eu ex eget lorem pretium molestie eu eget tellus. Morbi sodales, nibh eu gravida congue, eros elit hendrerit purus, ac viverra urna nibh suscipit lorem. Phasellus ut condimentum nulla. Aenean venenatis mauris eget libero sagittis bibendum. Etiam dignissim mi sit amet suscipit consectetur. Suspendisse dapibus mauris malesuada ipsum pellentesque, facilisis ultrices sapien efficitur. Pellentesque non est eu lacus consectetur suscipit. Integer congue, augue vitae lacinia suscipit, libero erat sagittis quam, nec elementum mauris est non magna. Nam aliquet iaculis tortor, id convallis sapien lacinia quis. Phasellus eget blandit nulla. Morbi pharetra tincidunt nulla eget tempor. Proin volutpat nulla eget nisi pretium, et luctus arcu ultricies.
      Ut diam arcu, faucibus id sollicitudin vitae, auctor id lacus. Integer ornare tincidunt viverra. Sed eget tristique ante, sit amet gravida mi. Aliquam massa tortor, gravida tempor commodo quis, molestie non justo. Nam consectetur ante eget risus accumsan, id malesuada enim bibendum. Praesent pulvinar urna id vulputate iaculis. Pellentesque posuere nunc mauris, et ornare nisl pharetra eu. Phasellus ac ipsum facilisis, gravida ante eu, feugiat odio. Nulla mattis placerat ligula, ac viverra metus pulvinar ac.`,
    },
  });
  createdSection.questions.push(created2AFCQuestion._id.toString());

  await createdSection.save();
  await created2AFCQuestion.save();

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
      const sectionType = req.body.type as SectionType["type"];

      let createdSection;
      if (sectionType === "INTRODUCTION") {
        createdSection = await createIntroductionSection(req.body);
      } else if (sectionType === "2AFC") {
        createdSection = await create2AFCSection(req.body);
      } else if (sectionType === "ACKNOWLEDGEMENT") {
        createdSection = await createAcknowledgementSection(req.body);
      } else {
        createdSection = await createBlankSection(req.body);
      }

      res.status(200).json({ success: true, data: createdSection });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
}
