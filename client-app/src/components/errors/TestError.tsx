import { useState } from "react";
import axios from "axios";
import { Button, Stack, Typography } from "@mui/material";
import ValidationErrors from "./ValidationErrors";

export default function TestErrors() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const [errors, setErrors] = useState(null);

  function handleNotFound() {
    axios
      .get(baseUrl + "buggy/not-found")
      .catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios
      .get(baseUrl + "buggy/bad-request")
      .catch((err) => console.log(err.response));
  }

  function handleServerError() {
    axios
      .get(baseUrl + "buggy/server-error")
      .catch((err) => console.log(err.response));
  }

  function handleUnauthorised() {
    axios
      .get(baseUrl + "buggy/unauthorised")
      .catch((err) => console.log(err.response));
  }

  function handleBadGuid() {
    axios
      .get(baseUrl + "toolings/notaguid")
      .catch((err) => console.log(err.response));
  }

  function handleValidationError() {
    axios.post(baseUrl + "toolings", {}).catch((err) => setErrors(err));
  }

  return (
    <>
      <Typography textAlign={"center"} variant="h4">
        Test Error component
      </Typography>
      <Stack direction={"row"} justifyContent={"center"} mt={6}>
        <Button variant="contained" onClick={handleNotFound}>
          Not Found
        </Button>
        <Button variant="contained" onClick={handleBadRequest}>
          Bad Request
        </Button>
        <Button variant="contained" onClick={handleValidationError}>
          Validation Error
        </Button>
        <Button variant="contained" onClick={handleServerError}>
          Server Error
        </Button>
        <Button variant="contained" onClick={handleUnauthorised}>
          Unauthorised
        </Button>
        <Button variant="contained" onClick={handleBadGuid}>
          Bad Guid
        </Button>
      </Stack>
      {errors && <ValidationErrors errors={errors} />}
    </>
  );
}
