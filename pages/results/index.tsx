import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AppBar from "../../components/common/AppBar";
import ContentWrapper from "../../components/common/layout/ContentWrapper";
import {
  useExperimentResultCsvMutation,
  useResults,
} from "../../hooks/results/useResults";
import { CSVLink } from "react-csv";

const ExportCsvButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const resultsCsvMutation = useExperimentResultCsvMutation(id);

  const handleExportCsv = async () => {
    setIsLoading(true);
    resultsCsvMutation.mutate(id, {
      onSuccess: (data) => {
        console.log("on Success: ", data);
        setData(data);
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    if (data !== "") {
      setIsLoading(false);
    }
  }, [data]);

  return data ? (
    <CSVLink data={data} filename={`results-experiment-${id}`}>
      Download
    </CSVLink>
  ) : (
    <Button variant="text" onClick={() => handleExportCsv()}>
      Generate CSV
    </Button>
  );
};

const ResultsPage = () => {
  const { data, isLoading, isError } = useResults();

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading || isError) {
    return null;
  }

  const columns: GridColDef[] = [
    {
      field: "experimentName",
      headerName: "Experiment Name",
      flex: 1,
    },
    {
      field: "responsesCount",
      headerName: "# of Responses",
      flex: 0.5,
    },
    {
      field: "participantGroupsCount",
      headerName: "# of Groups",
      flex: 0.5,
    },
    {
      field: "exportToCsv",
      headerName: "Export to CSV",
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <ExportCsvButton id={params.id as string} />
      ),
    },
  ];

  const rows = data.map((item) => ({
    id: item._id.toString(),
    experimentName: item.title,
    responsesCount: item.results.length,
    participantGroupsCount: item.settings.numberOfParticipantGroups,
    // exportToCsv: <Button variant="outlined">To CSV</Button>,
  }));

  return (
    <>
      <AppBar />
      <ContentWrapper>
        <Box sx={{ display: "flex", height: 400, width: "66%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              isRowSelectable={() => false}

              // pageSize={5}
              // rowsPerPageOptions={[5]}
            />
          </Box>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default ResultsPage;
