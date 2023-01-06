import { Types } from "mongoose";

export type ParticipantType = {
  _id: Types.ObjectId;
  email: string;
  consent: boolean;
};

export type InviteParticipantType = Pick<ParticipantType, "email">;
