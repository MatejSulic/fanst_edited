import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React, { FormEvent } from "react";
import { useCreateExperimentProgressMutation } from "../../../hooks/public/experiment-progress/useExperimentProgresses";
import { ExperimentType } from "../../../types/experiment";

type Props = {
  experiment: ExperimentType;
  participantId: string;
};

const ExperimentStartCard = ({ experiment, participantId }: Props) => {
  const createExperimentProgressMutation = useCreateExperimentProgressMutation(
    experiment._id.toString(),
    participantId
  );

  const handleExperimentStart = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createExperimentProgressMutation.mutate();
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: (theme) => theme.breakpoints.values.md }}
    >
      <form onSubmit={(e) => handleExperimentStart(e)}>
        <CardHeader
          title={
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Welcome to
              <br />
              <b>{experiment.title}</b>
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            eget gravida enim. Aenean sem nibh, iaculis sed eros in, iaculis
            finibus libero. Nulla facilisi. Maecenas enim erat, blandit a mattis
            sed, bibendum vel turpis. Suspendisse vitae tellus eget nulla
            eleifend iaculis sed eget ligula. Ut a tortor mauris. Donec
            consequat velit ac aliquet malesuada. Phasellus libero leo,
            vestibulum vitae orci vel, vehicula cursus enim. Aliquam dapibus
            eget mi a laoreet. Vestibulum ultricies arcu a lacus ultricies,
            pulvinar cursus nulla tempus. Nulla sollicitudin est ante, at
            euismod ipsum rhoncus et. Nullam blandit vehicula nisl, vel
            dignissim eros hendrerit eu. Duis vel turpis laoreet, eleifend justo
            at, dictum nibh. Aliquam euismod risus a ligula viverra aliquam. Nam
            dictum odio neque, a sodales lectus venenatis et.
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
          <Button variant="contained" type="submit">
            Start the experiment
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default ExperimentStartCard;
