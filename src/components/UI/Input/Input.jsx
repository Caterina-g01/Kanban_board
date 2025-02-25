import React from "react";
import s from "./styles.module.css";

export default function Input(props) {
  const { handleChange, value, name /* handleBlur, onKeyDown */ } = props;
  return (
    <input
      className={s.input}
      onChange={(event) => handleChange(event.target.value)}
      value={value}
      placeholder={name}
      // onBlur={handleBlur}
      // onKeyDown={onKeyDown}
    />
  );
}
