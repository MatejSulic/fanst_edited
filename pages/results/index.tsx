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
import { useRouter } from "next/router";

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
      },
    });
  };

  useEffect(() => {
    if (data !== null) {
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
  const router = useRouter();
  const { data, isLoading, isError } = useResults();

  if (isLoading || isError) {
    return null;
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
    },
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
  }));

  return (
    <>
      <AppBar />
      <ContentWrapper>
        <Box sx={{ display: "flex", height: 400, width: "66%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <DataGrid
              initialState={{
                // columns: { columnVisibilityModel: { id: false } },
                filter: {
                  filterModel: {
                    items: [
                      {
                        columnField: "id",
                        value: router.query.experimentId,
                      },
                    ],
                  },
                },
              }}
              rows={rows}
              columns={columns}
              isRowSelectable={() => false}
            />
          </Box>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default ResultsPage;
