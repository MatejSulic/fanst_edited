import CreateIcon from "@mui/icons-material/Create";
import { Button, Card, CardContent, List } from "@mui/material";
import { Box } from "@mui/system";
import AppBar from "../src/Components/common/AppBar";
import Breadcrumbs from "../src/Components/common/Breadcrumbs";
import ContentWrapper from "../src/Components/common/layout/ContentWrapper";
import CategoriesList from "../src/Components/experiments-list/CategoriesList";
import ExperimentListItem from "../src/Components/experiments-list/ExperimentListItem";

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
              {/* <Box className="py-1 border border-solid border-gray-200 rounded shadow-sm h-min"> */}
              <List className="w-full max-w-3xl bg-white space-y-4">
                <ExperimentListItem />
                <ExperimentListItem />
                <ExperimentListItem />
              </List>
              {/* </Box> */}
            </CardContent>
          </Card>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default ExperimentsListPage;
