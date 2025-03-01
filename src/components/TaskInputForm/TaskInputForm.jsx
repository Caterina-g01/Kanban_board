import React, { useState } from "react";
import s from "./styles.module.css";
import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
import Button from "../UI/Button/Button";

export default function TaskInputForm({
  inputValue,
  handleValueChange,
  textareaValue,
  handleTextareaChange,
  handleAddTask,
}) {
  return (
    <div className={s.container}>
      <Input
        value={inputValue}
        handleChange={handleValueChange}
        name="Task's name"
        className={s.input}
      />
      <TextArea
        value={textareaValue}
        handleChange={handleTextareaChange}
        name="Task's description"
        className={s.textarea}
      />
      <Button
        children="Add Task"
        className={s.btn}
        onClick={() => handleAddTask()}
      />
    </div>
  );
}
