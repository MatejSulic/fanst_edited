import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
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
      plugins={[lazyload(), responsive({ steps: 100 })]}
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
    <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
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
  const [imagesPublicIds, setImagesPublicIds] = useState<string[]>([]);

  const { register, setValue, onSubmit, errors } =
    useUpdateSectionFormContext();

  useEffect(
    () => setImagesPublicIds(question.content.images || []),
    [question.content.images]
  );

  useEffect(() => {
    setValue(
      `questions.${question._id.toString()}.content.images`,
      imagesPublicIds
    );
  }, [imagesPublicIds, setValue, question._id]);

  const resetUploadedImages = () => {
    setImagesPublicIds([]);
  };

  const handleUploadFileOnClick = () => {
    openUploadWidget({
      onSuccess: (result) => {
        setImagesPublicIds((prev) => [...prev, result.info.public_id]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Stack spacing={4}>
      {imagesPublicIds.length > 0 && (
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          {imagesPublicIds.map((publicId) => (
            <Grid key={publicId} item xs="auto">
              <CloudinaryImagePreview imagePublicId={publicId} />
            </Grid>
          ))}
        </Grid>
      )}

      {imagesPublicIds.length > 0 ? (
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
  );
};

const QuestionBlock2AFC = ({
  question,
  index,
  locked,
}: QuestionBlockCardSharedProps) => {
  return locked ? (
    <LockedQuestionBlock2AFC question={question} />
  ) : (
    <UnlockedQuestionBlock2AFC question={question} />
  );
};

export default QuestionBlock2AFC;
