import {
  Card,
  CardActions,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import AppBar from "../../components/common/AppBar";
import ContentWrapper from "../../components/common/layout/ContentWrapper";
import CategoriesList from "../../components/experiments/CategoriesList";
import CreateNewExperimentButton from "../../components/experiments/CreateNewExperimentButton";
import ExperimentListItem from "../../components/experiments/ExperimentListItem";
import NewExperimentDialog from "../../components/experiments/NewExperimentDialog";
import { LockExperimentContextProvider } from "../../contexts/experiments/lockExperimentContext";
import { useExperiments } from "../../hooks/experiments/useExperiments";

const ExperimentsListPage = () => {
  const router = useRouter();
  const [newExperimentDialogIsOpen, setNewExperimentDialogIsOpen] =
    useState(false);
  const { data: experiments, isLoading, isError } = useExperiments();

  if (isLoading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h1">Failed to load experiments. Please try again later.</Typography>;
  }

  const unlockedExperiments = experiments.filter((item) => !item.locked);
  const lockedExperiments = experiments.filter((item) => item.locked);

  return (
    <>
      <AppBar />
      <ContentWrapper>
        <Box
          sx={{
            display: "flex",
            flex: 0,
            justifyContent: "space-between",
            gap: 8,
            width: "100%",
            height: "min-content",
          }}
        >
          <CreateNewExperimentButton
            onClick={() => setNewExperimentDialogIsOpen(true)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: { md: 4, xs: 2 },
            width: "100%",
            maxHeight: "100%",
            overflow: "hidden",
            flex: 1,
          }}
        >
          <aside style={{ flex: 0 }}>
            <CategoriesList />
          </aside>

          <main
            style={{
              width: "100%",
              flex: 1,
              overflow: "auto",
              maxHeight: "100%",
            }}
          >
            {experiments && experiments.length > 0 ? (
              <Card
                variant="outlined"
                sx={{
                  maxHeight: "100%",
                  overflowY: "auto",
                  maxWidth: "100%",
                }}
              >
                {router.query.category === undefined ||
                router.query.category === "active" ? (
                  <>
                    {unlockedExperiments.length > 0 && (
                      <List
                        subheader={
                          <ListSubheader>Unlocked Experiments</ListSubheader>
                        }
                      >
                        <>
                          {unlockedExperiments.map((item) => (
                            <LockExperimentContextProvider
                              key={item._id.toString()}
                              experimentId={item._id.toString()}
                            >
                              <ExperimentListItem
                                key={item._id.toString()}
                                experiment={item}
                              />
                            </LockExperimentContextProvider>
                          ))}
                        </>
                      </List>
                    )}

                    {lockedExperiments.length > 0 && (
                      <List
                        subheader={
                          <ListSubheader>Locked Experiments</ListSubheader>
                        }
                      >
                        <>
                          {lockedExperiments.map((item) => (
                            <LockExperimentContextProvider
                              key={item._id.toString()}
                              experimentId={item._id.toString()}
                            >
                              <ExperimentListItem
                                key={item._id.toString()}
                                experiment={item}
                              />
                            </LockExperimentContextProvider>
                          ))}
                        </>
                      </List>
                    )}
                  </>
                ) : (
                  <List>
                    <>
                      {experiments.map((item) => (
                        <LockExperimentContextProvider
                          key={item._id.toString()}
                          experimentId={item._id.toString()}
                        >
                          <ExperimentListItem
                            key={item._id.toString()}
                            experiment={item}
                          />
                        </LockExperimentContextProvider>
                      ))}
                    </>
                  </List>
                )}
              </Card>
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
