import React, { useState, useEffect } from "react";
import style from "./Home.module.scss";
import HomePage from "../HomePage/HomePage";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Main from "../Main/Main";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState(<HomePage />);
  const [isDayTheme, setIsDayTheme] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const savedTheme = localStorage.getItem(`theme_${userId}`);
    if (savedTheme) {
      setIsDayTheme(savedTheme === "day");
    }
  }, []);

  return (
    <div className={style.container}>
      <Header isDayTheme={isDayTheme} setIsDayTheme={setIsDayTheme} />
      <div className={style.containerContent}>
        <Menu setActiveComponent={setActiveComponent} />
        <Main activeComponent={activeComponent} isDayTheme={isDayTheme} />
      </div>
    </div>
  );
}
