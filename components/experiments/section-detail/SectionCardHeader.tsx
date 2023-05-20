import CloseIcon from "@mui/icons-material/Close";
import {
  CardHeader,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useUpdateSectionFormContext } from "../../../contexts/experiments/experiment-detail/section-detail/updateSectionFormContext";
import { useLockExperimentContext } from "../../../contexts/experiments/lockExperimentContext";

type Props = {
  experimentId: string;
  sectionTitle: string;
};

const SectionCardHeader = ({ sectionTitle, experimentId }: Props) => {
  const { register, setValue, onSubmit } = useUpdateSectionFormContext();

  const lockExperimentContext = useLockExperimentContext();

  return (
    <CardHeader
      action={
        <Tooltip title="Close section detail">
          <IconButton component={Link} href={`/experiments/${experimentId}`}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      }
      title={
        lockExperimentContext.isExperimentLocked ? (
          <Typography variant="h6" sx={{ pb: 2 }}>
            {sectionTitle}
          </Typography>
        ) : (
          <TextField
            label="Section title"
            defaultValue={sectionTitle}
            sx={{ width: "66%" }}
            {...register("title")}
          />
        )
      }
      className="pb-0"
    />
  );
};

export default SectionCardHeader;
