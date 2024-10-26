import React, { useEffect, useState } from "react";
import style from "./Profile.module.scss";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const data = await response.json();
      setUser(data);
      setFormData({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const savedAvatar = localStorage.getItem(`avatar_${userId}`);
      setAvatar(savedAvatar);
    };
    fetchUser();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password" && value.length < 5) {
      setPasswordError("Пароль должен содержать не менее 5 символов.");
    } else {
      setPasswordError("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result;
        setAvatar(newAvatar);

        const userId = localStorage.getItem("userId");
        localStorage.setItem(`avatar_${userId}`, newAvatar);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) return;

    const userId = localStorage.getItem("userId");
    const updatedUserData = {
      ...user,
      ...formData,
      avatar,
    };

    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });

    setUser(updatedUserData);
    setIsEditing(false);
  };

  if (!user) return <div>Загрузка...</div>;

  return (
    <div className={style.containerProfile}>
      <div className={style.profile}>
        <div className={style.image}>
          {avatar && (
            <img src={avatar} alt="Avatar" className={style.profile__avatar} />
          )}
          <label className={style.profile__imageLabel}>
            Загрузить изображение
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={style.profile__imageInput}
            />
          </label>
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Имя"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <div className={style.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Пароль"
              />
              <span
                className={`${style.passwordToggle} ${
                  showPassword ? style.visible : ""
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </span>
            </div>
            {passwordError && <p className={style.error}>{passwordError}</p>}
            <button type="submit">Сохранить</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Отменить
            </button>
          </form>
        ) : (
          <>
            <h2 className={style.profile__name}>{user.name}</h2>
            <p className={style.profile__email}>Email: {user.email}</p>
            <div className={style.passwordWrapper}>
              <p className={style.profile__password}>
                Пароль: {showPassword ? user.password : "*****"}
                <span
                  className={style.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </p>
            </div>
            <button
              onClick={handleEditClick}
              className={style.profile__editButton}
            >
              Редактировать профиль
            </button>
          </>
        )}
      </div>
    </div>
  );
}
