import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import s from "./styles.module.css";
import Task from "../Task/Task";
import Button from "../UI/Button/Button";

export function TaskContainer({
  kanbanBoardCategories,
  tasks, // объект с задачами по категориям
  category, // конкретная категория, для которой рендерится колонка
  index, // индекс текущей категории в массиве
  handleEditTitleMode, // функция для включения режима редактирования заголовка
  handleEditDescriptionMode, // функция для включения режима редактирования описания
  editModeTaskTitle, // id задачи, у которой сейчас редактируется заголовок
  editModeTaskDescription, // id задачи, у которой сейчас редактируется описание
  handleUpdateTasksTitleOnBlur, // функция обновления заголовка при потере фокуса
  handleUpdateTasksDescriptionOnBlur, // функция обновления описания при потере фокуса
  deleteTask, // функция удаления задачи
  renderSelectorForColumn,
  renderAddTaskButton,
  id,
  setTasks,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    const activeCategory = active.data.current.categoryKey;
    const overCategory = over?.data.current.categoryKey;
    if (active.id !== over?.id) {
      console.log(active, over);
      setTasks((tasks) => {
        if (activeCategory === overCategory) {
          const categoryKey = activeCategory;

          const oldIndex = tasks[categoryKey].findIndex(
            (task) => task.id === active.id
          );
          const newIndex = tasks[categoryKey].findIndex(
            (task) => task.id === over.id
          );

          if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
            const updatedCategory = arrayMove(
              tasks[categoryKey],
              oldIndex,
              newIndex
            );
            return {
              ...tasks,
              [categoryKey]: updatedCategory,
            };
          }
        }

        return tasks;
      });
    }
  }

  return (
    <div
      // ref={setNodeRef}
      // style={style}
      key={category.key}
      className="taskContainer"
    >
      <h1 className="title">{category.title}</h1>
      <div className="content">
        {renderSelectorForColumn(
          category.key,
          kanbanBoardCategories[index - 1]?.key
        )}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={tasks[category.key]}
            strategy={verticalListSortingStrategy}
          >
            {tasks[category.key]?.map((task) => {
              return (
                <div key={task.id}>
                  <Task
                    categoryKey={category.key}
                    id={task.id}
                    taskInputValue={task?.title}
                    taskTextareaValue={task?.description}
                    handleEditTitleMode={handleEditTitleMode}
                    handleEditDescriptionMode={handleEditDescriptionMode}
                    isTitleEditing={editModeTaskTitle === task.id}
                    isDescriptionEditing={editModeTaskDescription === task.id}
                    handleUpdateTasksTitleOnBlur={handleUpdateTasksTitleOnBlur}
                    handleUpdateTasksDescriptionOnBlur={
                      handleUpdateTasksDescriptionOnBlur
                    }
                    deleteTask={() => deleteTask(task.id)}
                    handleUpdateTasksTitleOnEnter={(e, id) => {
                      if (e.key === "Enter") {
                        handleUpdateTasksTitleOnBlur(id);
                      }
                    }}
                    handleUpdateTasksDescriptionOnEnter={(e, id) => {
                      if (e.key === "Enter") {
                        handleUpdateTasksDescriptionOnBlur(id);
                      }
                    }}
                  />
                </div>
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
      {renderAddTaskButton(category.key)}
    </div>
  );
}
