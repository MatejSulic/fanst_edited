import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState } from "react";
import { useLockExperimentContext } from "../../../contexts/experiments/lockExperimentContext";
import PageToolbar from "../../common/PageToolbar";
import NewSectionDialog from "./NewSectionDialog";

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
            size="small"
            onClick={() => setNewSectionDialogOpen(true)}
            sx={{ minWidth: "min-content", minHeight: "min-content" }}
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
