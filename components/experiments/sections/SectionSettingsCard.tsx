import { Box, Button, TextField, Typography } from "@mui/material";

const SectionSettingsCard = () => {
  return (
    <Box className="max-h-full overflow-y-auto w-64">
      <Typography component="span" className="text-sm text-gray-500">
        Nastavení sekce
      </Typography>
      <form className="space-y-4 p-2">
        <TextField fullWidth label="Čas zobrazení otázky" />
        <TextField fullWidth label="Další možnost nastavení..." />
        <TextField fullWidth label="Další možnost nastavení..." />
        <TextField fullWidth label="Další možnost nastavení..." />
        <Box className="flex justify-end">
          <Button type="submit" variant="contained">
            Uložit sekci
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SectionSettingsCard;
