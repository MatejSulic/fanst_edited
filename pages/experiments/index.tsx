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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Breadcrumbs />
          <CreateNewExperimentButton
            onClick={() => setNewExperimentDialogIsOpen(true)}
          />
        </Box>

        <Box className="flex gap-8">
          <aside>
            <CategoriesList />
          </aside>

          <main>
            <Card variant="outlined">
              <CardContent>
                {experiments.length > 0 ? (
                  <List
                    sx={{
                      width: (theme) => theme.breakpoints.values["md"],
                      maxWidth: (theme) => theme.breakpoints.values["md"],
                      backgroundColor: "white",
                    }}
                  >
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
