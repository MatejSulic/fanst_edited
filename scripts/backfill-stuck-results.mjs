import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://sulic_db_user:sulic79@bakalarka.u5ankje.mongodb.net/fanst?appName=Bakalarka";

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

await mongoose.connect(MONGODB_URI);
console.log("Connected to MongoDB\n");

const db = mongoose.connection.db;
const experiments = await db.collection("experiments").find({}).toArray();
const expMap = Object.fromEntries(experiments.map(e => [e._id.toString(), e]));

// Najdi všechny nedokončené záznamy s alespoň 1 sectionResult
const stuck = await ExperimentProgress.find({
  finished: false,
  $expr: { $gt: [{ $size: { $ifNull: ["$sectionResults", []] } }, 0] },
}).lean();

console.log(`Nalezeno ${stuck.length} nedokončených záznamů se sectionResults\n`);

let created = 0;
let skipped = 0;
let alreadyExists = 0;

for (const progress of stuck) {
  const exp = expMap[progress.experimentId?.toString()];
  if (!exp) {
    console.log(`  SKIP: experiment ${progress.experimentId} nenalezen`);
    skipped++;
    continue;
  }

  const sectionResults = progress.sectionResults ?? [];
  // Přeskoč záznamy bez žádných validních výsledků (všechna null)
  const hasValidResults = sectionResults.some(r => r !== null && r !== undefined);
  if (!hasValidResults) {
    console.log(`  SKIP: progress ${progress._id} - žádné validní sectionResults`);
    skipped++;
    continue;
  }

  // Zkontroluj jestli ExperimentResults už existuje
  const existing = await ExperimentResults.findOne({
    experimentProgressId: progress._id,
  });
  if (existing) {
    alreadyExists++;
    continue;
  }

  // Vytvoř ExperimentResults
  const result = new ExperimentResults({
    experimentId: progress.experimentId,
    participantId: progress.participantId,
    experimentProgressId: progress._id,
    sectionResults: sectionResults,
  });
  await result.save();

  // Označ progress jako hotový
  await ExperimentProgress.updateOne(
    { _id: progress._id },
    { $set: { finished: true } }
  );

  console.log(
    `  CREATED: experiment "${exp.title}" | participant ${progress.participantId} | sectionResults: ${sectionResults.length}`
  );
  created++;
}

console.log(`\n=== HOTOVO ===`);
console.log(`Vytvořeno:          ${created}`);
console.log(`Přeskočeno (skip):  ${skipped}`);
console.log(`Už existovalo:      ${alreadyExists}`);

await mongoose.disconnect();
