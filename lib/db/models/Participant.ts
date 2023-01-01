import mongoose, { Schema } from "mongoose";
import { ParticipantType } from "../../../types/participant";

const ParticipantSchema = new Schema<ParticipantType>({
  email: {
    type: String,
    required: [true, "Please provide an Email"],
  },
  consent: { type: Boolean, default: true },
});

export default mongoose.models.Participant ||
  mongoose.model("Participant", ParticipantSchema);
