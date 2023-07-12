import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import {
  QuestionContentType,
  QuestionSettingsType,
  QuestionType,
} from "../../../types/question/question";
import { questionTypeTypes } from "../../../types/question/questionTypes";
import { arrayZip, permute } from "../../../utils/list";
import dbConnect from "../mongooseDb";

const QuestionSettingsSchema = new Schema<QuestionSettingsType>(
  {},
  { _id: false }
);

const QuestionContentSchema = new Schema<QuestionContentType>(
  {
    text: String,
    images: { type: [String] },
    imagePermutations: [
      {
        participantGroup: String,
        permutation: [String],
      },
    ],
    leftImage: String,
    rightImage: String,
    leftTextOption: String,
    rightTextOption: String,
  },
  { _id: false }
);

const QuestionSchema = new Schema<QuestionType>({
  experimentId: {
    type: Schema.Types.ObjectId,
    ref: "Experiment",
    required: true,
  },
  sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
  title: { type: String, default: "New Question" },
  position: { type: Number, default: 1 },
  type: { type: String, enum: questionTypeTypes, required: true },
  content: { type: QuestionContentSchema, default: () => ({}) },

  settings: { type: QuestionSettingsSchema, default: () => ({}) },
});

const QuestionModel =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);
export default QuestionModel;

export const generateImagePermutations = async (
  numberOfParticipantGroups: number,
  participantGroupsIds: string[],
  questionId: string
): Promise<void> => {
  await dbConnect();
  const question = await QuestionModel.findById(new ObjectId(questionId));

  const imagesPermutations = permute(question.content.images || []);

  const selectedPermutationsIndices = [...Array(numberOfParticipantGroups)].map(
    (__) => Math.floor(imagesPermutations.length * Math.random())
  );

  question.content.imagePermutations = arrayZip(
    participantGroupsIds,
    selectedPermutationsIndices
  ).map(([groupId, permIdx]) => ({
    participantGroup: groupId,
    permutation: imagesPermutations[permIdx],
  }));

  question.markModified("content.imagePermutations");
  await question.save();
};
