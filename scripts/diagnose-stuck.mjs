import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://sulic_db_user:sulic79@bakalarka.u5ankje.mongodb.net/fanst?appName=Bakalarka";

await mongoose.connect(MONGODB_URI);
const db = mongoose.connection.db;

const experiments = await db.collection("experiments").find({}).toArray();
const sections = await db.collection("sections").find({}).toArray();
const progresses = await db.collection("experimentprogresses").find({}).toArray();

// Focus on the two interesting experiments
const targets = [
  { id: "69f84136d122487533f503d5", name: "Symmetry test 2D Solid" },
  { id: "69f9895bcec5bcf959543128", name: "Symmetry test Points Solid" },
];

for (const target of targets) {
  const exp = experiments.find(e => e._id.toString() === target.id);
  const expSections = sections.filter(s => s.experimentId?.toString() === target.id);
  const stuck = progresses.filter(p =>
    p.experimentId?.toString() === target.id &&
    !p.finished &&
    p.currentSectionIdx === (exp.sections?.length ?? 0) - 1
  );

  console.log(`\n=== ${target.name} ===`);
  console.log(`Sections (${exp.sections?.length}):`, exp.sections);
  expSections.forEach(s => console.log(`  Section ${s._id}: type=${s.type}, questions=${s.questions?.length}`));

  console.log(`\nStuck at LAST section: ${stuck.length} records`);
  console.log(`Sample sectionResults[0] from first stuck record:`);
  if (stuck.length > 0) {
    const sample = stuck[0];
    console.log(`  _id: ${sample._id}, sectionResults count: ${sample.sectionResults?.length}`);
    console.log(`  sectionResults[0]:`, JSON.stringify(sample.sectionResults?.[0], null, 2));
    console.log(`  sectionResults[1]:`, JSON.stringify(sample.sectionResults?.[1], null, 2));
  }
}

await mongoose.disconnect();
