import { Box, Button, Slider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect } from "react";
import { useUpdateSectionFormContext } from "../../../contexts/experiments/experiment-detail/section-detail/updateSectionFormContext";
import { SectionType } from "../../../types/section/section";
import { useLockExperimentContext } from "../../../contexts/experiments/lockExperimentContext";

type Props = {
  section: SectionType;
};

const SectionSettingsCardAside = ({ section }: Props) => {
  const { setValue, watch, onSubmit } = useUpdateSectionFormContext();
  const lockExperimentContext = useLockExperimentContext();

  const imageDisplayTime = watch("settings.imageDisplayTime") ?? section.settings?.imageDisplayTime ?? 0;
  const interQuestionDelay = watch("settings.interQuestionDelay") ?? section.settings?.interQuestionDelay ?? 0;

  useEffect(() => {
    setValue("settings.imageDisplayTime", section.settings?.imageDisplayTime ?? 0);
    setValue("settings.interQuestionDelay", section.settings?.interQuestionDelay ?? 0);
  }, [
    section.settings?.imageDisplayTime,
    section.settings?.interQuestionDelay,
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
              <Box>
                <Typography
                  component="span"
                  sx={{
                    fontSize: (theme) => theme.typography.fontSize,
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  Image display time:{" "}
                  {imageDisplayTime > 0 ? `${imageDisplayTime} s` : "unlimited"}
                </Typography>
                <Slider
                  min={0}
                  max={2}
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
                    { value: 1.5, label: "1.5s" },
                    { value: 2, label: "2s" },
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
