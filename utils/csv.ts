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
    "Participant Id",
    "Section Id",
    "Section Type",
    "Section Position",
    "Question Id",
    "Question Type",
    "Question Position",
    "Left Image (Text Choice)",
    "Right Image (Text Choice)",
    "Chosen Image (Text Choice)",
    "Center Image",
    "Drawn Points ('x1 y1 x2 y2' as factors of image dimensions)",
  ];
  csv += headerRowValues.join(";") + "\n";

  const experimentDetailValues = [
    experimentResultsDetail._id.toString(),
    experimentResultsDetail.title.replace(/(\r\n|\n|\r)/gm, ""),
    experimentResultsDetail.description.replace(/(\r\n|\n|\r)/gm, ""),
    experimentResultsDetail.settings.numberOfParticipantGroups,
    experimentResultsDetail.results.length,
  ];

  experimentResultsDetail.results.forEach((experimentResult) => {
    experimentResult.sectionResults.forEach((sectionResult) => {
      const sectionDetailValues = [
        sectionResult.sectionId.toString(),
        sectionResult.sectionType,
        sectionResult.sectionPosition,
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
              questionResult.questionPosition,
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
                  experimentResult.participantId,
                  ...sectionDetailValues,
                  ...questionDetailValues,
                  ...comparisonDetailValues,
                ].join(";") +
                ";;" +
                "\n";
            });
          } else if (
            questionResult.questionType === "DRAW_LINE" &&
            questionResult.result
          ) {
            const questionDetailValues = [
              questionResult.questionId,
              questionResult.questionType,
              questionResult.questionPosition,
            ];
            csv += [
              ...experimentDetailValues,
              experimentResult.participantId,
              ...sectionDetailValues,
              ...questionDetailValues,
            ].join(";");
            csv += ";;;;";
            csv += questionResult.result.centerImage + ";";
            csv += questionResult.result.drawnPoints.join(" ");
            csv += "\n";
          } else if (
            (questionResult.questionType === "SINGLE_IMAGE_TWO_CHOICES" || questionResult.questionType === "SINGLE_IMAGE_TWO_CHOICES_CALIBRATION") &&
            questionResult.result
          ) {
            const questionDetailValues = [
              questionResult.questionId,
              questionResult.questionType,
              questionResult.questionPosition,
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
                experimentResult.participantId,
                ...sectionDetailValues,
                ...questionDetailValues,
                ...comparisonDetailValues,
              ].join(";");
            csv += ";" + questionResult.result.centerImage + ";";
            csv += "\n";
          } else if (
            questionResult.questionType === "SINGLE_IMAGE_ANGLE" &&
            questionResult.result
          ) {
            const questionDetailValues = [
              questionResult.questionId,
              questionResult.questionType,
              questionResult.questionPosition,
            ];
            csv += [
              ...experimentDetailValues,
              experimentResult.participantId,
              ...sectionDetailValues,
              ...questionDetailValues,
            ].join(";");
            csv += ";;;;";
            csv += questionResult.result.centerImage + ";";
            csv += questionResult.result.initAngle + ";";
            csv += questionResult.result.inputAngle
            csv += "\n";
          } else if (
            questionResult.questionType === "SINGLE_IMAGE_INPUT_VALUE" &&
            questionResult.result
          ) {
            const questionDetailValues = [
              questionResult.questionId,
              questionResult.questionType,
              questionResult.questionPosition,
            ];
            csv += [
              ...experimentDetailValues,
              experimentResult.participantId,
              ...sectionDetailValues,
              ...questionDetailValues,
            ].join(";");
            csv += ";;;;";
            csv += questionResult.result.centerImage + ";";
            csv += questionResult.result.inputValue;
            csv += "\n";
          }
        }
      });
    });
  });

  return csv;
};
