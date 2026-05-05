import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ExperimentType } from "../../../types/experiment";

type Props = {
  experiment: ExperimentType;
};

const ExperimentFinishedCard = ({ experiment }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{
         width: (theme) => theme.breakpoints.values.md,
         backgroundColor: "black",
         color: "white",
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" sx={{ textAlign: "center", color: "white" }}>
            Thank you for filling in the 
          
            <br />
            <b>{experiment.title}</b>
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" sx={{ textAlign: "center", color: "white" }}>
          {/* You can close the window now. */}
          You can close the window now.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ExperimentFinishedCard;
