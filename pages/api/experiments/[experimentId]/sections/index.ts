import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import { SectionType } from "../../../../../types/section";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { experimentId } = req.query;

  if (req.method === "GET") {
    const jsonDirectory = path.join(process.cwd(), "mock");
    const fileContents = (await fs
      .readFile(jsonDirectory + "/experimentSections.json", "utf8")
      .then((res) => JSON.parse(res))) as SectionType[];
    const filteredByExperimentId = fileContents.filter(
      (item) => item.experimentId === experimentId
    );

    res.status(200).json(filteredByExperimentId);
  }
}
