import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../../models/tooling";
import { useStore } from "../../../app/stores/store";

export default observer(function ToolingDetail() {
  const { toolingStore } = useStore();
  const { singleTooling, loadTooling } = toolingStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadTooling(id);
  }, [id, loadTooling]);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      sx={{ alignItems: "center" }}
    >
      <Grid item>
        <Card sx={{ maxWidth: 445 }}>
          <CardMedia
            component="img"
            height="140"
            image="/assets/placeholder.png"
            alt="tooling"
          />
          <CardContent>
            <Typography variant="h6">
              T Number : {singleTooling?.tNumber}
            </Typography>
            <Typography variant="h6">
              PS Number : {singleTooling?.psNumber}
            </Typography>
            <Typography variant="h6">
              Quantity : {singleTooling?.quantity}
            </Typography>
            <Typography variant="h6">
              Department : {singleTooling?.department}
            </Typography>
            <Typography variant="h6">
              In Use : {singleTooling?.isInProduction === true ? "Yes" : "No"}
            </Typography>
            <Typography variant="h6">
              Impressions : {singleTooling?.numberOfImpressions}
            </Typography>
            <Typography variant="h6">
              Punnet Number : {singleTooling?.punnetNumber}
            </Typography>
            <Typography variant="h6">
              Products :{" "}
              <ul className="flex">
                {singleTooling?.products.map((product: Product) => (
                  <li key={product.name}>{product.name}</li>
                ))}
              </ul>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              to={`/manage/${singleTooling?.id}`}
              size="small"
            >
              Edit
            </Button>
            <Button component={Link} to={"/toolings"} size="small">
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
});
