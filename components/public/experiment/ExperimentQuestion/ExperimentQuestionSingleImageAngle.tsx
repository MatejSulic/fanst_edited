import { AdvancedImage, lazyload } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Box, Button, Slider, SvgIcon } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ExperimentQuestionSharedProps } from ".";
import { cloudinaryCloudName } from "../../../../lib/cloudinary";
import { convertCmToPx } from "../../../../utils/sizeConversion";
import { motion } from "framer-motion";

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

const ExperimentQuestionSingleImageAngle = ({
  question,
  section,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  
  const handleSubmitQuestion = useCallback(
    (result: any) => {
      submitQuestion({
        questionId: question._id.toString(),
        questionType: "SINGLE_IMAGE_ANGLE",
        questionPosition: question.position,
        result,
      });
    },
    [question._id, submitQuestion]
  );

  const [initAngle, setInitAngle] = useState<number>(Math.random() * 360);
  const [angle, setAngle] = useState<number>(360);

//   Debug
//   const [initAngle, setInitAngle] = useState<number>(0);
//   const [angle, setAngle] = useState<number>(0);

  const handleAngleChange = (event: Event, newValue: number | number[]) => {
    setAngle(newValue as number);
  };

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
        marginTop: 12,
        gap: 0,
      }}
    >
      <motion.div
        initial={{ rotate: initAngle + angle }}
        animate={{ rotate: initAngle + angle }}
      >
        <CloudinaryImagePreview
          imagePublicId={question.content.images![0]}
          width={imageWidth}
          height={imageHeight}
        />
      </motion.div>
      <SvgIcon
        sx={{
          position: "absolute",
          top: (imageHeight - imageDiagonal) / 2,
          width: imageDiagonal,
          height: imageDiagonal,
        }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="black"
              stroke-width="0.1"
              d="M12 0L12 24"
            />
          </svg>
      </SvgIcon>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          marginTop: 18,
        }}
      >
      <Slider value={angle} onChange={handleAngleChange} min={0} max={720} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          marginTop: 4,
        }}
      >
        <Button
          size="large"
          variant="contained"
          onClick={() => handleSubmitQuestion({"centerImage": question.content.images![0], "initAngle": initAngle, "inputAngle": angle})}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ExperimentQuestionSingleImageAngle;
