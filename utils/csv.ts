import { createExperimentResultsDetail } from "./results";

export const exportExperimentResultsDetailToCsv = async (
  experimentId: string
) => {
  let csv = ``;
  const experimentResultsDetail = await createExperimentResultsDetail(
    experimentId
  );

  const headerRowValues = [
    "experimentId",
    "experimentName",
    "experimentDescription",
    "numberOfParticipantGroups",
    "numberOfResponses",
    "sectionId",
    "sectionType",
    "questionId",
    "questionType",
    "leftImage",
    "rightImage",
    "chosenImage",
  ];
  csv += headerRowValues.join(",") + "\n";

  const experimentDetailValues = [
    experimentResultsDetail._id.toString(),
    experimentResultsDetail.title,
    experimentResultsDetail.description,
    experimentResultsDetail.settings.numberOfParticipantGroups,
    experimentResultsDetail.results.length,
  ];

  experimentResultsDetail.results.forEach((experimentResult) => {
    experimentResult.sectionResults.forEach((sectionResult) => {
      const sectionDetailValues = [
        sectionResult.sectionId.toString(),
        sectionResult.sectionType,
      ];
      sectionResult.results.forEach((questionResult) => {
        if (
          (questionResult.questionType === "2AFC" ||
            questionResult.questionType === "IMAGE_SELECT") &&
          questionResult.result &&
          Array.isArray(questionResult.result)
        ) {
          const questionDetailValues = [
            questionResult.questionId,
            questionResult.questionType,
          ];
          questionResult.result.forEach((comparisonResult) => {
            const comparisonDetailValues = [
              comparisonResult.leftImage,
              comparisonResult.rightImage,
              comparisonResult.chosenImage,
            ];
            csv +=
              [
                ...experimentDetailValues,
                ...sectionDetailValues,
                ...questionDetailValues,
                ...comparisonDetailValues,
              ].join(",") + "\n";
          });
        }
      });
    });
  });

  return csv;
};
