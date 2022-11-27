import { AdvancedImage, lazyload } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { QuestionBlockCardSharedProps } from ".";
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

const QuestionBlockImageSelect = ({
  question,
  index,
}: QuestionBlockCardSharedProps) => {
  const [leftImagePublicId, setLeftImagePublicId] = useState(
    question.content.leftImage || ""
  );
  const [rightImagePublicId, setRightImagePublicId] = useState(
    question.content.rightImage || ""
  );
  const { register, setValue, onSubmit, errors } =
    useUpdateSectionFormContext();

  useEffect(() => {
    setValue(
      `questions.${question._id.toString()}.content.leftImage`,
      leftImagePublicId
    );
  }, [leftImagePublicId, setValue, question._id]);

  useEffect(() => {
    setValue(
      `questions.${question._id.toString()}.content.rightImage`,
      rightImagePublicId
    );
  }, [rightImagePublicId, setValue, question._id]);

  const handleUploadFileOnClick = (position: "left" | "right") => {
    return () =>
      openUploadWidget({
        onSuccess: (result) => {
          // console.log(result.info);
          if (position === "left") {
            setLeftImagePublicId(result.info.public_id);
          } else {
            setRightImagePublicId(result.info.public_id);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      });
  };

  return (
    <Stack spacing={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        {leftImagePublicId ? (
          <Stack spacing={2}>
            <CloudinaryImagePreview imagePublicId={leftImagePublicId} />
            <UploadFileButtonSimple onClick={handleUploadFileOnClick("left")} />
          </Stack>
        ) : (
          <UploadFileButtonCard onClick={handleUploadFileOnClick("left")} />
        )}
        {rightImagePublicId ? (
          <Stack spacing={2}>
            <CloudinaryImagePreview imagePublicId={rightImagePublicId} />
            <UploadFileButtonSimple
              onClick={handleUploadFileOnClick("right")}
            />
          </Stack>
        ) : (
          <UploadFileButtonCard onClick={handleUploadFileOnClick("right")} />
        )}
      </Box>
    </Stack>
  );
};

export default QuestionBlockImageSelect;
