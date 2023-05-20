import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useWithdrawConsentMutation } from "../../../hooks/public/experiment-progress/useWIthdrawConsent";
import { ExperimentType } from "../../../types/experiment";

type Props = {
  experiment: ExperimentType;
  participantId: string;
};

const ExperimentWithdrawConsentCard = ({
  experiment,
  participantId,
}: Props) => {
  const router = useRouter();
  const withdrawConsentMutation = useWithdrawConsentMutation(
    experiment._id.toString(),
    participantId
  );

  const handleWithdrawConsent = () => {
    withdrawConsentMutation.mutate();
    router.replace(
      `/public/experiment-preview/${experiment._id.toString()}/${participantId}/consent-removed`
    );
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: (theme) => theme.breakpoints.values.md }}
    >
      <CardHeader
        title={
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            You have finished the
            <br />
            <b>{experiment.title}</b>
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1">
          To withdraw your consent with collection of your data, please click
          the button below. All data regarding your answers will be permanently
          deleted. You will not be able to participate in the experiment again.
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "flex-end", gap: 4, pb: 2 }}
      >
        <Button
          variant="contained"
          color="warning"
          onClick={() => handleWithdrawConsent()}
        >
          Withdraw consent
        </Button>
        <Link
          href={`/public/experiment-preview/${experiment._id.toString()}/${participantId}/finished`}
        >
          <Button variant="contained">Finish</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ExperimentWithdrawConsentCard;
