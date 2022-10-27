import CreateIcon from "@mui/icons-material/Create";
import { Button, Card, CardContent, List } from "@mui/material";
import { Box } from "@mui/system";
import AppBar from "../../components/common/AppBar";
import Breadcrumbs from "../../components/MuiOverrides/Breadcrumbs";
import ContentWrapper from "../../components/common/layout/ContentWrapper";
import CategoriesList from "../../components/experiments-list/CategoriesList";
import ExperimentListItem from "../../components/experiments-list/ExperimentListItem";

const ExperimentsListPage = () => {
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
              <List className="w-full max-w-3xl bg-white space-y-4">
                <ExperimentListItem />
                <ExperimentListItem />
                <ExperimentListItem />
              </List>
            </CardContent>
          </Card>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default ExperimentsListPage;
