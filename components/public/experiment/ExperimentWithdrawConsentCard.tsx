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
            {/* You have finished the */}
            Dokončili jste experiment
            <br />
            <b>{experiment.title}</b>
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" sx={{ color: "white", }}>
          Pokud byste se nyní nebo někdy v budoucnu rozhodli odvolat svůj souhlas se
          sběrem dat, klikněte na tlačítko <strong>Odvolat souhlas</strong> níže.
          Všechna data týkající se vašich odpovědí pak budou trvale smazána a nebudou dále zpracovávána.

          Na tuto stránku se dostanete pomocí odkazu, který jste obdrželi pro spuštění experimentu.          
          {/* To withdraw your consent with collection of your data, please click
          the button below. All data regarding your answers will be permanently
          deleted. You will not be able to participate in the experiment again. */}
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
          {/* Withdraw consent */}
          Odvolat souhlas
        </Button>
        <Link
          href={`/public/experiment-preview/${experiment._id.toString()}/${participantId}/finished`}
        >
          <Button variant="contained">Souhlasím, ukončit experiment</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ExperimentWithdrawConsentCard;
