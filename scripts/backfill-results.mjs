import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://sulic_db_user:sulic79@bakalarka.u5ankje.mongodb.net/fanst?appName=Bakalarka";

// ---- Schemas ----

const ExperimentProgressSchema = new mongoose.Schema({
  experimentId: mongoose.Schema.Types.ObjectId,
  participantId: mongoose.Schema.Types.ObjectId,
  currentSectionIdx: Number,
  finished: Boolean,
  sectionResults: mongoose.Schema.Types.Mixed,
});

const ExperimentResultsSchema = new mongoose.Schema({
  experimentId: mongoose.Schema.Types.ObjectId,
  participantId: mongoose.Schema.Types.ObjectId,
  experimentProgressId: mongoose.Schema.Types.ObjectId,
  sectionResults: mongoose.Schema.Types.Mixed,
});

const ExperimentProgress =
  mongoose.models.ExperimentProgress ||
  mongoose.model("ExperimentProgress", ExperimentProgressSchema);

const ExperimentResults =
  mongoose.models.ExperimentResults ||
  mongoose.model("ExperimentResults", ExperimentResultsSchema);

// ---- Main ----

await mongoose.connect(MONGODB_URI);
console.log("Connected to MongoDB");

// 1. Všechny dokončené progresses
const finished = await ExperimentProgress.find({ finished: true }).lean();
console.log(`Found ${finished.length} finished ExperimentProgress records`);

// 2. Projdi každý a zkontroluj jestli už existuje ExperimentResults
let created = 0;
let alreadyExists = 0;

for (const progress of finished) {
  const existing = await ExperimentResults.findOne({
    experimentProgressId: progress._id,
  });

  if (existing) {
    alreadyExists++;
    continue;
  }

  // Chybí – vytvoř ho
  const result = new ExperimentResults({
    experimentId: progress.experimentId,
    participantId: progress.participantId,
    experimentProgressId: progress._id,
    sectionResults: progress.sectionResults ?? [],
  });
  await result.save();
  console.log(
    `  Created ExperimentResults for progress ${progress._id} (participant ${progress.participantId})`
  );
  created++;
}

console.log(`\nDone. Created: ${created}, Already existed: ${alreadyExists}`);
await mongoose.disconnect();
