import React, { FC, useEffect, useState } from "react";
import { Fab, Paper, Stack, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Record from "./Components/Record";
import { IRecord } from "./interfaces";
import SearchAppBar from "./Components/SearchAppBar";
import AddIcon from "@mui/icons-material/Add";
import useLocalStorage from "./hooks/useLocalStorage";

export type Filter = "" | "done" | "not-done";

const App: FC = () => {
  const [storedRecords, setStoredRecords] = useLocalStorage<IRecord[] | []>(
    "records",
    []
  );
  const [textValue, setTextValue] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("")

  useEffect(()=>{
    document.title = "Список дел"
  },[])

  const addNewRecord = (): void => {
    if (textValue.length > 0) {
      const data: IRecord = {
        id: storedRecords.length,
        text: textValue,
        isDone: false,
      };
      setStoredRecords((prev: IRecord[]) => {
        return [...prev, data];
      });
      setTextValue("");
    }
  };

  const handleTextFieldKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
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

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value.length < 256) setTextValue(event.target.value);
  };

  const handleCheckRecord = (id: number, checked: boolean): void => {
    setStoredRecords((prev: IRecord[]) => {
      const temp = [
        ...prev.map((item) => {
          if (item.id === id) item.isDone = checked;
          return item;
        }),
      ];

      return temp;
    });
  };

  const handleDelete = (id: number): void => {
    setStoredRecords((prev: IRecord[]) => {
      return [...prev.filter((item) => item.id !== id)];
    });
  };

  const handleSearch = (inputText: string): void => {
    setSearchText(inputText);
  };

  const handleFilter = (filter:Filter):void=>{
    setFilter(filter);
  }

  const buildRecordsList = (): JSX.Element[] => {
    let temp = [...storedRecords];

    switch (filter) {
      case "done":
        temp = temp.filter((item) => item.isDone);
        break;
      case "not-done":
        temp = temp.filter((item) => !item.isDone);
        break;
      default:
        break;
    }

    if (searchText)
      temp = temp.filter((item) => item.text.includes(searchText));

    return temp.map((record: IRecord, index: number) => {
      return (
        <Record
          key={index}
          data={record}
          onDelete={handleDelete}
          onCheck={handleCheckRecord}
        />
      );
    });
  };

  return (
    <>
      <SearchAppBar onSearch={handleSearch} onFilter={handleFilter}/>
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
              minWidth: "40px",
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
          {buildRecordsList()}
        </Stack>
      </Container>
    </>
  );
};

export default App;
