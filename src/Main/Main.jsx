import React from "react";
import style from "./Main.module.scss";

export default function Main({ activeComponent, isDayTheme }) {
  return (
    <div
      className={`${style.mainContent} ${isDayTheme ? style.day : style.night}`}
    >
      {activeComponent}
    </div>
  );
}
