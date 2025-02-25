import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { getKanbanBoardCategory } from "./helpers/getKanbanBoardCategory";

function App() {
  const kanbanBoardCategories = getKanbanBoardCategory();
  const initialState = kanbanBoardCategories.reduce((acc, column) => {
    acc[column.key] = [];
    return acc;
  }, {});
  const [task, setTask] = useState({});
  const [tasks, setTasks] = useState(initialState);
  const [editModeInput, setEditModeInput] = useState(false);
  const [editModeTextArea, setEditModeTextArea] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  function handleValueChange(newValue) {
    setInputValue(newValue);
  }

  function handleTextareaChange(newValue) {
    setTextareaValue(newValue);
  }

  function handleAddTask(valueOfInput, valueOfTextarea) {
    const newTask = {
      inputValue: valueOfInput,
      textareaValue: valueOfTextarea,
    };
    setTasks((prevTasks) => ({
      ...prevTasks,
      backlog: [...prevTasks.backlog, newTask],
    }));
  }

  function handleInputUpdate() {
    setEditModeInput(!editModeInput);
  }

  function handleTextareaUpdate() {
    setEditModeTextArea(!editModeTextArea);
  }

  return (
    <div className="container">
      <Header
        inputValue={inputValue}
        handleValueChange={handleValueChange}
        textareaValue={textareaValue}
        handleTextareaChange={handleTextareaChange}
        handleAddTask={() => handleAddTask(inputValue, textareaValue)}
      />

      <Main
        kanbanBoardCategories={kanbanBoardCategories}
        tasks={tasks}
        handleInputChange={handleValueChange}
        mainInputValue={task.inputValue}
        handleTextareaChange={handleTextareaChange}
        mainTextareaValue={task.textareaValue}
        handleInputUpdate={handleInputUpdate}
        handleTextareaUpdate={handleTextareaUpdate}
        editModeInput={editModeInput}
        editModeTextArea={editModeTextArea}
      />
    </div>
  );
}

export default App;
