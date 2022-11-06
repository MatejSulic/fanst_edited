import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { QuestionType } from "../../../../../../types/question";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sectionId } = req.query;

  if (req.method === "GET") {
    const jsonDirectory = path.join(process.cwd(), "mock");
    const fileContents = (await fs
      .readFile(jsonDirectory + "/sectionQuestions.json", "utf8")
      .then((res) => JSON.parse(res))) as QuestionType[];
    const filteredBySectionId = fileContents.filter(
      (item) => item.sectionId === sectionId
    );

    res.status(200).json(filteredBySectionId);
  }
}
