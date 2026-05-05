import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://sulic_db_user:sulic79@bakalarka.u5ankje.mongodb.net/fanst?appName=Bakalarka";

await mongoose.connect(MONGODB_URI);
console.log("Connected\n");

const db = mongoose.connection.db;

// Raw documents from all relevant collections
const progresses = await db.collection("experimentprogresses").find({ finished: true }).toArray();
const results = await db.collection("experimentresults").find({}).toArray();
const experiments = await db.collection("experiments").find({}).toArray();
const users = await db.collection("users").find({}).toArray();

console.log(`=== USERS (${users.length}) ===`);
users.forEach(u => console.log(`  _id: ${u._id}  email: ${u.email}`));

console.log(`\n=== EXPERIMENTS (${experiments.length}) ===`);
experiments.forEach(e => console.log(`  _id: ${e._id}  userId: ${e.userId} (type: ${typeof e.userId})  title: ${e.title}`));

console.log(`\n=== ExperimentResults (${results.length}) ===`);
results.forEach(r => console.log(`  _id: ${r._id}  experimentId: ${r.experimentId}  participantId: ${r.participantId}  progressId: ${r.experimentProgressId}`));

console.log(`\n=== ExperimentProgress finished (${progresses.length}) ===`);
progresses.forEach(p => console.log(`  _id: ${p._id}  experimentId: ${p.experimentId}  participantId: ${p.participantId}`));

// Check which experiment IDs from results match experiments
console.log("\n=== MATCHING CHECK ===");
const experimentIds = new Set(experiments.map(e => e._id.toString()));
results.forEach(r => {
  const match = experimentIds.has(r.experimentId?.toString());
  if (!match) console.log(`  MISMATCH: ExperimentResults ${r._id} has experimentId ${r.experimentId} which doesn't match any experiment`);
});

// Check userId matching
console.log("\n=== USER ID TYPES ===");
experiments.forEach(e => {
  const userMatch = users.find(u => u._id.toString() === e.userId?.toString());
  console.log(`  Experiment "${e.title}": userId=${e.userId} (${e.userId?.constructor?.name}) -> user found: ${!!userMatch}`);
});

await mongoose.disconnect();
