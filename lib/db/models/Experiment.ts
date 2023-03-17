import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import {
  ExperimentSettingsType,
  ExperimentType,
} from "../../../types/experiment";
import dbConnect from "../mongooseDb";
import Participant from "./Participant";
import ParticipantGroupModel, {
  createParticipantGroupsForExperiment,
} from "./ParticipantGroup";
import QuestionModel, { generateImagePermutations } from "./Question";
import Section from "./Section";

const ExperimentSettingsSchema = new Schema<ExperimentSettingsType>(
  {
    maximumTimeValidity: { type: Number, default: 90 },
    numberOfParticipantGroups: { type: Number, default: 1 },
  },
  { _id: false }
);

const ExperimentSchema = new Schema<ExperimentType>({
  userId: { type: Schema.Types.ObjectId },
  title: { type: String, required: true },
  description: String,
  sections: { type: [String], default: [] },
  participants: { type: [String], default: [] },
  participantGroups: { type: [String], default: [] },
  participantsPerGroups: { type: [Map], of: [String], default: () => [] },

  locked: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
  settings: { type: ExperimentSettingsSchema, default: () => ({}) },
});

const ExperimentModel =
  mongoose.models.Experiment || mongoose.model("Experiment", ExperimentSchema);
export default ExperimentModel;

export const deleteExperiment = async (experimentId: string): Promise<void> => {
  await dbConnect();

  const experimentObjectId = new ObjectId(experimentId);

  await ExperimentModel.findByIdAndDelete(experimentObjectId);
  await Section.deleteMany({ experimentId: experimentObjectId });
  await QuestionModel.deleteMany({
    experimentId: experimentObjectId,
  });
};

export const lockExperiment = async (experimentId: string): Promise<void> => {
  await dbConnect();
  let experiment = await ExperimentModel.findById(new ObjectId(experimentId));

  experiment.locked = true;
  await experiment.save();

  await createParticipantGroupsForExperiment(experimentId);

  const twoForcedChoiceSections = await Section.find({
    _id: { $in: experiment.sections },
    type: "2AFC",
  });
  const twoForcedChoiceQuestionsIds: string[] = [];
  twoForcedChoiceSections.forEach((section) =>
    twoForcedChoiceQuestionsIds.push(...section.questions)
  );

  experiment = await ExperimentModel.findById(new ObjectId(experimentId));

  await Promise.all(
    twoForcedChoiceQuestionsIds.map(async (questionId) =>
      generateImagePermutations(
        experiment.settings.numberOfParticipantGroups,
        experiment.participantGroups,
        questionId
      )
    )
  );
};

export const copyExperiment = async (
  experimentId: string
): Promise<ExperimentType> => {
  const experimentIdObjectId = new ObjectId(experimentId);

  await dbConnect();
  let experiment = await ExperimentModel.findById(experimentIdObjectId);
  console.log("experiment:", experiment);
  let sections = await Section.find({
    experimentId: experimentIdObjectId,
  });
  console.log("sections:", sections);

  // create new experiment
  let newExperiment = await new ExperimentModel({
    title: experiment.title,
    description: experiment.description,
  });
  await newExperiment.save();

  // create new sections
  let newSections = [];
  await Promise.all(
    sections.map(async (section) => {
      let newSection = await new Section({
        title: section.title,
        experimentId: newExperiment._id.toString(),
        description: section.description,
        type: section.type,
        settings: section.settings,
      });
      await newSection.save();

      // section questions
      let newQuestions = [];
      await Promise.all(
        section.questions.map(async (questionId) => {
          let question = await QuestionModel.findById(new ObjectId(questionId));
          console.log("question:", question);

          let newQuestion = await new QuestionModel({
            experimentId: newExperiment._id.toString(),
            sectionId: newSection._id.toString(),
            title: question.title,
            type: question.type,
            content: question.content,
            settings: question.settings,
          });
          return newQuestion
            .save()
            .then((res) => newQuestions.push(res._id.toString()));
        })
      );
      return newSection
        .save()
        .then((res) => newSections.push(res._id.toString()));
    })
  );
  newExperiment.sections = newSections;
  await newExperiment.save();
  return newExperiment;
};

export const inviteParticipant = async (
  experimentId: string,
  participantEmail: string
) => {
  await dbConnect();
  let experiment = await ExperimentModel.findById(new ObjectId(experimentId));

  let newParticipant = new Participant({ email: participantEmail });
  newParticipant = await newParticipant.save();

  const experimentParticipantGroups = await ParticipantGroupModel.aggregate()
    .match({ experimentId: new ObjectId(experimentId) })
    .project({
      participantsCount: { $size: "$participants" },
    })
    .sort({ participantsCount: "asc" })
    .limit(1);
  const smallestParticipantGroupId = experimentParticipantGroups[0]._id;
  const smallestParticipantGroup = await ParticipantGroupModel.findById(
    smallestParticipantGroupId
  );

  smallestParticipantGroup.participants.push(newParticipant._id.toString());
  await smallestParticipantGroup.save();
  // console.log("group:", smallestParticipantGroup);

  // console.log(experiment);
  experiment.participants.push(newParticipant._id.toString());
  if (smallestParticipantGroup.participants.length === 1) {
    // first participant in the group
    experiment.participantsPerGroups.push({
      group: smallestParticipantGroupId.toString(),
      participants: [newParticipant._id.toString()],
    });
  } else {
    experiment.participantsPerGroups
      .find((obj) => obj.get("group") === smallestParticipantGroupId.toString())
      .get("participants")
      .push(newParticipant._id.toString());
    experiment.markModified("participantsPerGroups");
  }
  await experiment.save();
};
