import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { Image } from "../../../models/tooling";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { toast, ToastContainer } from "react-toastify";

export default observer(function ToolingImagesDetail() {
  const { toolingStore } = useStore();
  const {
    loadTooling,
    loading,
    singleTooling,
    deleteImage,
    setMainImage,
    unSetMainImage,
  } = toolingStore;
  const { id } = useParams<{ id: string }>();
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
  const [spin, setSpin] = useState(false);

  function HandleDeleteImage(id: string) {
    deleteImage(id);
    setTimeout(function () {
      window.location.reload();
    }, 3000);
    toast("Image deleted", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });
  }

  function HandleSetMainImage(id: string) {
    setMainImage(id);
    setTimeout(function () {
      window.location.reload();
    }, 1500);
  }
  function HandleUnSetMainImage(id: string) {
    unSetMainImage(id);
    setTimeout(function () {
      window.location.reload();
    }, 1500);
  }

  useEffect(() => {
    setSpin(true);
    if (id) loadTooling(id);
    console.log(spin);
    return () => {
      setSpin(false);
    };
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
                    alt=""
                  />
                  {openArray[index] !== undefined && (
                    <Popover
                      open={openArray[index]}
                      anchorEl={anchorElArray[index]}
                      onClose={() => handleClose(index)}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    >
                      <IconButton
                        onClick={() =>
                          img.isMain === true
                            ? toast("Main Image cannot be deleted", {
                                position: "bottom-right",
                                autoClose: 1500,
                                hideProgressBar: true,
                                closeOnClick: true,
                                draggable: true,
                                theme: "light",
                              })
                            : HandleDeleteImage(img.id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          img.isMain === false
                            ? HandleSetMainImage(img.id)
                            : HandleUnSetMainImage(img.id);
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
          <ToastContainer />
        </>
      )}

      <Button component={Link} to={`/toolings/${singleTooling.id}`}>
        Go Back
      </Button>
    </Stack>
  );
});
