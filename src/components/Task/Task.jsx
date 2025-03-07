import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
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
  deleteTask,
  handleUpdateTasksDescriptionOnEnter,
  handleUpdateTasksTitleOnEnter,
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  const [taskValue, setTaskValue] = useState(taskInputValue);
  const [descriptionValue, setDescriptionValue] = useState(taskTextareaValue);

  function updateTaskTitleValue(newValue) {
    setTaskValue(newValue);
  }

  function updateTaskDescriptionValue(newValue) {
    setDescriptionValue(newValue);
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={s.container}
    >
      <button onClick={deleteTask} className={s.btnDelete}>
        ✖️
      </button>
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
          onKeyDownInput={(e) => handleUpdateTasksTitleOnEnter(e, id)}
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
          onKeyDownTextarea={(e) => handleUpdateTasksDescriptionOnEnter(e, id)}
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
