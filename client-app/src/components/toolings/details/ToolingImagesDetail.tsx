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
import { Link, useParams } from "react-router-dom";
import { Image } from "../../../models/tooling";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { ToastContainer } from "react-toastify";
import useDeleteImage from "../../../app/hooks/image/useDeleteImage";
import useSetMainImage from "../../../app/hooks/image/useSetMainImage";
import useTooling from "../../../app/hooks/tooling/useTooling";
import useUnSetMainImage from "../../../app/hooks/image/useUnSetMainImage";
import useUser from "../../../app/hooks/user/useUser";
import { useStore } from "../../../app/stores/store";
import ImageConfirmationDialog from "../../../app/common/modals/ImageConfirmationDialog";

export default observer(function ToolingImagesDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: singleTooling, isLoading: loading } = useTooling(id!);
  const deleteImage = useDeleteImage();
  const setMainImage = useSetMainImage();
  const unSetImage = useUnSetMainImage();
  const { data: user } = useUser();
  const { modalStore } = useStore();

  const [openArray, setOpenArray] = useState<Array<boolean>>(
    new Array(singleTooling?.images!.length).fill(false)
  );
  const [anchorElArray, setAnchorElArray] = useState<any[]>(
    new Array(singleTooling?.images!.length).fill(null)
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
        <Typography color={"#1976D2"} variant="h4" fontFamily={"anton"}>
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
          <Typography
            textAlign={"center"}
            variant="h6"
            fontFamily={"anton"}
            color={"#1976D2"}
          >
            No Images
          </Typography>
        </Stack>
      ) : (
        <>
          <ImageList variant="standard" cols={5} sx={{ ml: 5, mr: 5 }}>
            {!!singleTooling &&
              singleTooling?.images!.map((img: Image, index) => (
                <ImageListItem key={index} sx={{ width: { xs: 80, md: 200 } }}>
                  <img
                    src={img.url}
                    onClick={(e) => handleClick(e, index)}
                    loading="lazy"
                    alt=""
                  />
                  {openArray[index] !== undefined && user?.role === "Admin" && (
                    <Popover
                      open={openArray[index]}
                      anchorEl={anchorElArray[index]}
                      onClose={() => handleClose(index)}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    >
                      <IconButton
                        onClick={() =>
                          modalStore.openModal(
                            <ImageConfirmationDialog id={img.id} />
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          img.isMain === false
                            ? setMainImage.mutate(img.id)
                            : unSetImage.mutate(img.id);
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

      <Button component={Link} to={`/toolings/${singleTooling?.id}`}>
        Go Back
      </Button>
    </Stack>
  );
});
