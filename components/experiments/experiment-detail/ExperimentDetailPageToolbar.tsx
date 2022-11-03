import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState } from "react";
import NewSectionDialog from "./NewSectionDialog";
import PageToolbar from "../../common/PageToolbar";

const ExperimentDetailPageToolbar = () => {
  const [newSectionDialogOpen, setNewSectionDialogOpen] = useState(false);

  return (
    <>
      <PageToolbar>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setNewSectionDialogOpen(true)}
        >
          Add section
        </Button>
      </PageToolbar>
      <NewSectionDialog
        open={newSectionDialogOpen}
        onClose={() => setNewSectionDialogOpen(false)}
        onSave={() => setNewSectionDialogOpen(false)}
      />
    </>
  );
};

export default ExperimentDetailPageToolbar;
