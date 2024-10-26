import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Menu.module.scss";
import Archive from "../Archive/Archive";
import Calendar from "../Calendar/Calendar";
import Profile from "../Profile/Profile";
import ToDoList from "../ToDoList/ToDoList";
import HomePage from "../HomePage/HomePage";
import Weather from "../Weather/Weather";

export default function Menu({ setActiveComponent }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (component) => {
    setActiveComponent(component);
    setIsOpen(false);
  };

  return (
    <div className={`${style.menuContainer} ${isOpen ? style.open : ""}`}>
      <menu className={`${isOpen ? style.open : ""}`}>
        <div className={style.list}>
          <div className={style.listMenu}>
            <div className={style.burger} onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
              {isOpen && <span>Меню</span>}
            </div>
            <div
              className={style.container}
              onClick={() => {
                handleMenuClick(<HomePage />);
              }}
            >
              <i className="fas fa-home"></i>
              {isOpen && <span>Главная страница</span>}
            </div>
            <div
              className={style.container}
              onClick={() => {
                handleMenuClick(<ToDoList />);
              }}
            >
              <i className="fas fa-list"></i>
              {isOpen && <span>Список дел</span>}
            </div>
            <div
              className={style.container}
              onClick={() => {
                handleMenuClick(<Weather />);
              }}
            >
              <i className="fas fa-cloud-sun"></i>
              {isOpen && <span>Погода</span>}
            </div>
            <div
              className={style.container}
              onClick={() => {
                handleMenuClick(<Calendar />);
              }}
            >
              <i className="fas fa-calendar-alt"></i>
              {isOpen && <span>Календарь</span>}
            </div>
            <div
              className={style.container}
              onClick={() => {
                handleMenuClick(<Archive />);
              }}
            >
              <i className="fas fa-archive"></i>
              {isOpen && <span>Архив</span>}
            </div>
            <div
              className={style.container}
              onClick={() => {
                handleMenuClick(<Profile />);
              }}
            >
              <i className="fas fa-user"></i>
              {isOpen && <span>Профиль</span>}
            </div>
          </div>
          <div className={style.listExit}>
            <div className={style.container} onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              {isOpen && <span className={style.containerExit}>Выйти</span>}
            </div>
          </div>
        </div>
      </menu>
    </div>
  );
}
