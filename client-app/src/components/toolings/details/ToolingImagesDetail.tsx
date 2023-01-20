import {
  Box,
  Button,
  CircularProgress,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { Image } from "../../../models/tooling";

export default observer(function ToolingImagesDetail() {
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
        <Typography ml={1}>Loading Images...</Typography>
      </Box>
    );
  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={10}
      height={"100%"}
    >
      {singleTooling?.images!.length !== 0 ? (
        <Typography color={"black"} variant="h4">
          IMAGES
        </Typography>
      ) : null}

      {singleTooling?.images!.length === 0 ? (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          height={"60vh"}
        >
          <Typography textAlign={"center"} variant="h6">
            No Images
          </Typography>
        </Stack>
      ) : (
        <>
          <ImageList variant="standard" cols={5} sx={{ ml: 5 }}>
            {!!singleTooling &&
              singleTooling.images!.map((img: Image) => (
                <ImageListItem key={img.id}>
                  <img key={img.id} src={`${img.url}`} loading="lazy" />
                </ImageListItem>
              ))}
          </ImageList>
        </>
      )}

      <Button component={Link} to={`/toolings/${singleTooling?.id}`}>
        Go Back
      </Button>
    </Stack>
  );
});
