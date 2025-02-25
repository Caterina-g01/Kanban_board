import React from "react";
import s from "./styles.module.css";
import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";

export default function Task({
  handleInputUpdate,
  handleTextareaUpdate,
  isInputEditing,
  isTextareaEditing,
  handleInputChange,
  mainInputValue,
  handleTextareaChange,
  mainTextareaValue,
}) {
  return (
    <div className={s.container}>
      {isInputEditing ? (
        <>
          <Input
            handleChange={handleInputChange}
            value={mainInputValue}
            name=""
          />
        </>
      ) : (
        <>
          <div onClick={handleInputUpdate} className={s.taskTitle}>
            {mainInputValue}
          </div>
        </>
      )}

      {isTextareaEditing ? (
        <>
          <TextArea
            handleChange={handleTextareaChange}
            value={mainTextareaValue}
            name=""
          />
        </>
      ) : (
        <>
          <div onClick={handleTextareaUpdate} className={s.taskDescription}>
            {mainTextareaValue}
          </div>
        </>
      )}
    </div>
  );
}
