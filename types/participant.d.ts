import { Types } from "mongoose";
import { ExperimentType } from "./experiment";

export type ParticipantType = {
  _id: Types.ObjectId;
  email: string;
  consent: boolean;
  anonymous?: boolean;
};

export type InviteParticipantType = Pick<ParticipantType, "email"> & {
  experimentId: string;
};
