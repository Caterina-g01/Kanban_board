import { useState } from "react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import "./App.css";
import Header from "./components/Header/Header";
import Task from "./components/Task/Task";
import Button from "./components/UI/Button/Button";
import DropDown from "./components/UI/DropDown/DropDown";
import { getKanbanBoardCategory } from "./helpers/getKanbanBoardCategory";
import { TaskContainer } from "./components/TasksContainer/TasksContainer";

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
  const [isDropped, setIsDropped] = useState(false);

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
      (categoryKey === "finished" && tasks.review.length > 0)
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

  function renderSelectorForColumn(categoryKey, prevCategoryKey) {
    if (isDropDownVisible[categoryKey]) {
      return (
        <DropDown
          selectedTask={null}
          tasks={tasks[prevCategoryKey]}
          onTaskSelect={(selectedTask) =>
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
        {kanbanBoardCategories.map((category, index) => {
          return (
            <TaskContainer
              key={category.key}
              kanbanBoardCategories={kanbanBoardCategories}
              tasks={tasks}
              category={category}
              index={index}
              handleEditTitleMode={handleEditTitleMode}
              handleEditDescriptionMode={handleEditDescriptionMode}
              editModeTaskTitle={editModeTaskTitle}
              editModeTaskDescription={editModeTaskDescription}
              handleUpdateTasksTitleOnBlur={handleUpdateTasksTitleOnBlur}
              handleUpdateTasksDescriptionOnBlur={
                handleUpdateTasksDescriptionOnBlur
              }
              deleteTask={deleteTask}
              renderSelectorForColumn={renderSelectorForColumn}
              renderAddTaskButton={renderAddTaskButton}
              id={category.key}
              setTasks={setTasks}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
