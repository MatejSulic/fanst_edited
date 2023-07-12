import { AdvancedImage, lazyload } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ExperimentQuestionSharedProps } from "..";
import { cloudinaryCloudName } from "../../../../../lib/cloudinary";
import { convertCmToPx } from "../../../../../utils/sizeConversion";
import dynamic from "next/dynamic";
const ReactKonvaStage = dynamic(() => import("./ReactKonvaStage"), {
  ssr: false,
});

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

const ExperimentQuestionDrawLine = ({
  question,
  section,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  // result in the format [x1, y1, x2, y2], where x1, y1, x2, y2 are
  // coordinates of points laying on the drawn line
  // computed as factors of width and height respectively
  const [result, setResult] = useState<number[] | null>(null);

  useEffect(() => {
    if (!question.content.images || !question.content.images[0]) {
      handleSubmitQuestion(null);
    }
  }, []);

  const handleSubmitQuestion = (res?: any) => {
    console.log("submit draw line");
    submitQuestion({
      questionId: question._id.toString(),
      questionType: "DRAW_LINE",
      questionPosition: question.position,
      result: res
        ? { centerImage: question.content.images![0], drawnPoints: res }
        : null,
    });
  };

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
      <Box sx={{ position: "absolute", top: 0 }}>
        <ReactKonvaStage
          width={imageWidth!}
          height={imageHeight!}
          setResult={setResult}
        />
      </Box>

      {result && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSubmitQuestion(result)}
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ExperimentQuestionDrawLine;
