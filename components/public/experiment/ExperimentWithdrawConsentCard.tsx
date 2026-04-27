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
      sx={{
         width: (theme) => theme.breakpoints.values.md,
         backgroundColor: "black",
      }}
    >
      <CardHeader
        title={
          <Typography
           variant="h4"
            sx={{
               textAlign: "center",
               color: "white",
            }}>
            You have finished the experiment
            <br />
            <b>{experiment.title}</b>
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" sx={{ color: "white", }}>
          If you would now or at any time in the future decide to revoke your consent to data collection, click the button <strong>Withdraw consent</strong> below. All data regarding your answers will then be permanently deleted and will not be further processed.

          You can access this page using the link you received to start the experiment.
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", gap: 4, pb: 2 }}
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
          <Button variant="contained">Agree, finish experiment</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ExperimentWithdrawConsentCard;
