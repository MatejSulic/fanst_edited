import { AdvancedImage, lazyload } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ExperimentQuestionSharedProps } from ".";
import { useExperiment } from "../../../../hooks/experiments/useExperiments";
import { cloudinaryCloudName } from "../../../../lib/cloudinary";
import { QuestionType } from "../../../../types/question/question";
import { convertCmToPx } from "../../../../utils/sizeConversion";

type CloudinaryImagePreviewProps = {
  imagePublicId: string;
  width?: number;
  height?: number;
};

type ComparisonType = {
  leftImage: string;
  rightImage: string;
};

type ComparisonResultType = {
  leftImage: string;
  rightImage: string;
  chosenImage: string;
};

const CloudinaryImagePreview = ({
  imagePublicId,
  width,
  height,
}: CloudinaryImagePreviewProps) => {
  return (
    <AdvancedImage
      cldImg={
        new CloudinaryImage(imagePublicId, {
          cloudName: cloudinaryCloudName,
        })
      }
      plugins={[lazyload()]}
      width={width || 200}
      height={height || 200}
      style={{ borderRadius: 4 }}
    />
  );
};

const ExperimentQuestion2AFC = ({
  question,
  section,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  const router = useRouter();
  const { experimentId, participantId } = router.query;

  const comparisons = useComparisons(
    experimentId as string | undefined,
    participantId as string | undefined,
    question
  );
  const [results, setResults] = useState<ComparisonResultType[]>([]);
  const [currentComparisonIdx, setCurrentComparisonIdx] = useState(0);

  const createComparisonResult = (
    chosenImage: "left" | "right"
  ): ComparisonResultType => {
    const leftImage = comparisons[currentComparisonIdx].leftImage;
    const rightImage = comparisons[currentComparisonIdx].rightImage;
    return {
      leftImage,
      rightImage,
      chosenImage: chosenImage === "left" ? leftImage : rightImage,
    };
  };

  const handleSubmitQuestion = (result: any) => {
    submitQuestion({
      questionId: question._id.toString(),
      questionType: "2AFC",
      result,
    });
  };

  const handleSubmitComparison = (comparisonResult: ComparisonResultType) => {
    if (comparisons && currentComparisonIdx === comparisons.length - 1) {
      handleSubmitQuestion([...results, comparisonResult]);
    } else {
      setResults((prev) => [...prev, comparisonResult]);
      setCurrentComparisonIdx((prev) => prev + 1);
    }
  };

  const currentComparison = comparisons[currentComparisonIdx];

  if (!currentComparison) return null;

  const imageWidth = section.settings.imageWidth
    ? convertCmToPx(section.settings.imageWidth)
    : undefined;
  const imageHeight = section.settings.imageHeight
    ? convertCmToPx(section.settings.imageHeight)
    : undefined;
  const gapBetweenImages = section.settings.distanceOfImages
    ? convertCmToPx(section.settings.distanceOfImages) / 8
    : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: gapBetweenImages || 16,
      }}
    >
      <Box
        component="button"
        onClick={() => handleSubmitComparison(createComparisonResult("left"))}
        sx={{
          border: "none",
          p: 0,
          height: imageHeight || "min-content",
          width: imageWidth || "min-content",
          cursor: "pointer",
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        <CloudinaryImagePreview
          imagePublicId={currentComparison.leftImage}
          width={imageWidth}
          height={imageHeight}
        />
      </Box>
      <Box
        component="button"
        onClick={() => handleSubmitComparison(createComparisonResult("right"))}
        sx={{
          border: "none",
          p: 0,
          height: imageHeight || "min-content",
          width: imageWidth || "min-content",
          cursor: "pointer",
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        <CloudinaryImagePreview
          imagePublicId={currentComparison.rightImage}
          width={imageWidth}
          height={imageHeight}
        />
      </Box>
    </Box>
  );
};

export default ExperimentQuestion2AFC;

const useComparisons = (
  experimentId: string | undefined,
  participantId: string | undefined,
  question: QuestionType
) => {
  const { data: experiment } = useExperiment(
    experimentId as string | undefined
  );
  const participantGroup = participantId
    ? experiment?.participantsPerGroups.find((obj) =>
        obj.participants.includes(participantId)
      )?.group
    : null;
  const imagesPermutationForParticipant = participantGroup
    ? question.content.imagePermutations?.find(
        (obj) => obj.participantGroup === participantGroup
      )?.permutation
    : null;
  const [comparisons, setComparisons] = useState<ComparisonType[]>([]);

  useEffect(() => {
    if (
      imagesPermutationForParticipant !== null &&
      imagesPermutationForParticipant !== undefined
    ) {
      let variations: ComparisonType[] = [];
      for (let i = 0; i < imagesPermutationForParticipant?.length; i++) {
        for (let j = 0; j < imagesPermutationForParticipant.length; j++) {
          if (i === j) continue;

          variations.push({
            leftImage: imagesPermutationForParticipant[i],
            rightImage: imagesPermutationForParticipant[j],
          });
        }
      }
      setComparisons(variations);
    }
  }, [imagesPermutationForParticipant, experimentId, participantId]);

  return comparisons;
};
