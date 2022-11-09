import { Box, Button, Stack, Typography } from "@mui/material";
import TextTruncate from "react-text-truncate";
import SectionTypeCard, { SectionTypeCardSharedProps } from "./SectionTypeCard";

const SectionTypeAcknowledgement = ({
  ...props
}: SectionTypeCardSharedProps) => {
  return (
    <SectionTypeCard
      title="Acknowledgement"
      subheader="Predefined section including acknowledgement and a button to cancel the GDPR consent"
      {...props}
    >
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          <TextTruncate
            line={5}
            element="span"
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus risus mattis, mollis ligula at, consequat nibh. Fusce sit amet mauris est. Mauris nibh lacus, iaculis ac tempor sed, laoreet eget risus. Donec nec pulvinar eros, id gravida turpis. Ut ornare porta diam, quis bibendum nibh tristique vitae. Mauris non convallis elit. Sed luctus, lorem eu ultrices hendrerit, dolor ipsum efficitur ipsum, nec lacinia ligula massa id mi. Praesent at mauris eu tellus faucibus volutpat. Cras auctor malesuada mollis. Proin a imperdiet turpis. Morbi pulvinar erat eget congue luctus. Praesent venenatis iaculis purus, at facilisis mauris auctor sed. Vestibulum vulputate venenatis eros, tempor ultrices erat ultricies vitae. Ut non elit in mi egestas vestibulum. Curabitur sollicitudin fringilla risus, ut ullamcorper orci volutpat sed. Nulla rutrum, massa vitae malesuada auctor, nibh urna suscipit nunc, sit amet elementum ante elit quis dui."
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
