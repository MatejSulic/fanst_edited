import { AdvancedImage, responsive } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  QuestionBlockCardSharedProps,
  QuestionBlockSpecificCardSharedProps,
} from ".";
import { useUpdateQuestionContent } from "../../../../hooks/questions/useUpdateQuestionContent";
import { cloudinaryCloudName } from "../../../../lib/cloudinary";
import { handleOpenCloudinaryUploadWidget } from "../../../../utils/cloudinaryFileUpload";

type UploadFileButtonProps = { onClick: () => void };

const UploadFileButtonCard = ({ onClick }: UploadFileButtonProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: 80,
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
      <Typography variant="subtitle2">Upload Images</Typography>
    </Paper>
  );
};

const UploadFileButtonSimple = ({ onClick }: UploadFileButtonProps) => {
  return (
    <Button
      size="small"
      variant="outlined"
      color="primary"
      onClick={() => onClick()}
      startIcon={<UploadFileOutlinedIcon />}
    >
      Add images
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
      plugins={[responsive({ steps: 100 })]}
      width={120}
      // maxWidth={120}
      style={{ borderRadius: 4 }}
    />
  );
};

const LockedQuestionBlock2AFC = ({
  question,
}: QuestionBlockSpecificCardSharedProps) => {
  return question.content.images && question.content.images.length > 0 ? (
    <Grid
      key={JSON.stringify(question.content.images)}
      container
      spacing={2}
      justifyContent="flex-start"
      alignItems="center"
    >
      {question.content.images.map((publicId) => (
        <Grid key={publicId} item xs="auto">
          <CloudinaryImagePreview imagePublicId={publicId} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Box
      sx={{
        width: "100%",
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: 1,
        borderRadius: 1,
      }}
    >
      No images
    </Box>
  );
};

const UnlockedQuestionBlock2AFC = ({
  question,
}: QuestionBlockSpecificCardSharedProps) => {
  const [questionImages, setQuestionImages] = useState(
    question.content.images || []
  );
  const updateQuestionMutation = useUpdateQuestionContent(
    question.experimentId.toString(),
    question.sectionId.toString(),
    question._id.toString()
  );

  useEffect(() => {
    updateQuestionMutation.mutate({
      questionContent: {
        images: questionImages,
      },
    });
  }, [questionImages]);

  const getImagesValuesSafe = () => questionImages || [];

  const resetUploadedImages = () => {
    setQuestionImages([]);
  };

  const onUploadSuccess = (result) => {
    setQuestionImages((prev) => [...prev, result.info.public_id]);
  };

  return (
    <>
      <Stack spacing={4}>
        {getImagesValuesSafe().length > 0 && (
          <Grid
            key={JSON.stringify(getImagesValuesSafe())}
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
          >
            {getImagesValuesSafe().map((publicId) => (
              <Grid key={publicId} item xs="auto">
                <CloudinaryImagePreview imagePublicId={publicId} />
              </Grid>
            ))}
          </Grid>
        )}

        {getImagesValuesSafe().length > 0 ? (
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
            <UploadFileButtonSimple
              onClick={() =>
                handleOpenCloudinaryUploadWidget({
                  onSuccess: onUploadSuccess,
                })
              }
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <UploadFileButtonCard
              onClick={() =>
                handleOpenCloudinaryUploadWidget({
                  onSuccess: onUploadSuccess,
                })
              }
            />
          </Box>
        )}
      </Stack>
    </>
  );
};

const QuestionBlock2AFC = ({
  question,
  locked,
}: QuestionBlockCardSharedProps) => {
  return locked ? (
    <LockedQuestionBlock2AFC question={question} />
  ) : (
    <UnlockedQuestionBlock2AFC question={question} />
  );
};

export default QuestionBlock2AFC;
