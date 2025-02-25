import React from "react";
import s from "./styles.module.css";

export default function TextArea(props) {
  const { handleChange, value, name } = props;
  return (
    <textarea
      className={s.textarea}
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      placeholder={name}
    ></textarea>
  );
}
