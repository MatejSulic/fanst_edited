import { AdvancedImage, lazyload } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Box, Stack } from "@mui/material";
import { ExperimentQuestionSharedProps } from ".";
import { cloudinaryCloudName } from "../../../../lib/cloudinary";

type CloudinaryImagePreviewProps = {
  imagePublicId: string;
};

const CloudinaryImagePreview = ({
  imagePublicId,
}: CloudinaryImagePreviewProps) => {
  return (
    <AdvancedImage
      cldImg={
        new CloudinaryImage(imagePublicId, {
          cloudName: cloudinaryCloudName,
        })
      }
      plugins={[lazyload()]}
      width={200}
      style={{ borderRadius: 4 }}
    />
  );
};

const ExperimentQuestionImageSelect = ({
  question,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  const handleSubmitQuestion = (result: any) => {
    submitQuestion({
      questionId: question._id.toString(),
      result: result,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Box
        component="button"
        onClick={() => handleSubmitQuestion(question.content.leftImage)}
        sx={{
          border: "none",
          p: 0,
          height: "min-content",
          width: "min-content",
          cursor: "pointer",
        }}
      >
        <CloudinaryImagePreview imagePublicId={question.content.leftImage} />
      </Box>
      <Box
        component="button"
        onClick={() => handleSubmitQuestion(question.content.rightImage)}
        sx={{
          border: "none",
          p: 0,
          height: "min-content",
          width: "min-content",
          cursor: "pointer",
        }}
      >
        <CloudinaryImagePreview imagePublicId={question.content.rightImage} />
      </Box>
    </Box>
  );
};

export default ExperimentQuestionImageSelect;
