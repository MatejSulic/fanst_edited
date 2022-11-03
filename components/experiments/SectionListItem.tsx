import {
  Card,
  CardContent,
  CardHeader,
  ListItem,
  Typography,
} from "@mui/material";
import TextTruncate from "react-text-truncate";

const SectionListItem = () => {
  return (
    <ListItem button className="flex items-start gap-4">
      <Typography variant="h6" component="div">
        1
      </Typography>
      <Card>
        <CardHeader
          title={
            <Typography variant="subtitle1" component="div">
              Sekce 1
            </Typography>
          }
          className="pb-0"
        />
        <CardContent>
          <Typography variant="body2" component="div">
            <TextTruncate
              line={4}
              element="span"
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id dignissim eros. Ut eu imperdiet augue. Phasellus porttitor ante ante, eget condimentum sem convallis eget. Sed sed enim ut arcu suscipit fermentum. Proin id elementum nisi. Mauris iaculis sollicitudin felis, quis viverra orci mollis a. Fusce semper, tellus quis posuere rhoncus, ante nulla faucibus nibh, et vestibulum est turpis vitae sapien. Nam luctus laoreet aliquam. Quisque justo enim, viverra vel ultrices a, vulputate at ligula. Aliquam fringilla est in nibh bibendum, pretium tempor nisl lacinia. Vivamus tincidunt lacus ut nulla semper, ullamcorper vehicula velit convallis. Integer ex velit, aliquet eget vulputate vitae, congue porta odio. Curabitur sit amet vulputate diam, in bibendum dui."
              }
            />
          </Typography>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default SectionListItem;
