import CreateIcon from "@mui/icons-material/Create";
import { Button, Card, CardContent, List, Stack } from "@mui/material";
import { Box } from "@mui/system";
import AppBar from "../../components/common/AppBar";
import Breadcrumbs from "../../components/MuiOverrides/Breadcrumbs";
import ContentWrapper from "../../components/common/layout/ContentWrapper";
import CategoriesList from "../../components/experiments-list/CategoriesList";
import ExperimentListItem from "../../components/experiments-list/ExperimentListItem";
import clientPromise from "../../lib/mongodb";
import { InferGetServerSidePropsType } from "next";

export async function getServerSideProps(context) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

const ExperimentsListPage = ({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <AppBar />
      <h1>MongoDB Connected: {String(isConnected)}</h1>
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
