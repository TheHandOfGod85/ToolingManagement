import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { Image } from "../../../models/tooling";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";

export default observer(function ToolingImagesDetail() {
  const {
    toolingStore,
    userStore: { user },
  } = useStore();
  const {
    loadTooling,
    loading,
    singleTooling,
    deleteImage,
    setMainImage,
    unSetMainImage,
  } = toolingStore;
  const { id } = useParams<{ id: string }>();
  const [color, setColor] = useState<string>("");
  const [openArray, setOpenArray] = useState<Array<boolean>>(
    new Array(singleTooling.images!.length).fill(false)
  );
  const [anchorElArray, setAnchorElArray] = useState<any[]>(
    new Array(singleTooling.images!.length).fill(null)
  );

  const handleClick = (event: any, index: number) => {
    const newOpenArray = [...openArray];
    newOpenArray[index] = !newOpenArray[index];
    setOpenArray(newOpenArray);
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };
  const handleClose = (index: number) => {
    const newOpenArray = [...openArray];
    newOpenArray[index] = false;
    setOpenArray(newOpenArray);
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  function HandleDeleteImage(id: string) {
    deleteImage(id);
    setTimeout(function () {
      window.location.reload();
    }, 1500);
  }

  function HandleSetMainImage(id: string) {
    setMainImage(id);
  }
  // function HandleUnSetMainImage(id: string) {
  //   unSetMainImage(id);
  // }

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
      {singleTooling.images!.length !== 0 ? (
        <Typography color={"black"} variant="h4">
          IMAGES
        </Typography>
      ) : null}

      {singleTooling.images!.length === 0 ? (
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
          <ImageList variant="standard" cols={5} sx={{ ml: 5, mr: 5 }}>
            {singleTooling &&
              singleTooling.images!.map((img: Image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={img.url}
                    onClick={(e) => handleClick(e, index)}
                    loading="lazy"
                  />
                  {openArray[index] !== undefined && (
                    <Popover
                      open={openArray[index]}
                      anchorEl={anchorElArray[index]}
                      onClose={() => handleClose(index)}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    >
                      <IconButton onClick={() => HandleDeleteImage(img.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          HandleSetMainImage(img.id);
                        }}
                      >
                        <StarIcon
                          sx={
                            img.isMain === true
                              ? { color: "yellow" }
                              : { color: "grey" }
                          }
                        />
                      </IconButton>
                    </Popover>
                  )}
                </ImageListItem>
              ))}
          </ImageList>
        </>
      )}

      <Button component={Link} to={`/toolings/${singleTooling.id}`}>
        Go Back
      </Button>
    </Stack>
  );
});
