import {
  Card,
  CardActions,
  CardContent,
  List,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import AppBar from "../../components/common/AppBar";
import ContentWrapper from "../../components/common/layout/ContentWrapper";
import CategoriesList from "../../components/experiments/CategoriesList";
import CreateNewExperimentButton from "../../components/experiments/CreateNewExperimentButton";
import NewExperimentDialog from "../../components/experiments/NewExperimentDialog";
import ExperimentListItem from "../../components/experiments/ExperimentListItem";
import Breadcrumbs from "../../components/MuiOverrides/Breadcrumbs";
import { useExperiments } from "../../hooks/experiments/useExperiments";

const ExperimentsListPage = () => {
  const [newExperimentDialogIsOpen, setNewExperimentDialogIsOpen] =
    useState(false);
  const { data: experiments, isLoading, isError } = useExperiments();

  if (isLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h1">Error</Typography>;
  }

  return (
    <>
      <AppBar />
      <ContentWrapper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
            width: "100%",
            height: "min-content",
          }}
        >
          <Breadcrumbs />
          <CreateNewExperimentButton
            onClick={() => setNewExperimentDialogIsOpen(true)}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 8, width: "100%" }}>
          <aside>
            <CategoriesList />
          </aside>

          <main style={{ width: "100%" }}>
            <Card variant="outlined">
              <CardContent
                sx={{
                  overflow: "auto",
                  maxHeight: (theme) => theme.breakpoints.values.sm,
                }}
              >
                {experiments.length > 0 ? (
                  <List>
                    <>
                      {experiments.map((item) => (
                        <ExperimentListItem
                          key={item._id.toString()}
                          experiment={item}
                        />
                      ))}
                    </>
                  </List>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      alignItems: "center",
                      gap: 4,
                      width: "100%",
                      maxWidth: (theme) => theme.breakpoints.values["md"],
                      p: 8,
                    }}
                  >
                    <Typography variant="h4">No Experiments</Typography>
                    <CardActions>
                      <CreateNewExperimentButton
                        onClick={() => setNewExperimentDialogIsOpen(true)}
                      />
                    </CardActions>
                  </Box>
                )}
              </CardContent>
            </Card>
          </main>
        </Box>
      </ContentWrapper>

      <NewExperimentDialog
        open={newExperimentDialogIsOpen}
        onSave={() => setNewExperimentDialogIsOpen(false)}
        onClose={() => setNewExperimentDialogIsOpen(false)}
      />
    </>
  );
};

export default ExperimentsListPage;
