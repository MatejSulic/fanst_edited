import { Box, Button, Stack, Typography } from "@mui/material";
import TextTruncate from "react-text-truncate";
import QuestionTypeCard, {
  QuestionTypeCardSharedProps,
} from "./QuestionTypeCard";

const QuestionTypePlainText = ({ ...props }: QuestionTypeCardSharedProps) => {
  return (
    <QuestionTypeCard
      title="Plain text"
      subheader="Add a question that does contain only user configurable text and a button to continue to next question. This type of question doesn't include any interactive element or answer beside the continue button."
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
          }}
        >
          <Button variant="contained" size="small">
            Continue
          </Button>
        </Box>
      </Stack>
    </QuestionTypeCard>
  );
};

export default QuestionTypePlainText;
