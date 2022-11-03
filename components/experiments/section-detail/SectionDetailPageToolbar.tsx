import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import PageToolbar from "../../common/PageToolbar";

const SectionDetailPageToolbar = () => {
  return (
    <PageToolbar>
      <Button variant="contained" startIcon={<AddIcon />}>
        Add Question
      </Button>
    </PageToolbar>
  );
};

export default SectionDetailPageToolbar;
