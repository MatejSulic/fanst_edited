import { AdvancedImage, lazyload } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ExperimentQuestionSharedProps } from ".";
import { cloudinaryCloudName } from "../../../../lib/cloudinary";
import { convertCmToPx } from "../../../../utils/sizeConversion";
import KeyPressHandler from "../../../common/input/KeyPressHandler";

type CloudinaryImagePreviewProps = {
  imagePublicId: string;
  width?: number;
  height?: number;
};

type ComparisonResultType = {
  leftChoice: string;
  rightChoice: string;
  chosenChoice: string;
  centerImage: string;
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

const ExperimentQuestionSingleImageTwoChoicesCalibration = ({
  question,
  section,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  const createComparisonResult = (
    chosenChoice: "left" | "right" | "timeLimitExceeded"
  ): ComparisonResultType => {
    const leftChoice = question.content.leftTextOption;
    const rightChoice = question.content.rightTextOption;
    const centerImage = question.content.images![0];
    return {
      leftChoice,
      rightChoice,
      chosenChoice:
        chosenChoice === "left"
          ? leftChoice
          : chosenChoice === "right"
          ? rightChoice
          : "timeLimitExceeded",
      centerImage,
    };
  };

  const [ getQuestionState, setQuestionState ] = useState<number>(0);

  const handleSubmitQuestion = useCallback(
    (result: any) => {
      submitQuestion({
        questionId: question._id.toString(),
        questionType: "SINGLE_IMAGE_TWO_CHOICES_CALIBRATION",
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

    var timer = setTimeout(() => {
      setQuestionState(1);      
      timer = setTimeout(() => {
        setQuestionState(2);      
      }, section.settings.calibrationTimeInSeconds * 1000);
    }, 1500);
    return () => clearTimeout(timer);
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
        position: "relative",
        marginTop: 12,
        gap: 0,
      }}
    >
    <Box
      sx={{ display: getQuestionState == 0 ? "flex" : "none", }}
    >
      <CloudinaryImagePreview
        imagePublicId={section.settings.calibrationImagePublicId}
        width={imageWidth}
        height={imageHeight}
      />
    </Box>
    <Box
      sx={{ display: getQuestionState == 1 ? "flex" : "none", }}
    >
        <CloudinaryImagePreview
          imagePublicId={question.content.images![0]}
          width={imageWidth}
          height={imageHeight}
        />
      </Box>

      {getQuestionState > 1 && <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: 34,
        }}
      >
        <KeyPressHandler leftKeyFunction={() => handleSubmitQuestion(createComparisonResult("left"))} rightKeyFunction={() => handleSubmitQuestion(createComparisonResult("right"))} />
        <Button
          size="large"
          variant="contained"
          onClick={() => handleSubmitQuestion(createComparisonResult("left"))}
          sx={{ marginRight: 2, minWidth: "90px" }}
        >
          {question.content.leftTextOption}
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => handleSubmitQuestion(createComparisonResult("right"))}
          sx={{ marginLeft: 2, minWidth: "90px"  }}
        >
          {question.content.rightTextOption}
        </Button>
      </Box>}
    </Box>
  );
};

export default ExperimentQuestionSingleImageTwoChoicesCalibration;
