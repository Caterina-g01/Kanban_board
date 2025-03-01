import React from "react";
import s from "./styles.module.css";

export default function Input(props) {
  const {
    handleChange,
    value,
    name,
    className,
    handleUpdateTasksTitleOnBlur /* onKeyDown */,
  } = props;
  return (
    <input
      className={`${s.input} ${className}`}
      onChange={(event) => handleChange(event.target.value)}
      value={value}
      placeholder={name}
      onBlur={handleUpdateTasksTitleOnBlur}
      // onKeyDown={onKeyDown}
    />
  );
}
