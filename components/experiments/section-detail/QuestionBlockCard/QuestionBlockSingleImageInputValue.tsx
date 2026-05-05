import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
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
      width={200}
      style={{ borderRadius: 4 }}
    />
  );
};

const LockedQuestionBlockSingleImageInputValue = ({
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

const UnlockedQuestionBlockSingleImageInputValue = ({
  question,
}: QuestionBlockSpecificCardSharedProps) => {
  const updateQuestionMutation = useUpdateQuestionContent(
    question.experimentId.toString(),
    question.sectionId.toString(),
    question._id.toString()
  );

  const getImagesValuesSafe = () => question.content.images || [];

  const resetUploadedImages = () => {
    updateQuestionMutation.mutate({
      questionContent: { images: [] },
    });
  };

  const onUploadSuccess = (result: any) => {
    updateQuestionMutation.mutate({
      questionContent: { images: [result.info.public_id] },
    });
  };

  return (
    <>
      <Stack spacing={4}>
        {getImagesValuesSafe().length > 0 && (
          <Box
            key={JSON.stringify(JSON.stringify(getImagesValuesSafe()))}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CloudinaryImagePreview imagePublicId={getImagesValuesSafe()[0]} />
          </Box>
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

const QuestionBlockSingleImageInputValue = ({
  question,
  locked,
}: QuestionBlockCardSharedProps) => {
  return locked ? (
    <LockedQuestionBlockSingleImageInputValue question={question} />
  ) : (
    <UnlockedQuestionBlockSingleImageInputValue question={question} />
  );
};

export default QuestionBlockSingleImageInputValue;
