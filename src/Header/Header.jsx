import React, { useEffect, useState } from "react";
import style from "./Header.module.scss";

export default function Header({ isDayTheme, setIsDayTheme }) {
  const userId = localStorage.getItem("userId");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString();
  const formatDate = (date) => date.toLocaleDateString();

  const toggleTheme = () => {
    const newTheme = !isDayTheme;
    setIsDayTheme(newTheme);
    localStorage.setItem(`theme_${userId}`, newTheme ? "day" : "night");
  };

  return (
    <div className={style.header}>
      <p>Время: {formatTime(currentDateTime)}</p>
      <button onClick={toggleTheme} className={style.themeToggle}>
        <i className={`fas ${isDayTheme ? "fa-sun" : "fa-moon"}`} />
      </button>
      <p>Дата: {formatDate(currentDateTime)}</p>
    </div>
  );
}
