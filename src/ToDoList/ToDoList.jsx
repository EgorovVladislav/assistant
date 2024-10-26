import React, { useState, useEffect } from "react";
import style from "./ToDoList.module.scss";

export default function ToDoList() {
  const userId = localStorage.getItem("userId") || "defaultUser ";

  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_${userId}`));
    return savedTasks || [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = JSON.parse(
      localStorage.getItem(`completedTasks_${userId}`)
    );
    return savedCompletedTasks || [];
  });

  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
    localStorage.setItem(
      `completedTasks_${userId}`,
      JSON.stringify(completedTasks)
    );
  }, [tasks, completedTasks, userId]);

  const handleAddTask = () => {
    if (inputValue.trim()) {
      if (editIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === editIndex ? inputValue : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks((prevTasks) => {
          const updatedTasks = [...prevTasks, inputValue];
          return updatedTasks;
        });
      }
      setInputValue("");
    }
  };

  const handleEditTask = (index) => {
    setInputValue(tasks[index]);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (index) => {
    const taskToComplete = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setCompletedTasks((prevCompleted) => [...prevCompleted, taskToComplete]);
  };

  const handleDeleteCompletedTask = (index) => {
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <div className={style.toDoList}>
      <div className={style.title}>
        <h2>Список дел/задач</h2>
      </div>
      <div className={style.taskMenu}>
        <div className={style.taskProgress}>
          <h3>Список</h3>
          <div className={style.task}>
            <input
              className={style.taskList}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Введите задачу"
            />
            <button className={style.taskAdd} onClick={handleAddTask}>
              {editIndex !== null ? "Сохранить" : "Добавить"}
            </button>
          </div>
          <ul className={style.container}>
            {tasks.map((task, index) => (
              <li key={index} className={style.containerList}>
                {task}
                <div className={style.containerBtn}>
                  <button onClick={() => handleCompleteTask(index)}>
                    <i className="fas fa-check"></i>
                  </button>
                  <button onClick={() => handleEditTask(index)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDeleteTask(index)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.taskCompleted}>
          <h3>Выполненные задачи</h3>
          <ul className={style.container}>
            {completedTasks.map((task, index) => (
              <li key={index} className={style.containerList}>
                {task}
                <button onClick={() => handleDeleteCompletedTask(index)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
