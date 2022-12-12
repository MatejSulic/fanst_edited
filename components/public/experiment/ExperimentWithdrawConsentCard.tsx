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
};

const ExperimentWithdrawConsentCard = ({ experiment }: Props) => {
  const router = useRouter();
  const withdrawConsentMutation = useWithdrawConsentMutation(
    experiment._id.toString()
  );

  const handleWithdrawConsent = () => {
    withdrawConsentMutation.mutate();
    router.replace(
      `/public/experiment-preview/${experiment._id.toString()}/consent-removed`
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          eget gravida enim. Aenean sem nibh, iaculis sed eros in, iaculis
          finibus libero. Nulla facilisi. Maecenas enim erat, blandit a mattis
          sed, bibendum vel turpis. Suspendisse vitae tellus eget nulla eleifend
          iaculis sed eget ligula. Ut a tortor mauris. Donec consequat velit ac
          aliquet malesuada. Phasellus libero leo, vestibulum vitae orci vel,
          vehicula cursus enim. Aliquam dapibus eget mi a laoreet. Vestibulum
          ultricies arcu a lacus ultricies, pulvinar cursus nulla tempus. Nulla
          sollicitudin est ante, at euismod ipsum rhoncus et. Nullam blandit
          vehicula nisl, vel dignissim eros hendrerit eu. Duis vel turpis
          laoreet, eleifend justo at, dictum nibh. Aliquam euismod risus a
          ligula viverra aliquam. Nam dictum odio neque, a sodales lectus
          venenatis et.
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
          href={`/public/experiment-preview/${experiment._id.toString()}/finished`}
        >
          <Button variant="contained">Finish</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ExperimentWithdrawConsentCard;
