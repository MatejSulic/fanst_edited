import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { SectionType } from "../../../types/section";

type Props = {
  sectionId: SectionType["id"];
};

const SectionSettingsCard = ({ sectionId }: Props) => {
  return (
    <Box
      sx={{
        maxHeight: "100%",
        overflowY: "auto",
        width: 256,
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: (theme) => theme.typography.fontSize,
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        Nastavení sekce
      </Typography>
      <Box sx={{ mt: 2 }}>
        <form>
          <Stack spacing={1}>
            <TextField fullWidth label="Čas zobrazení otázky" />
            <TextField fullWidth label="Šířka obrázků v cm" />
            <TextField fullWidth label="Výška obrázků v cm" />
            <TextField fullWidth label="Vzdálenost mezi obrázky" />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained">
                Uložit sekci
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default SectionSettingsCard;
