import React from "react";
import s from "./styles.module.css";

export default function Input(props) {
  const {
    handleChange,
    value,
    name,
    className,
    handleUpdateTasksTitleOnBlur,
    onKeyDownInput,
  } = props;
  return (
    <input
      className={`${s.input} ${className}`}
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      placeholder={name}
      onBlur={handleUpdateTasksTitleOnBlur}
      onKeyDown={onKeyDownInput}
      onPointerDown={(e) => e.stopPropagation()}
    />
  );
}
