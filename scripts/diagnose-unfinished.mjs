import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://sulic_db_user:sulic79@bakalarka.u5ankje.mongodb.net/fanst?appName=Bakalarka";

await mongoose.connect(MONGODB_URI);

const db = mongoose.connection.db;

const progresses = await db.collection("experimentprogresses").find({}).toArray();
const experiments = await db.collection("experiments").find({}).toArray();
const expMap = Object.fromEntries(experiments.map(e => [e._id.toString(), e.title]));

console.log(`=== Všechny ExperimentProgress záznamy (${progresses.length}) ===\n`);

const unfinished = progresses.filter(p => !p.finished);
const finished = progresses.filter(p => p.finished);

console.log(`Finished: ${finished.length}, NOT finished: ${unfinished.length}\n`);

if (unfinished.length > 0) {
  console.log("=== NEDOKONČENÉ (finished: false/undefined) ===");
  unfinished.forEach(p => {
    const sections = p.sectionResults?.length ?? 0;
    console.log(`  _id: ${p._id}`);
    console.log(`    experiment: ${expMap[p.experimentId?.toString()] ?? p.experimentId} (${p.experimentId})`);
    console.log(`    participant: ${p.participantId}`);
    console.log(`    currentSectionIdx: ${p.currentSectionIdx}`);
    console.log(`    sectionResults count: ${sections}`);
    console.log();
  });
}

// Zobraz kolik sekcí má každý experiment
console.log("=== Počet sekcí per experiment ===");
experiments.forEach(e => {
  const finishedCount = finished.filter(p => p.experimentId?.toString() === e._id.toString()).length;
  const unfinishedCount = unfinished.filter(p => p.experimentId?.toString() === e._id.toString()).length;
  if (finishedCount > 0 || unfinishedCount > 0) {
    console.log(`  "${e.title}" (${e._id}): ${e.sections?.length ?? 0} sekcí, ${finishedCount} hotových, ${unfinishedCount} nedotažených`);
  }
});

await mongoose.disconnect();
