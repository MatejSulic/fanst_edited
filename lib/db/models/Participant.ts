import mongoose, { Schema } from "mongoose";
import { ParticipantType } from "../../../types/participant";

const ParticipantSchema = new Schema<ParticipantType>({
  email: {
    type: String,
    default: "",
  },
  consent: { type: Boolean, default: true },
  anonymous: { type: Boolean, default: false },
});

export default mongoose.models.Participant ||
  mongoose.model("Participant", ParticipantSchema);
