import React, { useState } from "react";
import s from "./styles.module.css";
import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";

export default function Task({
  handleEditTitleMode,
  handleEditDescriptionMode,
  isTitleEditing,
  isDescriptionEditing,
  taskInputValue,
  taskTextareaValue,
  id,
  handleUpdateTasksTitleOnBlur,
  handleUpdateTasksDescriptionOnBlur,
}) {
  const [taskValue, setTaskValue] = useState(taskInputValue);
  const [descriptionValue, setDescriptionValue] = useState(taskTextareaValue);
  console.log(taskValue);
  function updateTaskTitleValue(newValue) {
    setTaskValue(newValue);
  }

  function updateTaskDescriptionValue(newValue) {
    setDescriptionValue(newValue);
  }
  return (
    <div className={s.container}>
      <button className={s.btnDelete}>✖️</button>
      {renderTaskTitleEditMode()}
      {renderTaskDescriptionEditMode()}
    </div>
  );

  function renderTaskTitleEditMode() {
    if (isTitleEditing) {
      return (
        <Input
          className={s.input}
          handleChange={updateTaskTitleValue}
          value={taskValue}
          name=""
          handleUpdateTasksTitleOnBlur={() => handleUpdateTasksTitleOnBlur(id)}
        />
      );
    }
    return (
      <div onClick={() => handleEditTitleMode(id)} className={s.taskTitle}>
        {taskValue}
      </div>
    );
  }

  function renderTaskDescriptionEditMode() {
    if (isDescriptionEditing) {
      return (
        <TextArea
          className={s.textarea}
          handleChange={updateTaskDescriptionValue}
          value={descriptionValue}
          name=""
          handleUpdateTasksDescriptionOnBlur={() =>
            handleUpdateTasksDescriptionOnBlur(id)
          }
        />
      );
    }
    return (
      <div
        onClick={() => handleEditDescriptionMode(id)}
        className={s.taskDescription}
      >
        {descriptionValue}
      </div>
    );
  }
}
