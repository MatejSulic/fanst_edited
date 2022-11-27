import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { UpdateSectionFormContextProvider } from "../../../../contexts/experiments/experiment-detail/sectionDetailContext";
import useUpdateSectionForm from "../../../../hooks/experiments/experiment-detail/useUpdateSectionForm";
import { QuestionType } from "../../../../types/question/question";
import { SectionType } from "../../../../types/section/section";
import QuestionBlockListItem from "../QuestionBlockListItem";

type Props = {
  section: SectionType;
  questions: QuestionType[];
};

const AFCSectionDetail = ({ section, questions }: Props) => {
  const router = useRouter();
  const { experimentId, sectionId } = router.query;

  const [register, setValue, onSubmit, errors] = useUpdateSectionForm(
    experimentId as string,
    sectionId as string
  );

  return (
    <UpdateSectionFormContextProvider
      value={{ register, setValue, onSubmit, errors }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          overflowY: "auto",
        }}
      >
        <form onSubmit={onSubmit()}>
          <CardHeader
            action={
              <Tooltip title="Close section detail">
                <IconButton
                  component={Link}
                  href={`/experiments/${experimentId}`}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            }
            title={
              <TextField
                label="Section title"
                defaultValue={section.title}
                {...register("title")}
              />
            }
            className="pb-0"
          />
          <CardContent>
            <Stack spacing={4}>
              <TextField
                label="Section description"
                multiline
                minRows={4}
                defaultValue={section.description}
                size="small"
                {...register("description")}
              />
              <List sx={{ p: 0, m: 0 }}>
                <Stack spacing={2}>
                  {questions.map((item, idx) => (
                    <QuestionBlockListItem
                      key={item._id.toString()}
                      question={item}
                      index={idx}
                    />
                  ))}
                </Stack>
              </List>
            </Stack>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              p: 2,
            }}
          >
            <Button type="submit" variant="contained">
              Save section
            </Button>
          </CardActions>
        </form>
      </Card>
    </UpdateSectionFormContextProvider>
  );
};

export default AFCSectionDetail;
