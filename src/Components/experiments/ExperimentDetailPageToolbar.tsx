import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import PageToolbar from "../common/PageToolbar";

const ExperimentDetailPageToolbar = () => {
  return (
    <PageToolbar>
      <Button variant="contained" startIcon={<AddIcon />}>
        Add section
      </Button>
    </PageToolbar>
  );
};

export default ExperimentDetailPageToolbar;
