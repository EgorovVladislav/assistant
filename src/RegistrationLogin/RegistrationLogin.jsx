import React, { useEffect, useState } from "react";
import style from "./RegistrationLogin.module.scss";
import { useNavigate } from "react-router-dom";

export default function RegistrationLogin() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async (event) => {
    event.preventDefault();
    const userData = { name, email, password };

    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    const existingUser = data.find((user) => user.email === email);

    if (existingUser) {
      setErrorMessage("Пользователь с таким email уже существует.");
      return;
    }

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("userId", data.id);
        navigate("/home");
      })
      .catch((err) => console.error(err));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        const user = data.find(
          (user) => user.email === emailLogin && user.password === passwordLogin
        );
        if (user) {
          localStorage.setItem("userId", user.id);
          navigate("/home");
        } else {
          setErrorMessage("Неправильный email или пароль!");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleFocus = () => {
    setErrorMessage("");
  };

  return (
    <div
      className={`${style.container} ${isSignUp ? style.rightPanelActive : ""}`}
    >
      <div className={`${style.formContainer} ${style.signUpContainer}`}>
        <form onSubmit={handleRegistration}>
          <h1>Регистрация</h1>
          {errorMessage && <p className={style.error}>{errorMessage}</p>}
          <div className={style.socialContainer}>
            <a href="#" className={style.social}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className={style.social}>
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className={style.social}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>Используйте свой E-mail для регистрации</span>
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(event) => setName(event.target.value)}
            onFocus={handleFocus}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(event) => setEmail(event.target.value)}
            onFocus={handleFocus}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
            onFocus={handleFocus}
          />
          <button type="submit" className={style.registration}>
            Зарегистрироваться
          </button>
        </form>
      </div>
      <div className={`${style.formContainer} ${style.signInContainer}`}>
        <form onSubmit={handleLogin}>
          <h1>Авторизация</h1>
          {errorMessage && <p className={style.error}>{errorMessage}</p>}
          <div className={style.socialContainer}>
            <a href="#" className={style.social}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className={style.social}>
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className={style.social}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>Используйте свой аккаунт</span>
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => setEmailLogin(event.target.value)}
            onFocus={handleFocus}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPasswordLogin(event.target.value)}
            onFocus={handleFocus}
          />
          <a href="#">Забыли пароль?</a>
          <button type="submit" className={style.entrance}>
            Вход
          </button>
        </form>
      </div>
      <div className={style.overlayContainer}>
        <div className={style.overlay}>
          <div
            className={`${style.overlayPanel} ${
              isSignUp ? style.overlayRight : style.overlayLeft
            }`}
          >
            <h1>Добро пожаловать!</h1>
            <p>
              Чтобы оставаться на связи с нами, пожалуйста, войдите в систему с
              вашей личной информацией
            </p>
            <button
              className={style.ghost}
              onClick={toggleForm}
              onFocus={handleFocus}
            >
              Авторизация
            </button>
          </div>
          <div
            className={`${style.overlayPanel} ${
              isSignUp ? style.overlayLeft : style.overlayRight
            }`}
          >
            <h1>Привет, Друг!</h1>
            <p>
              Введите свои личные данные и начните путешествие вместе с нами
            </p>
            <button
              className={style.ghost}
              onClick={toggleForm}
              onFocus={handleFocus}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
