import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useCreateNewQuestionForm from "../../../../hooks/questions/useCreateNewQuestionForm";
import { QuestionType } from "../../../../types/question/question";
import { questionTypeTypes } from "../../../../types/question/questionTypes";
import Dialog from "../../../MuiOverrides/Dialog";
import QuestionTypeDisplayedCard from "./QuestionTypeDisplayedCard";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const NewQuestionDialog = ({ open, onClose, onSave }: Props) => {
  const router = useRouter();
  const { experimentId, sectionId } = router.query;
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<QuestionType["type"]>("PLAIN_TEXT");
  const [register, setValue, onSubmit, errors] = useCreateNewQuestionForm(
    experimentId as string,
    sectionId as string
  );
  const newQuestionFormFieldType = register("type");

  useEffect(() => {
    setValue("type", selectedQuestionType);
  }, [selectedQuestionType, setValue]);

  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="sm">
      <form onSubmit={onSubmit(onSave)}>
        <DialogTitle>New Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the type of question you would like to add:
          </DialogContentText>
          <Box sx={{ mt: 1 }}>
            <Stack spacing={1}>
              {questionTypeTypes.map((type) => (
                <QuestionTypeDisplayedCard
                  key={type}
                  type={type}
                  onClick={() => setSelectedQuestionType(type)}
                  selected={selectedQuestionType === type}
                />
              ))}
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
          <Button type="submit" variant="contained">
            Add Question
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewQuestionDialog;
