import { AdvancedImage, lazyload } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  QuestionBlockCardSharedProps,
  QuestionBlockSpecificCardSharedProps,
} from ".";
import { useUpdateSectionFormContext } from "../../../../contexts/experiments/experiment-detail/section-detail/updateSectionFormContext";
import { cloudinaryCloudName } from "../../../../lib/cloudinary";
import { openUploadWidget } from "../../../../lib/cloudinary/uploadWidget";

type UploadFileButtonProps = { onClick: () => void };

const UploadFileButtonCard = ({ onClick }: UploadFileButtonProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: 140,
        width: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        color: (theme) => theme.palette.primary.main,
      }}
      component={Button}
      onClick={() => onClick()}
    >
      <UploadFileOutlinedIcon />
      <Typography variant="subtitle2">Upload Image</Typography>
    </Paper>
  );
};

const UploadFileButtonSimple = ({ onClick }: UploadFileButtonProps) => {
  return (
    <Button
      variant="outlined"
      onClick={() => onClick()}
      startIcon={<UploadFileOutlinedIcon />}
    >
      Change image
    </Button>
  );
};

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

const LockedQuestionBlockDrawImage = ({
  question,
}: QuestionBlockSpecificCardSharedProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {question.content.images &&
      Array.isArray(question.content.images) &&
      question.content.images.length > 0 &&
      question.content.images[0] ? (
        <Box
          sx={{
            border: "none",
            p: 0,
            height: "min-content",
            width: "min-content",
            cursor: "pointer",
          }}
        >
          <CloudinaryImagePreview imagePublicId={question.content.images[0]} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            width: 200,
            border: 1,
            borderRadius: 1,
          }}
        >
          No image
        </Box>
      )}
    </Box>
  );
};

const UnlockedQuestionBlockDrawImage = ({
  question,
}: QuestionBlockSpecificCardSharedProps) => {
  const [imagePublicId, setImagePublicId] = useState<string[]>([]);
  const { register, setValue, onSubmit } = useUpdateSectionFormContext();

  useEffect(
    () => setImagePublicId(question.content.images || []),
    [question.content.images]
  );

  useEffect(() => {
    setValue(
      `questions.${question._id.toString()}.content.images`,
      imagePublicId
    );
  }, [imagePublicId, setValue, question._id]);

  const handleUploadFileOnClick = () => {
    openUploadWidget({
      onSuccess: (result) => {
        setImagePublicId(() => [result.info.public_id]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const resetUploadedImages = () => {
    setImagePublicId([]);
  };

  return (
    <>
      {JSON.stringify(imagePublicId) !==
        JSON.stringify(question.content.images) && (
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            color={(theme) => theme.palette.warning.main}
            align="center"
          >
            Changes are not saved yet! Please save the section.
          </Typography>
        </Box>
      )}

      <Stack spacing={4}>
        {imagePublicId.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CloudinaryImagePreview imagePublicId={imagePublicId[0]} />
          </Box>
        )}

        {imagePublicId.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              size="small"
              variant="outlined"
              color="warning"
              onClick={() => resetUploadedImages()}
            >
              Reset images
            </Button>
            <UploadFileButtonSimple onClick={() => handleUploadFileOnClick()} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <UploadFileButtonCard onClick={() => handleUploadFileOnClick()} />
          </Box>
        )}
      </Stack>
    </>
  );
};

const QuestionBlockDrawImage = ({
  question,
  locked,
}: QuestionBlockCardSharedProps) => {
  return locked ? (
    <LockedQuestionBlockDrawImage question={question} />
  ) : (
    <UnlockedQuestionBlockDrawImage question={question} />
  );
};

export default QuestionBlockDrawImage;
