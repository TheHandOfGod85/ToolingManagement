import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../../models/tooling";
import { useStore } from "../../../app/stores/store";

export default observer(function ToolingDetail() {
  const {
    toolingStore,
    userStore: { user },
  } = useStore();
  const { loadTooling, loading, singleTooling } = toolingStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadTooling(id);
  }, [id, loadTooling]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={20} />
        <Typography ml={1}>Loading tool...</Typography>
      </Box>
    );
  return (
    <Stack direction={"row"} justifyContent={"center"} mt={10} height={"100%"}>
      <Card sx={{ maxWidth: 445 }}>
        <CardActionArea component={Link} to={`/images/${singleTooling?.id}`}>
          <CardMedia
            component="img"
            height="140"
            image={singleTooling?.image || "/assets/placeholder.png"}
            alt="tooling"
          />
        </CardActionArea>
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
                <li key={product.name}>
                  {product.name}
                  {" IS "}
                  {product.isAllergen ? "Allergen" : "NOT Allergen"}
                </li>
              ))}
            </ul>
          </Typography>
        </CardContent>
        <CardActions>
          {user?.role === "Admin" ? (
            <Button
              component={Link}
              to={`/manage/${singleTooling?.id}`}
              size="small"
            >
              Edit
            </Button>
          ) : null}
          <Button component={Link} to={"/toolings"} size="small">
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
});
