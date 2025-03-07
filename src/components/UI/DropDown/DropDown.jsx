import React from "react";
import s from "./styles.module.css";

const DropDown = ({ onTaskSelect, selectedTask, tasks }) => {
  return (
    <select
      className={s.selector}
      value={selectedTask?.id || ""}
      onChange={(e) => {
        const selectedId = Number(e.target.value);
        const selectedTask = tasks.find((t) => t.id === selectedId);
        onTaskSelect(selectedTask);
      }}
    >
      <option value="" disabled>
        Choose task
      </option>
      {tasks.map((task) => (
        <option key={task.id} value={task.id}>
          {task.title}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
