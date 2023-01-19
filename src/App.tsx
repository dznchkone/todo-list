import React, { useState, useEffect } from "react";
import { Fab, Stack, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Record from "./Components/Record";
import { IRecord } from "./interfaces";
import SearchAppBar from "./Components/SearchAppBar";
import AddIcon from "@mui/icons-material/Add";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [records, setRecords] = useLocalStorage<IRecord[] | []>("records", []);
  const [textValue, setTextValue] = useState<string>("");


  const addNewRecord = (data: IRecord):void => {
    setRecords((prev: IRecord[]) => {
      return [...prev, data];
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void=>{
    setTextValue(event.target.value);
  }

const handleDelete = (id:number):void=>{
    setRecords((prev:IRecord[])=>{
      return [...prev.filter(item=>item.id !== id)]
    })
}

  return (
    <>
      <SearchAppBar />
      <Container fixed>
        <Stack direction={"row"} spacing={1} sx={{ p: 1, mb: 2 }}>
          <TextField
            label={"ToDo text"}
            fullWidth
            variant={"standard"}
            value={textValue}
            onChange={handleChange}
          />
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              addNewRecord({
                id: records.length,
                text: textValue,
                isDone: false,
              });
              setTextValue("");
            }}
          >
            <AddIcon />
          </Fab>
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          {records.map((record: IRecord, index: number) => {
            return <Record key={index} data={record} onDelete={handleDelete}/>;
          })}
        </Stack>
      </Container>
    </>
  );
};

export default App;
