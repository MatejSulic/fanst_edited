import { createExperimentResultsDetail } from "./results";

export const exportExperimentResultsDetailToCsv = async (
  experimentId: string
) => {
  let csv = ``;
  const experimentResultsDetail = await createExperimentResultsDetail(
    experimentId
  );

  const headerRowValues = [
    "Experiment Id",
    "Experiment Name",
    "Experiment Description",
    "Number of Participant Groups",
    "Number of Responses",
    "Section Id",
    "Section Type",
    "Question Id",
    "Question Type",
    "Left Image (Text Choice)",
    "Right Image (Text Choice)",
    "Chosen Image (Text Choice)",
    "Center Image",
    "Drawn Points ('x1 y1 x2 y2' as factors of image dimensions)",
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
        if (questionResult.result) {
          if (
            (questionResult.questionType === "2AFC" ||
              questionResult.questionType === "IMAGE_SELECT") &&
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
                ].join(",") +
                ",," +
                "\n";
            });
          } else if (
            questionResult.questionType === "DRAW_LINE" &&
            questionResult.result
          ) {
            const questionDetailValues = [
              questionResult.questionId,
              questionResult.questionType,
            ];
            csv += [
              ...experimentDetailValues,
              ...sectionDetailValues,
              ...questionDetailValues,
            ];
            csv += ",,,,";
            csv += questionResult.result.centerImage + ",";
            csv += questionResult.result.drawnPoints.join(" ");
            csv += "\n";
            // }
          } else if (
            questionResult.questionType === "SINGLE_IMAGE_TWO_CHOICES" &&
            questionResult.result
          ) {
            const questionDetailValues = [
              questionResult.questionId,
              questionResult.questionType,
            ];
            const comparisonResult = questionResult.result;
            const comparisonDetailValues = [
              comparisonResult.leftChoice,
              comparisonResult.rightChoice,
              comparisonResult.chosenChoice,
            ];
            csv +=
              [
                ...experimentDetailValues,
                ...sectionDetailValues,
                ...questionDetailValues,
                ...comparisonDetailValues,
              ].join(",") +
              ",," +
              "\n";
          }
        }
      });
    });
  });

  return csv;
};
