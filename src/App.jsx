import { useState } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import Task from "./components/Task/Task";
import Button from "./components/UI/Button/Button";
import DropDown from "./components/UI/DropDown/DropDown";
import { getKanbanBoardCategory } from "./helpers/getKanbanBoardCategory";

function App() {
  const kanbanBoardCategories = getKanbanBoardCategory();
  const initialState = kanbanBoardCategories.reduce((acc, column) => {
    acc[column.key] = [];
    return acc;
  }, {});

  const [tasks, setTasks] = useState(initialState);
  const [editModeTaskTitle, setEditModeTaskTitle] = useState(null);
  const [editModeTaskDescription, setEditModeTaskDescription] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [isDropDownVisible, setIsDropDownVisible] = useState({
    inProgress: false,
    review: false,
    finished: false,
  });

  function handleInputChange(newValue) {
    setInputValue(newValue);
  }

  function handleTextareaChange(newValue) {
    setTextareaValue(newValue);
  }

  function handleAddTask() {
    if (inputValue.trim() === "" || textareaValue.trim() === "") {
      return;
    }
    const newTask = {
      id: Date.now(),
      title: inputValue,
      description: textareaValue,
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      backlog: [...prevTasks.backlog, newTask],
    }));

    setInputValue("");
    setTextareaValue("");
  }

  function handleMoveTaskToColumn(task, newColumnKey) {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      for (const columnKey in updatedTasks) {
        updatedTasks[columnKey] = updatedTasks[columnKey].filter(
          (t) => t.id !== task.id
        );
      }

      updatedTasks[newColumnKey] = [...updatedTasks[newColumnKey], task];

      return updatedTasks;
    });

    setIsDropDownVisible((prevState) => ({
      ...prevState,
      [newColumnKey]: false,
    }));
  }

  function deleteTask(id) {
    setTasks((prevTasks) => {
      const updatedTasks = {};
      for (const key in prevTasks) {
        updatedTasks[key] = prevTasks[key].filter((task) => task.id !== id);
      }
      return updatedTasks;
    });
  }

  function handleEditTitleMode(id) {
    setEditModeTaskTitle(id);
  }

  function handleEditDescriptionMode(id) {
    setEditModeTaskDescription(id);
  }

  function handleUpdateTasksTitleOnBlur() {
    setEditModeTaskTitle(null);
  }

  function handleUpdateTasksDescriptionOnBlur() {
    setEditModeTaskDescription(null);
  }

  function renderAddTaskButton(categoryKey) {
    if (categoryKey === "backlog") return null;
    if (
      (categoryKey === "inProgress" && tasks.backlog.length > 0) ||
      (categoryKey === "review" && tasks.inProgress.length > 0) ||
      (categoryKey === "done" && tasks.review.length > 0)
    )
      return (
        <Button
          onClick={() => handleAddSelectorForColumn(categoryKey)}
          className="btn"
          children="Add Task"
        />
      );
  }

  function handleAddSelectorForColumn(categoryKey) {
    setIsDropDownVisible({ ...isDropDownVisible, [categoryKey]: true });
  }

  function renderSelectorForColumn(categoryKey) {
    if (isDropDownVisible[categoryKey]) {
      return (
        <DropDown
          selectedTask={null}
          tasks={tasks.backlog}
          onChange={(selectedTask) =>
            handleMoveTaskToColumn(selectedTask, categoryKey)
          }
        />
      );
    }
    return null;
  }

  return (
    <div className="container">
      <Header
        inputValue={inputValue}
        handleValueChange={handleInputChange}
        textareaValue={textareaValue}
        handleTextareaChange={handleTextareaChange}
        handleAddTask={() => handleAddTask(inputValue, textareaValue)}
        onKeyDownInput={(e) => {
          if (e.key === "Enter") {
            handleAddTask(inputValue, textareaValue);
          }
        }}
        onKeyDownTextarea={(e) => {
          if (e.key === "Enter") {
            handleAddTask(inputValue, textareaValue);
          }
        }}
      />

      <div className="mainContainer">
        {kanbanBoardCategories.map((category) => {
          return (
            <div key={category.key} className="taskContainer">
              <h1 className="title">{category.title}</h1>
              <div className="content">
                {renderSelectorForColumn(category.key)}
                {tasks[category.key]?.map((task) => {
                  return (
                    <div key={task.id}>
                      <Task
                        id={task.id}
                        taskInputValue={task?.title}
                        taskTextareaValue={task?.description}
                        handleEditTitleMode={handleEditTitleMode}
                        handleEditDescriptionMode={handleEditDescriptionMode}
                        isTitleEditing={editModeTaskTitle === task.id}
                        isDescriptionEditing={
                          editModeTaskDescription === task.id
                        }
                        handleUpdateTasksTitleOnBlur={
                          handleUpdateTasksTitleOnBlur
                        }
                        handleUpdateTasksDescriptionOnBlur={
                          handleUpdateTasksDescriptionOnBlur
                        }
                        deleteTask={() => deleteTask(task.id)}
                        handleUpdateTasksTitleOnEnter={(e, id) => {
                          if (e.key === "Enter") {
                            handleUpdateTasksTitleOnBlur(id);
                          }
                        }}
                        handleUpdateTasksDescriptionOnEnter={(e, id) => {
                          if (e.key === "Enter") {
                            handleUpdateTasksDescriptionOnBlur(id);
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              {renderAddTaskButton(category.key)}
              {/* <Button className="btn" children="Add Task" /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
