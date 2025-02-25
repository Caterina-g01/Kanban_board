import React from "react";
import TasksContainer from "../TasksContainer/TasksContainer";
import s from "./styles.module.css";

export default function Main({
  kanbanBoardCategories,
  tasks,
  handleInputChange,
  mainInputValue,
  handleTextareaChange,
  mainTextareaValue,
  handleInputUpdate,
  handleTextareaUpdate,
  editModeInput,
  editModeTextArea,
}) {
  return (
    <div className={s.container}>
      {kanbanBoardCategories.map((category) => (
        <TasksContainer
          title={category.title}
          key={category.key}
          tasks={tasks}
          columnKey={category.key}
          handleInputChange={handleInputChange}
          mainInputValue={mainInputValue}
          handleTextareaChange={handleTextareaChange}
          mainTextareaValue={mainTextareaValue}
          handleInputUpdate={handleInputUpdate}
          handleTextareaUpdate={handleTextareaUpdate}
          isInputEditing={editModeInput}
          isTextareaEditing={editModeTextArea}
        />
      ))}
    </div>
  );
}
