import { Box, Button, Stack, Typography } from "@mui/material";
import TextTruncate from "react-text-truncate";
import SectionTypeCard, { SectionTypeCardSharedProps } from "./SectionTypeCard";

const SectionTypeAcknowledgement = ({
  ...props
}: SectionTypeCardSharedProps) => {
  return (
    <SectionTypeCard
      title="Acknowledgement"
      subheader="Predefined section including preset acknowledgement in a plain text format"
      {...props}
    >
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          <TextTruncate
            line={5}
            element="span"
            text={
              "Thank you for completing the experiment. All your answers be saved anonymously, without any connection to your person. The results of the experiment will be used purely for statistical purposes. If you would want to withdraw your consent to the collection of your data, your answers, you will have to choice to do that anytime in the future. Just click the link that you have received for the experiment completion."
            }
          />
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            columnGap: 2,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            color="warning"
            component="div"
          >
            Remove consent
          </Button>
          <Button variant="contained" size="small" component="div">
            Finish experiment
          </Button>
        </Box>
      </Stack>
    </SectionTypeCard>
  );
};

export default SectionTypeAcknowledgement;
