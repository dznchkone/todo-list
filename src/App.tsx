import { Fab, Stack, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import React, { useState, useEffect } from "react";
import Record from "./Components/Record";
import { IRecord } from "./interfaces";
import SearchAppBar from "./Components/SearchAppBar";
import AddIcon from "@mui/icons-material/Add";

const testData: IRecord[] = [
  {
    id: 1,
    text: "one",
    isDone: false,
  },
  {
    id: 2,
    text: "two",
    isDone: false,
  },
  {
    id: 3,
    text: "three",
    isDone: false,
  },
];

const App = () => {
  const [records, setRecords] = useState<IRecord[]>([]);
  const [textValue, setTextValue] = useState<string>("");

  useEffect(() => {
    setRecords(testData);
  }, []);

  const addNewTask = (data: IRecord) => {
    setRecords((prev: IRecord[]) => {
      return [...prev, data];
    });
  };

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
            onChange={(event): void => setTextValue(event.target.value)}
          />
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              addNewTask({
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
            return <Record key={index} data={record} />;
          })}
        </Stack>
      </Container>
    </>
  );
};

export default App;
