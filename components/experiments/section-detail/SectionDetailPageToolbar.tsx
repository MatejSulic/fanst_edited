import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState } from "react";
import PageToolbar from "../../common/PageToolbar";
import NewQuestionDialog from "./NewQuestionDialog";

const SectionDetailPageToolbar = () => {
  const [newQuestionDialogOpen, setNewQuestionDialogOpen] = useState(false);

  return (
    <>
      <PageToolbar>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setNewQuestionDialogOpen(true)}
        >
          Add Question
        </Button>
      </PageToolbar>
      <NewQuestionDialog
        open={newQuestionDialogOpen}
        onClose={() => setNewQuestionDialogOpen(false)}
        onSave={() => setNewQuestionDialogOpen(false)}
      />
    </>
  );
};

export default SectionDetailPageToolbar;
