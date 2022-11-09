import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useCreateNewSectionForm from "../../../../hooks/experiments/experiment-detail/useCreateNewSectionForm";
import { sectionTypeTypes } from "../../../../types/section";
import { SectionType } from "../../../../types/section/section";
import Dialog from "../../../MuiOverrides/Dialog";
import SectionTypeDisplayedCard from "./SectionTypeDisplayedCard";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const NewSectionDialog = ({ open, onClose, onSave }: Props) => {
  const router = useRouter();
  const { experimentId } = router.query;
  const [selectedSectionType, setSelectedSectionType] =
    useState<SectionType["type"]>("INTRODUCTION");
  const [register, setValue, onSubmit, errors] = useCreateNewSectionForm(
    experimentId as string
  );
  const type = register("type");

  useEffect(() => {
    setValue("type", selectedSectionType);
  }, [selectedSectionType, setValue]);

  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="sm">
      <form onSubmit={onSubmit(onSave)}>
        <DialogTitle>New Section</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the type of section you would like to add:
          </DialogContentText>
          <Box sx={{ mt: 1 }}>
            <Stack spacing={1}>
              {sectionTypeTypes.map((type) => (
                <SectionTypeDisplayedCard
                  key={type}
                  type={type}
                  onClick={() => setSelectedSectionType(type)}
                  selected={selectedSectionType === type}
                />
              ))}
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onClose()}
            sx={{ color: (theme) => theme.palette.warning.main }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add section
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewSectionDialog;
