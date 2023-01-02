import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState } from "react";
import NewSectionDialog from "./NewSectionDialog";
import PageToolbar from "../../common/PageToolbar";
import { useLockExperimentContext } from "../../../contexts/experiments/lockExperimentContext";

const ExperimentDetailPageToolbar = () => {
  const [newSectionDialogOpen, setNewSectionDialogOpen] = useState(false);
  const lockExperimentContext = useLockExperimentContext();

  return (
    <>
      <PageToolbar>
        {!lockExperimentContext.isExperimentLocked && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setNewSectionDialogOpen(true)}
          >
            Add section
          </Button>
        )}
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
