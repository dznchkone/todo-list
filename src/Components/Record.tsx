import React from "react";
import { Checkbox, Divider, Typography, IconButton, Box, Paper, Stack} from "@mui/material";
import { IRecord } from "../interfaces";
import {Delete as DeleteIcon} from "@mui/icons-material"

interface IRecordProps {
  data: IRecord
  onDelete: Function
  onCheck: Function
  onEdit?: Function
}

function Record(props: IRecordProps): JSX.Element {
  const { data, onDelete, onCheck } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>,checked: boolean): void => {
    onCheck(data.id, checked)
  }

  return (
    <Box component={Paper} flexDirection={"row"} display={"flex"}>
      <Checkbox checked={data.isDone} onChange={handleChange}/>
      <Divider orientation="vertical" variant="middle" flexItem/>
      <Typography variant="body1" padding={1} sx={{
        textDecoration: data.isDone? 'line-through':'none'
      }}>
        {data.text}
      </Typography>
      <Stack direction={"row"} sx={{ml: "auto"}} maxHeight={42}>
      <IconButton  aria-label="delete" onClick={()=>{onDelete(data.id)}}>
        <DeleteIcon/>
      </IconButton>
      </Stack>
      
    </Box>
  );
}

export default Record;
