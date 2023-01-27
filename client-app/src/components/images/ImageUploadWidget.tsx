import { Button, Grid, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImageDropzone } from "./ImageDropzone";
import useUploadImages from "../../app/hooks/image/useUploadImages";
import { router } from "../../app/router/Routes";
import { useStore } from "../../app/stores/store";

export default observer(function ImageUploadWidget() {
  const { id } = useParams<{ id: string }>();
  const uploadImages = useUploadImages();
  const [files, setFiles] = useState<any>([]);
  const { modalStore } = useStore();

  function handleUploadImages(files: Blob[], id: string) {
    uploadImages.mutate({ files: files, id: id });
    modalStore.closeModal();
    router.navigate(`/images/${id}`);
  }

  //clean preview of files
  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
  return (
    <>
      <Paper sx={{ width: "100%", height: "100%" }}>
        <Grid container direction={"column"}>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            mt={1}
            mb={1}
          >
            <Grid item xs={4}>
              <Typography textAlign={"center"}>Step 1 - Add Images</Typography>
              <ImageDropzone setFiles={setFiles} />
            </Grid>
          </Grid>
          <Grid container direction={"column"} alignItems={"center"} mt={3}>
            <Grid item xs={4}>
              <Typography textAlign={"center"}>Images preview</Typography>
              {files &&
                files.length > 0 &&
                files.map((file: any) => (
                  <img
                    key={file}
                    src={file.preview}
                    style={{ width: "125px", height: "125px" }}
                  />
                ))}
            </Grid>
          </Grid>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            mt={3}
            mb={2}
          >
            <Grid>
              <Button
                size="small"
                color="success"
                disabled={files.length === 0}
                onClick={() => handleUploadImages(files, id!)}
                variant="outlined"
              >
                Upload
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
});
