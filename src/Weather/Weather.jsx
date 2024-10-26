import React, { useState, useEffect } from "react";
import style from "./Weather.module.scss";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const API_KEY = "a94d0a5ac08570add4b47b8da933f247";
const BASE_URL = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=${API_KEY}&units=metric`;

export default function Weather() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Ошибка: данные о погоде недоступны");
      }
      const weatherData = await response.json();
      setData(weatherData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherAnimation = (weather) => {
    switch (weather.toLowerCase()) {
      case "clear":
        return <div className={style.sunny}></div>;
      case "partly cloudy":
        return (
          <div className={style.partly_cloudy}>
            <div className={style.partly_cloudy__sun}></div>
            <div className={style.partly_cloudy__cloud}></div>
          </div>
        );
      case "clouds":
        return <div className={style.cloudy}></div>;
      case "rain":
        return (
          <div className={style.rainy}>
            <div className={style.rainy__cloud}></div>
            <div className={style.rainy__rain}></div>
          </div>
        );
      case "thunderstorm":
        return (
          <div className={style.thundery}>
            <div className={style.thundery__cloud}></div>
            <div className={style.thundery__rain}></div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderDailyForecast = () => {
    if (!data) return null;

    const dailyData = {};

    data.list.forEach((item) => {
      const date = item.dt_txt.slice(0, 10);
      if (!dailyData[date]) {
        dailyData[date] = {
          temp: Math.round(item.main.temp),
          weather: item.weather[0].main,
          times: [],
        };
      }
      dailyData[date].times.push(item);
    });

    return (
      <div className={style.forecast}>
        {Object.entries(dailyData).map(([date, { temp, weather, times }]) => (
          <div className={style.container} key={date}>
            <div className={style.containerTime}>
              <p>{format(new Date(date), "MMMM d", { locale: ru })}</p>
            </div>
            {getWeatherAnimation(weather)}
            <div>
              <p>{temp} °C</p>
            </div>
            <div className={style.hourlyForecast}>
              {times.map((item) => (
                <div className={style.hourlyItem} key={item.dt}>
                  <p>
                    {format(new Date(item.dt * 1000), "HH:mm", { locale: ru })}
                  </p>
                  {getWeatherAnimation(item.weather[0].main)}
                  <p>{Math.round(item.main.temp)} °C</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={style.weather}>
      <h2>Данные о погоде на ближайшие 5 дней</h2>
      {renderDailyForecast()}
    </div>
  );
}
