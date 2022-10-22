import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

type Props = {
  children: React.ReactNode;
};

const PageToolbar = ({ children }: Props) => {
  return (
    <Box className="w-full px-8 flex justify-between gap-8">
      {children}
      <Box className="flex justify start items-center gap-4">
        <Button variant="outlined" size="small">
          Experiment settings
        </Button>
        <Button variant="text" size="small">
          Preview experiment
        </Button>
      </Box>
    </Box>
  );
};

export default PageToolbar;
