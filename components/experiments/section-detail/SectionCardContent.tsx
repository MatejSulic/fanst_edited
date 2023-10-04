import { CardContent, List, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useUpdateSectionFormContext } from "../../../contexts/experiments/experiment-detail/section-detail/updateSectionFormContext";
import { useLockExperimentContext } from "../../../contexts/experiments/lockExperimentContext";
import { QuestionType } from "../../../types/question/question";
import QuestionBlockListItem from "./QuestionBlockListItem";

type Props = {
  sectionDescription: string;
  questions: QuestionType[];
};

const SectionCardContent = ({ sectionDescription, questions }: Props) => {
  const { register, setValue, onSubmit } = useUpdateSectionFormContext();

  const lockExperimentContext = useLockExperimentContext();

  return (
    <CardContent>
      <Stack spacing={4}>
        {lockExperimentContext.isExperimentLocked ? (
          <Typography variant="body1">{sectionDescription}</Typography>
        ) : (
          <TextField
            label="Section description"
            multiline
            minRows={4}
            defaultValue={sectionDescription}
            size="small"
            {...register("description")}
          />
        )}
        <Droppable droppableId="section-detail-list-droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <List sx={{ p: 0, m: 0 }}>
                <Stack spacing={2}>
                  {questions.sort(
                    (a, b) => a.position - b.position
                  ).map((item, idx) => (
                    <QuestionBlockListItem
                      key={item._id.toString()}
                      question={item}
                    />
                  ))}
                </Stack>
              </List>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Stack>
    </CardContent>
  );
};

export default SectionCardContent;
