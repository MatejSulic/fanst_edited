import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { ExperimentType } from "../../../types/experiment";

type Props = {
  experiment: ExperimentType;
  participantId: string;
};

const ExperimentConsentRemovedCard = ({ experiment, participantId }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{ width: (theme) => theme.breakpoints.values.md }}
    >
      <CardHeader
        title={
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Your data in the
            <br />
            <b>{experiment.title}</b>
            <br />
            has been successfuly removed.
            <br />
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          If you would like to participate in the experiment again, please use
          the link below.
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
        <Link
          href={`/public/experiment-preview/${experiment._id.toString()}/${participantId}`}
        >
          <Button variant="contained">Participate again</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ExperimentConsentRemovedCard;
