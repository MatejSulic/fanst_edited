import { AdvancedImage, lazyload } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Box } from "@mui/material";
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
      // plugins={[lazyload()]}
      width={width || 200}
      height={height || 200}
      style={{ borderRadius: 4 }}
    />
  );
};

const ExperimentQuestionImageSelect = ({
  question,
  section,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  const createComparisonResult = (
    chosenImage: "left" | "right" | "timeLimitExceeded"
  ): ComparisonResultType => {
    const leftImage = question.content.leftImage;
    const rightImage = question.content.rightImage;
    return {
      leftImage,
      rightImage,
      chosenImage:
        chosenImage === "left"
          ? leftImage
          : chosenImage === "right"
          ? rightImage
          : "timeLimitExceeded",
    };
  };

  const handleSubmitQuestion = useCallback(
    (result: any) => {
      submitQuestion({
        questionId: question._id.toString(),
        questionType: "IMAGE_SELECT",
        result: result ? [result] : null,
      });
    },
    [question._id, submitQuestion]
  );

  useEffect(() => {
    if (!question.content.leftImage || !question.content.rightImage) {
      handleSubmitQuestion(null);
    }
  }, []);

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
        onClick={() => handleSubmitQuestion(createComparisonResult("left"))}
        sx={{
          border: "none",
          p: 0,
          height: imageHeight || "min-content",
          width: imageWidth || "min-content",
          cursor: "pointer",
        }}
      >
        <CloudinaryImagePreview
          imagePublicId={question.content.leftImage!}
          width={imageWidth}
          height={imageHeight}
        />
      </Box>
      <Box
        component="button"
        onClick={() => handleSubmitQuestion(createComparisonResult("right"))}
        sx={{
          border: "none",
          p: 0,
          height: imageHeight || "min-content",
          width: imageWidth || "min-content",
          cursor: "pointer",
        }}
      >
        <CloudinaryImagePreview
          imagePublicId={question.content.rightImage!}
          width={imageWidth}
          height={imageHeight}
        />
      </Box>
    </Box>
  );
};

export default ExperimentQuestionImageSelect;
