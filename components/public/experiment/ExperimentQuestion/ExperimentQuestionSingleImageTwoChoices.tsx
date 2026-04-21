import { AdvancedImage, lazyload } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
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
      width={width || 400}
      height={height || 400}
      style={{ borderRadius: 4 }}
    />
  );
};

const ExperimentQuestionSingleImageTwoChoices = ({
  question,
  section,
  submitQuestion,
}: ExperimentQuestionSharedProps) => {
  const [imageVisible, setImageVisible] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const preDelay = section.settings?.preImageDelayTime;
    const displayTime = section.settings?.imageDisplayTime;

    // reset
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setImageVisible(false);
    setCountdown(null);

    const startImageDisplay = () => {
      setImageVisible(true);
      if (displayTime && displayTime > 0) {
        timerRef.current = setTimeout(
          () => setImageVisible(false),
          displayTime * 1000
        );
      }
    };

    if (preDelay && preDelay > 0) {
      let remaining = Math.round(preDelay);
      setCountdown(remaining);
      intervalRef.current = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
          clearInterval(intervalRef.current);
          setCountdown(null);
          startImageDisplay();
        } else {
          setCountdown(remaining);
        }
      }, 1000);
    } else {
      startImageDisplay();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [question._id, section.settings?.imageDisplayTime, section.settings?.preImageDelayTime]);

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
        alignItems: "center",
        gap: 6,
        py: 4,
      }}
    >
      {countdown !== null ? (
        <Box sx={{ width: imageWidth || 400, height: imageHeight || 400 }} />
      ) : imageVisible ? (
        <CloudinaryImagePreview
          imagePublicId={question.content.images![0]}
          width={imageWidth || 400}
          height={imageHeight || 400}
        />
      ) : (
        <Box sx={{ width: imageWidth || 400, height: imageHeight || 400 }} />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
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
      </Box>
    </Box>
  );
};

export default ExperimentQuestionSingleImageTwoChoices;
