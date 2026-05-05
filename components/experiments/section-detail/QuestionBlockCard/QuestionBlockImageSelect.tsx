import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import {
  QuestionBlockCardSharedProps,
  QuestionBlockSpecificCardSharedProps,
} from ".";
import { cloudinaryCloudName } from "../../../../lib/cloudinary";
import { handleOpenCloudinaryUploadWidget } from "../../../../utils/cloudinaryFileUpload";
import { useUpdateQuestionContent } from "../../../../hooks/questions/useUpdateQuestionContent";

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
      // plugins={[lazyload()]}
      width={200}
      style={{ borderRadius: 4 }}
    />
  );
};

const LockedQuestionBlockImageSelect = ({
  question,
}: QuestionBlockSpecificCardSharedProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 2, lg: 8 },
      }}
    >
      {/* <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    > */}
      {question.content.leftImage ? (
        <Box
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
      {question.content.rightImage ? (
        <Box
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

const UnlockedQuestionBlockImageSelect = ({
  question,
}: QuestionBlockSpecificCardSharedProps) => {
  const updateQuestionMutation = useUpdateQuestionContent(
    question.experimentId.toString(),
    question.sectionId.toString(),
    question._id.toString()
  );

  const handleUploadFileOnClick = (position: "left" | "right") => {
    return () =>
      handleOpenCloudinaryUploadWidget({
        onSuccess: (result) => {
          if (position === "left") {
            updateQuestionMutation.mutate({
              questionContent: { leftImage: result.info.public_id },
            });
          } else {
            updateQuestionMutation.mutate({
              questionContent: { rightImage: result.info.public_id },
            });
          }
        },
      });
  };

  const getLeftImageValueSafe = () => question.content.leftImage || "";

  const getRightImageValueSafe = () => question.content.rightImage || "";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, lg: 8 },
        }}
      >
        {getLeftImageValueSafe() ? (
          <Stack key={getLeftImageValueSafe()} spacing={2}>
            <CloudinaryImagePreview imagePublicId={getLeftImageValueSafe()} />
            <UploadFileButtonSimple onClick={handleUploadFileOnClick("left")} />
          </Stack>
        ) : (
          <UploadFileButtonCard onClick={handleUploadFileOnClick("left")} />
        )}

        {getRightImageValueSafe() ? (
          <Stack key={getRightImageValueSafe()} spacing={2}>
            <CloudinaryImagePreview imagePublicId={getRightImageValueSafe()} />
            <UploadFileButtonSimple
              onClick={handleUploadFileOnClick("right")}
            />
          </Stack>
        ) : (
          <UploadFileButtonCard onClick={handleUploadFileOnClick("right")} />
        )}
      </Box>
    </>
  );
};

const QuestionBlockImageSelect = ({
  question,
  locked,
}: QuestionBlockCardSharedProps) => {
  return locked ? (
    <LockedQuestionBlockImageSelect question={question} />
  ) : (
    <UnlockedQuestionBlockImageSelect question={question} />
  );
};

export default QuestionBlockImageSelect;
