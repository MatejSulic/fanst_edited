import AddIcon from "@mui/icons-material/Add";
import {
  Card,
  CardActionArea,
  CardContent,
  ListItem,
  Typography,
} from "@mui/material";

const NewSectionListItem = () => {
  return (
    <ListItem className="flex items-start gap-4">
      <CardActionArea>
        <Card variant="outlined" className="border-dashed">
          <CardContent className="flex flex-col justify-center items-center text-gray-700">
            <AddIcon className="w-12 h-12" />
            <Typography variant="subtitle1">Add new section</Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </ListItem>
  );
};

export default NewSectionListItem;
