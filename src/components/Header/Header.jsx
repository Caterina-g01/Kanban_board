import React, { useState } from "react";
import s from "./styles.module.css";
import TaskInputForm from "../TaskInputForm/TaskInputForm";

export default function Header({
  inputValue,
  handleValueChange,
  textareaValue,
  handleTextareaChange,
  handleAddTask,
}) {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.titleContainer}>
          <h1 className={s.title}>
            <span className={s.titleKanban}>Kanban </span>
            <br />
            <span className={s.titleBoard}>Board</span>
          </h1>
          <p>
            Kanban board helps visualize tasks, track progress, and manage
            workflow efficiently. This project, built with JavaScript, provides
            a simple and interactive way to organize tasks.
          </p>
        </div>
        <TaskInputForm
          inputValue={inputValue}
          handleValueChange={handleValueChange}
          textareaValue={textareaValue}
          handleTextareaChange={handleTextareaChange}
          handleAddTask={handleAddTask}
        />
      </div>
    </div>
  );
}
