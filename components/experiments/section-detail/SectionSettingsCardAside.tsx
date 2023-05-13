import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect } from "react";
import { useUpdateSectionFormContext } from "../../../contexts/experiments/experiment-detail/section-detail/updateSectionFormContext";
import { SectionType } from "../../../types/section/section";
import { useLockExperimentContext } from "../../../contexts/experiments/lockExperimentContext";

type Props = {
  section: SectionType;
};

const SectionSettingsCardAside = ({ section }: Props) => {
  const { register, setValue, onSubmit, errors } =
    useUpdateSectionFormContext();
  const lockExperimentContext = useLockExperimentContext();

  useEffect(() => {
    setValue(
      "settings.questionDisplayTime",
      section.settings?.questionDisplayTime
    );
    setValue("settings.imageWidth", section.settings?.imageWidth);
    setValue("settings.imageHeight", section.settings?.imageHeight);
    setValue("settings.distanceOfImages", section.settings?.distanceOfImages);
  }, [
    section.settings?.distanceOfImages,
    section.settings?.imageHeight,
    section.settings?.imageWidth,
    section.settings?.questionDisplayTime,
    setValue,
  ]);

  if (lockExperimentContext.isExperimentLocked) {
    return null;
  }

  return (
    <aside>
      <Box
        sx={{
          maxHeight: "100%",
          overflowY: "auto",
          width: 256,
        }}
      >
        <form onSubmit={onSubmit()}>
          <Typography
            component="span"
            sx={{
              fontSize: (theme) => theme.typography.fontSize,
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            Section options
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Stack spacing={1}>
              <TextField
                fullWidth
                label="Question display time in seconds"
                defaultValue={section.settings?.questionDisplayTime}
                {...register("settings.questionDisplayTime")}
              />
              <TextField
                fullWidth
                label="Image width in cm"
                defaultValue={section.settings?.imageWidth}
                {...register("settings.imageWidth")}
              />
              <TextField
                fullWidth
                label="Image height in cm"
                defaultValue={section.settings?.imageHeight}
                {...register("settings.imageHeight")}
              />
              <TextField
                fullWidth
                label="Gap between images in cm"
                defaultValue={section.settings?.distanceOfImages}
                {...register("settings.distanceOfImages")}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" variant="contained">
                  Save section settings
                </Button>
              </Box>
            </Stack>
          </Box>
        </form>
      </Box>
    </aside>
  );
};

export default SectionSettingsCardAside;
