import { AdvancedImage, lazyload } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Box, Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import { ExperimentQuestionSharedProps } from ".";
import { cloudinaryCloudName } from "../../../../lib/cloudinary";
import { convertCmToPx } from "../../../../utils/sizeConversion";

type CloudinaryImagePreviewProps = {
  imagePublicId: string;
  width?: number;
  height?: number;
};

type ComparisonResultType = {
  leftChoice: string;
  rightChoice: string;
  chosenChoice: string;
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
      // plugins={[lazyload()]}
      width={width || 200}
      height={height || 200}
      style={{ borderRadius: 4 }}
    />
  );
};

const ExperimentQuestionSingleImageTwoChoices = ({
  question,
  section,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  const createComparisonResult = (
    chosenChoice: "left" | "right" | "timeLimitExceeded"
  ): ComparisonResultType => {
    const leftChoice = question.content.leftTextOption;
    const rightChoice = question.content.rightTextOption;
    return {
      leftChoice,
      rightChoice,
      chosenChoice:
        chosenChoice === "left"
          ? leftChoice
          : chosenChoice === "right"
          ? rightChoice
          : "timeLimitExceeded",
    };
  };

  const handleSubmitQuestion = useCallback(
    (result: any) => {
      submitQuestion({
        questionId: question._id.toString(),
        questionType: "SINGLE_IMAGE_TWO_CHOICES",
        questionPosition: question.position,
        result,
      });
    },
    [question._id, submitQuestion]
  );

  useEffect(() => {
    if (!question.content.images || !question.content.images[0]) {
      handleSubmitQuestion(null);
    }
  }, []);

  const imageWidth = section.settings.imageWidth
    ? convertCmToPx(section.settings.imageWidth)
    : undefined;
  const imageHeight = section.settings.imageHeight
    ? convertCmToPx(section.settings.imageHeight)
    : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        position: "relative",
      }}
    >
      <CloudinaryImagePreview
        imagePublicId={question.content.images![0]}
        width={imageWidth}
        height={imageHeight}
      />
      {/* <Box sx={{ position: "absolute", top: 0 }}>
        <ReactKonvaStage
          width={imageWidth!}
          height={imageHeight!}
          setResult={setResult}
        />
      </Box> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          size="large"
          variant="contained"
          onClick={() => handleSubmitQuestion(createComparisonResult("left"))}
        >
          {question.content.leftTextOption}
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => handleSubmitQuestion(createComparisonResult("right"))}
        >
          {question.content.rightTextOption}
        </Button>
        {/* <Button
          variant="outlined"
          color="primary"
          onClick={() => handleSubmitQuestion(result)}
        >
          Submit
        </Button> */}
      </Box>
    </Box>
  );
};

export default ExperimentQuestionSingleImageTwoChoices;
