import React from "react";
import s from "./styles.module.css";

export default function TextArea(props) {
  const {
    handleChange,
    value,
    name,
    className,
    handleUpdateTasksDescriptionOnBlur,
    onKeyDownTextarea,
    onPointerDownTextArea,
  } = props;
  return (
    <textarea
      className={`${s.textarea} ${className}`}
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      placeholder={name}
      onBlur={handleUpdateTasksDescriptionOnBlur}
      onKeyDown={onKeyDownTextarea}
      onPointerDown={onPointerDownTextArea}
    />
  );
}
