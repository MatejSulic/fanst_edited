import { Types } from "mongoose";

export type ParticipantGroupType = {
  _id: Types.ObjectId;
  experimentId: Types.ObjectId;
  participants: string[];
};
