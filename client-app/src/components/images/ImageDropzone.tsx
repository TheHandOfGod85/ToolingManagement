import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Typography } from "@mui/material";

interface Props {
  setFiles: (files: Blob) => void;
}

export function ImageDropzone({ setFiles }: Props) {
  const dropzoneStyles = {
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "10px",
    textAlign: "center" as "center",
    height: 100,
  };
  const dropzoneActive = {
    borderColor: "green",
  };
  return (
    <Dropzone
      onDrop={(acceptedFiles: any) =>
        setFiles(
          acceptedFiles.map((file: any) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
      }
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <section>
          <div
            {...getRootProps()}
            style={
              isDragActive
                ? { ...dropzoneStyles, ...dropzoneActive }
                : dropzoneStyles
            }
          >
            <input {...getInputProps()} />
            <CloudUploadIcon fontSize="large" />
            <Typography>Drop image here or click</Typography>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
