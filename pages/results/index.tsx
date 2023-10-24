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
import axios from "axios";
import { ExperimentResultsDetail } from "../../types/experimentResults";

const ExportCsvButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const resultsCsvMutation = useExperimentResultCsvMutation(id);

  const handleExportCsv = async () => {
    setIsLoading(true);
    resultsCsvMutation.mutate(id, {
      onSuccess: (data) => {
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

// type ExperimentResultsDetail = {
//   id: string;
//   name: string;
// };

const ResultsPage = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useResults();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      // flex: 0.5,
    },
    {
      field: "experimentName",
      headerName: "Experiment Name",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "responsesCount",
      headerName: "# of Responses",
      // flex: 0.5,
    },
    {
      field: "participantGroupsCount",
      headerName: "# of Groups",
      // flex: 0.5,
    },
    {
      field: "exportToCsv",
      headerName: "Export to CSV",
      flex: 0.5,
      minWidth: 150,
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
    // <div>
    //     {router.query.experimentId + "<br>"}
    //     {/* Render your results */}
    //     {JSON.stringify(data)}
    //  </div>

     <>
       <AppBar />
       <ContentWrapper>
         <DataGrid
          autoHeight
          initialState={{
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
          sx={{
            width: { md: "100%", xs: "100%" },
            maxHeight: "90%",
          }}
         />
       </ContentWrapper>
     </>

  );
};

export default ResultsPage;
