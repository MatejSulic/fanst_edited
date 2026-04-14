import { Box, Button, Slider, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect } from "react";
import { useUpdateSectionFormContext } from "../../../contexts/experiments/experiment-detail/section-detail/updateSectionFormContext";
import { SectionType } from "../../../types/section/section";
import { useLockExperimentContext } from "../../../contexts/experiments/lockExperimentContext";

type Props = {
  section: SectionType;
};

const SectionSettingsCardAside = ({ section }: Props) => {
  const { register, setValue, watch, onSubmit } = useUpdateSectionFormContext();
  const lockExperimentContext = useLockExperimentContext();

  const imageDisplayTime = watch("settings.imageDisplayTime") ?? section.settings?.imageDisplayTime ?? 0;
  const preImageDelayTime = watch("settings.preImageDelayTime") ?? section.settings?.preImageDelayTime ?? 0;
  const interQuestionDelay = watch("settings.interQuestionDelay") ?? section.settings?.interQuestionDelay ?? 0;

  useEffect(() => {
    setValue("settings.questionDisplayTime",section.settings?.questionDisplayTime);
    setValue("settings.imageDisplayTime", section.settings?.imageDisplayTime ?? 0);
    setValue("settings.preImageDelayTime", section.settings?.preImageDelayTime ?? 0);
    setValue("settings.interQuestionDelay", section.settings?.interQuestionDelay ?? 0);
    setValue("settings.imageWidth", section.settings?.imageWidth);
    setValue("settings.imageHeight", section.settings?.imageHeight);
    setValue("settings.distanceOfImages", section.settings?.distanceOfImages);
    setValue("settings.calibrationImagePublicId", section.settings?.calibrationImagePublicId);
    setValue("settings.calibrationTimeInSeconds", section.settings?.calibrationTimeInSeconds);
  }, [
    section.settings?.distanceOfImages,
    section.settings?.imageHeight,
    section.settings?.imageWidth,
    section.settings?.questionDisplayTime,
    section.settings?.imageDisplayTime,
    section.settings?.preImageDelayTime,
    section.settings?.interQuestionDelay,
    section.settings?.calibrationImagePublicId,
    section.settings?.calibrationTimeInSeconds,
    setValue,
  ]);

  if (lockExperimentContext.isExperimentLocked) {
    return null;
  }

  return (
    <aside style={{ flexGrow: 0 }}>
      <Box
        sx={{
          maxHeight: "100%",
          overflowY: "auto",
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
              <Box>
                <Typography
                  component="span"
                  sx={{
                    fontSize: (theme) => theme.typography.fontSize,
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  Image display time:{" "}
                  {imageDisplayTime > 0
                    ? `${imageDisplayTime} s`
                    : "unlimited"}
                </Typography>
                <Slider
                  min={0}
                  max={5}
                  step={0.1}
                  value={imageDisplayTime}
                  onChange={(_, value) =>
                    setValue("settings.imageDisplayTime", value as number)
                  }
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: "∞" },
                    { value: 0.5, label: "0.5s" },
                    { value: 1, label: "1s" },
                    { value: 2, label: "2s" },
                    { value: 5, label: "5s" },
                  ]}
                />
              </Box>
              <Box>
                <Typography
                  component="span"
                  sx={{
                    fontSize: (theme) => theme.typography.fontSize,
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  Countdown before image:{" "}
                  {preImageDelayTime > 0 ? `${preImageDelayTime} s` : "none"}
                </Typography>
                <Slider
                  min={0}
                  max={5}
                  step={0.5}
                  value={preImageDelayTime}
                  onChange={(_, value) =>
                    setValue("settings.preImageDelayTime", value as number)
                  }
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: "off" },
                    { value: 1, label: "1s" },
                    { value: 3, label: "3s" },
                    { value: 5, label: "5s" },
                  ]}
                />
              </Box>
              <Box>
                <Typography
                  component="span"
                  sx={{
                    fontSize: (theme) => theme.typography.fontSize,
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  Between questions:{" "}
                  {interQuestionDelay > 0
                    ? `${interQuestionDelay} s`
                    : "none"}
                </Typography>
                <Slider
                  min={0}
                  max={5}
                  step={0.5}
                  value={interQuestionDelay}
                  onChange={(_, value) =>
                    setValue("settings.interQuestionDelay", value as number)
                  }
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: "off" },
                    { value: 1, label: "1s" },
                    { value: 3, label: "3s" },
                    { value: 5, label: "5s" },
                  ]}
                />
              </Box>
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
              <TextField
                fullWidth
                label="Calibration image Public Id"
                defaultValue={section.settings?.calibrationImagePublicId}
                {...register("settings.calibrationImagePublicId")}
              />
              <TextField
                fullWidth
                label="Calibration time in seconds"
                defaultValue={section.settings?.calibrationTimeInSeconds}
                {...register("settings.calibrationTimeInSeconds")}
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
