import { Button, Grid, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { ImageDropzone } from "./ImageDropzone";

export default observer(function ImageUploadWidget() {
  const [files, setFiles] = useState<any>([]);
  const { id } = useParams<{ id: string }>();
  const { toolingStore } = useStore();
  const { uploadImage } = toolingStore;

  function handleImagesUpload(files: Blob[], id: string) {
    uploadImage(files, id);
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
                    key={file.id}
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
                onClick={() => handleImagesUpload(files, id!)}
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
