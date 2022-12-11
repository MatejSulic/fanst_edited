import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Grow,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useIsSectionEditableContext } from "../../../../contexts/experiments/experiment-detail/section-detail/isSectionEditableContext";
import { useUpdateSectionFormContext } from "../../../../contexts/experiments/experiment-detail/section-detail/updateSectionFormContext";
import { useDeleteQuestionMutation } from "../../../../hooks/questions/useQuestions";
import { QuestionType } from "../../../../types/question/question";
import QuestionBlock2AFC from "./QuestionBlock2AFC";
import QuestionBlockImageSelect from "./QuestionBlockImageSelect";
import QuestionBlockPlainText from "./QuestionBlockPlainText";

export type QuestionBlockCardSharedProps = {
  question: QuestionType;
  index: number;
};

const QuestionBlockCard = ({
  question,
  index,
}: QuestionBlockCardSharedProps) => {
  const router = useRouter();
  const { experimentId, sectionId } = router.query;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const deleteQuestionMutation = useDeleteQuestionMutation(
    experimentId as string,
    sectionId as string,
    question._id.toString()
  );

  const { register, setValue, onSubmit, errors } =
    useUpdateSectionFormContext();

  const { isSectionEditable } = useIsSectionEditableContext();

  const handleDeleteQuestion = () => {
    deleteQuestionMutation.mutate();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const renderQuestionTypeBlock = () => {
    if (question.type === "PLAIN_TEXT") {
      return <QuestionBlockPlainText question={question} index={index} />;
    } else if (question.type === "IMAGE_SELECT") {
      return <QuestionBlockImageSelect question={question} index={index} />;
    } else if (question.type === "2AFC") {
      return <QuestionBlock2AFC question={question} index={index} />;
    } else {
      return null;
    }
  };

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <TextField
                label="Question title"
                defaultValue={question.title}
                size="small"
                {...register(`questions.${question._id.toString()}.title`)}
                sx={{ width: "75%" }}
              />
            </Box>
          }
          action={
            isSectionEditable ? (
              <IconButton
                ref={anchorRef}
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <MoreHorizIcon />
              </IconButton>
            ) : undefined
          }
        />
        <CardContent>{renderQuestionTypeBlock()}</CardContent>
      </Card>
      {isSectionEditable && (
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          className="z-10"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={() => handleDeleteQuestion()}
                      sx={{ color: (theme) => theme.palette.warning.main }}
                    >
                      <ListItemIcon>
                        <DeleteIcon color="warning" />
                      </ListItemIcon>
                      Delete question
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </>
  );
};

export default QuestionBlockCard;
