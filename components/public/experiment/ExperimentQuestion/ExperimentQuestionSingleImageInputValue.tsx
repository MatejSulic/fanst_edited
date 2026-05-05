import { AdvancedImage, lazyload } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Box, Button, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ExperimentQuestionSharedProps } from ".";
import { cloudinaryCloudName } from "../../../../lib/cloudinary";
import { convertCmToPx } from "../../../../utils/sizeConversion";

type CloudinaryImagePreviewProps = {
  imagePublicId: string;
  width?: number;
  height?: number;
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

const ExperimentQuestionSingleInputValue = ({
  question,
  section,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  
  const handleSubmitQuestion = useCallback(
    (result: any) => {
      submitQuestion({
        questionId: question._id.toString(),
        questionType: "SINGLE_IMAGE_INPUT_VALUE",
        questionPosition: question.position,
        result,
      });
    },
    [question._id, submitQuestion]
  );

  const [inputValue, setInputValue] = useState("");

  //Neni vazba na target
//   const handleTextFieldChange = (event: object) => {
//     setInputValue(event.target.value);
//   };

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
  const imageDiagonal = Math.sqrt(imageWidth! ** 2 + imageHeight! ** 2);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        marginTop: 0,
        gap: 0,
      }}
    >
        <CloudinaryImagePreview
          imagePublicId={question.content.images![0]}
          width={imageWidth}
          height={imageHeight}
        />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: 4,
          gap: 2,
        }}
      >
        <TextField value={inputValue} onChange={(event) => setInputValue(event.target.value)} label="Symmetry" size="small" />

        <Button
          size="large"
          variant="contained"
          onClick={() => handleSubmitQuestion({"centerImage": question.content.images![0], "inputValue": +inputValue})}
        >
          Odeslat
        </Button>
      </Box>
    </Box>
  );
};

export default ExperimentQuestionSingleInputValue;
