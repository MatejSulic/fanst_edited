import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useUpdateSectionFormContext } from "../../../contexts/experiments/experiment-detail/section-detail/updateSectionFormContext";
import { SectionType } from "../../../types/section/section";

type Props = {
  section: SectionType;
};

const SectionSettingsCard = ({ section }: Props) => {
  const { register, setValue, onSubmit, errors } =
    useUpdateSectionFormContext();

  return (
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
              label="Gap between images"
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
  );
};

export default SectionSettingsCard;
