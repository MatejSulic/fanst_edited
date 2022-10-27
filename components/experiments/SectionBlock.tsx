import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

const SectionBlock = () => {
  return (
    <Card>
      <CardActionArea>
        <CardHeader
          title={<Typography variant="subtitle1">Sekce 1</Typography>}
          className="pb-0"
        />
        <CardContent className="space-y-4">
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id
            dignissim eros. Ut eu imperdiet augue. Phasellus porttitor ante
            ante, eget condimentum sem convallis eget. Sed sed enim ut arcu
            suscipit fermentum. Proin id elementum nisi. Mauris iaculis
            sollicitudin felis, quis viverra orci mollis a. Fusce semper, tellus
            quis posuere rhoncus, ante nulla faucibus nibh, et vestibulum est
            turpis vitae sapien. Nam luctus laoreet aliquam. Quisque justo enim,
            viverra vel ultrices a, vulputate at ligula.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SectionBlock;
