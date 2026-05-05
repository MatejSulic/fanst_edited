import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { UpdateSectionResultsType } from "../../../types/experimentProgress";
import { SectionType } from "../../../types/section/section";

type Props = {
  section: SectionType;
  submitSection: (results: UpdateSectionResultsType) => void;
};

const ExperimentIntroductionCard = ({ section, submitSection }: Props) => {
  const handleContinue = () => {
    submitSection({
      sectionId: section._id.toString(),
      sectionType: section.type,
      sectionPosition: section.position,
      results: [],
    });
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: (theme) => theme.breakpoints.values.md, backgroundColor: "black" }}
    >
      <CardHeader
        title={
          <Typography variant="h5" sx={{ textAlign: "center", color: "white" }}>
            {section.title}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" sx={{ color: "white", mb: 3 }}>
          {section.description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <img
            src="/img/preview.png"
            alt="Příklad"
            style={{ maxWidth: "100%", borderRadius: 4 }}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
        <Button variant="contained" onClick={handleContinue}>
          Continue
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExperimentIntroductionCard;
