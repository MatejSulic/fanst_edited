import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import Dialog from "../../../MuiOverrides/Dialog";
import QuestionTypePlainText from "./QuestionTypePlainText";
import QuestionTypeSelectImage from "./QuestionTypeSelectImage";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const NewQuestionDialog = ({ open, onClose, onSave }: Props) => {
  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="sm">
      <DialogTitle>New Question</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the type of question you would like to add:
        </DialogContentText>
        <Box sx={{ mt: 1 }}>
          <Stack spacing={1}>
            <QuestionTypeSelectImage />
            <QuestionTypePlainText />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose()}
          sx={{ color: (theme) => theme.palette.warning.main }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={() => onSave()}>
          Add Question
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewQuestionDialog;
