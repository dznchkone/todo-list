import React, { useState } from "react";
import { Fab, Paper, Stack, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Record from "./Components/Record";
import { IRecord } from "./interfaces";
import SearchAppBar from "./Components/SearchAppBar";
import AddIcon from "@mui/icons-material/Add";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [records, setRecords] = useLocalStorage<IRecord[] | []>("records", []);
  const [textValue, setTextValue] = useState<string>("");

  const addNewRecord = (): void => {
    if (textValue.length > 0) {
      const data: IRecord = {
        id: records.length,
        text: textValue,
        isDone: false,
      };
      setRecords((prev: IRecord[]) => {
        return [...prev, data];
      });
      setTextValue("");
    }
  };

  const handleTextFieldKeyDown = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    switch (e.key) {
      case "Enter":
        addNewRecord();
        break;
      case "Escape":
        setTextValue("");
        break;
    
      default:
        break;
    }
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length < 256) setTextValue(event.target.value);
  };

  const handleCheckRecord = (id: number, checked: boolean):void=>{
    setRecords((prev: IRecord[])=>{
      const temp = [...prev.map(item=>{
        if (item.id === id) item.isDone = checked
        return item
      })];

      return temp
    })
  }

  const handleDelete = (id: number): void => {
    setRecords((prev: IRecord[]) => {
      return [...prev.filter((item) => item.id !== id)];
    });
  };

  return (
    <>
      <SearchAppBar />
      <Container fixed>
        <Stack
          component={Paper}
          direction={"row"}
          spacing={1}
          sx={{ p: 1, mb: 2 }}
        >
          <TextField
            label={"Добавить новый элемент..."}
            fullWidth
            variant={"standard"}
            value={textValue}
            onChange={handleTextFieldChange}
            onKeyDown={handleTextFieldKeyDown}
          />
          <Fab
            color="primary"
            size="small"
            aria-label="add"
            sx={{
              minWidth: '40px'
            }}
            onClick={addNewRecord}
            
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
            return <Record key={index} data={record} onDelete={handleDelete} onCheck={handleCheckRecord}/>;
          })}
        </Stack>
      </Container>
    </>
  );
};

export default App;
