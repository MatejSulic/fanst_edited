import CreateIcon from "@mui/icons-material/Create";
import { Button, Card, CardContent, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppBar from "../../components/common/AppBar";
import ContentWrapper from "../../components/common/layout/ContentWrapper";
import CategoriesList from "../../components/experiments/CategoriesList";
import ExperimentListItem from "../../components/experiments/ExperimentListItem";
import Breadcrumbs from "../../components/MuiOverrides/Breadcrumbs";
import { useExperiments } from "../../hooks/experiments/useExperiments";

const ExperimentsListPage = () => {
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
        <Box className="flex justify-between">
          <Breadcrumbs />
          <Button variant={"contained"} startIcon={<CreateIcon />}>
            Create new experiment
          </Button>
        </Box>

        <Box className="flex gap-8">
          <aside>
            <CategoriesList />
          </aside>

          <Card variant="outlined">
            <CardContent>
              <List
                sx={{
                  width: "100%",
                  maxWidth: (theme) => theme.breakpoints.values["md"],
                  backgroundColor: "white",
                }}
              >
                {experiments.map((item) => (
                  <ExperimentListItem key={item.id} experiment={item} />
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default ExperimentsListPage;
