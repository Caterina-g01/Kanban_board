import React from "react";
import s from "./styles.module.css";
import Task from "../Task/Task";
import Button from "../UI/Button/Button";

export default function TasksContainer({
  title,
  tasks,
  columnKey,
  handleInputUpdate,
  handleTextareaUpdate,
  isInputEditing,
  isTextareaEditing,
  handleInputChange,
  mainInputValue,
  handleTextareaChange,
  mainTextareaValue,
}) {
  // console.log(columnKey);
  return (
    <div className={s.container}>
      <h1 className={s.title}>{title}</h1>
      {tasks[columnKey]?.map((task, index) => {
        return (
          <>
            <Task
              key={task.id || index}
              handleInputChange={handleInputChange}
              mainInputValue={mainInputValue}
              handleTextareaChange={handleTextareaChange}
              mainTextareaValue={mainTextareaValue}
              handleInputUpdate={handleInputUpdate}
              handleTextareaUpdate={handleTextareaUpdate}
              isInputEditing={isInputEditing}
              isTextareaEditing={isTextareaEditing}
            />
          </>
        );
      })}

      <Button className={s.btn} children="Add Task" />
    </div>
  );
}
