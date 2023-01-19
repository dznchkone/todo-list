import { Checkbox, Divider, Typography, IconButton, Box, Paper} from "@mui/material";
import React from "react";
import { IRecord } from "../interfaces";
import {Delete as DeleteIcon} from "@mui/icons-material"

interface IRecordProps {
  data: IRecord;
}

function Record(props: IRecordProps): JSX.Element {
  const { data } = props;

  return (
    <Box component={Paper} flexDirection={"row"} display={"flex"} maxHeight={42}>
      <Checkbox/>
      <Divider orientation="vertical" variant="middle" flexItem/>
      <Typography variant="body1" padding={1}>
        {data.text}
      </Typography>
      <IconButton sx={{ml: "auto"}} aria-label="delete" onClick={()=>{}}>
        <DeleteIcon/>
      </IconButton>
    </Box>
  );
}

export default Record;
