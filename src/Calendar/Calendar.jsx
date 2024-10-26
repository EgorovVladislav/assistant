import React, { useState, useEffect } from "react";
import style from "./Calendar.module.scss";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isToday,
} from "date-fns";

export default function Calendar() {
  const userId = localStorage.getItem("userId") || "defaultUser  ";

  const [notes, setNotes] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem(`notes_${userId}`));
    return savedNotes || {};
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(`notes_${userId}`, JSON.stringify(notes));
  }, [notes, userId]);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const firstDayOfMonth = startOfMonth(currentDate);
  const emptyDays = Array(firstDayOfMonth.getDay()).fill(null);
  const allDays = [...emptyDays, ...daysInMonth];

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSaveNote = () => {
    if (!selectedDate) {
      setErrorMessage("Пожалуйста, выберите дату для заметки.");
      return;
    }
    if (!note.trim()) {
      setErrorMessage("Заметка не может быть пустой.");
      return;
    }

    const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");

    setNotes((prevNotes) => ({
      ...prevNotes,
      [formattedDate]: [...(prevNotes[formattedDate] || []), note],
    }));
    setNote("");
    setSelectedDate(null);
    setErrorMessage("");
  };

  const handleDayClick = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(formattedDate);
    setNote("");
    setErrorMessage("");
  };

  const handleDeleteNote = (date, index) => {
    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    const updatedNotes = notes[formattedDate].filter((_, i) => i !== index);

    if (updatedNotes.length === 0) {
      const { [formattedDate]: _, ...rest } = notes;
      setNotes(rest);
    } else {
      setNotes((prevNotes) => ({
        ...prevNotes,
        [formattedDate]: updatedNotes,
      }));
    }
  };

  const today = format(new Date(), "dd.MM.yyyy");

  return (
    <div className={style.calendar}>
      <div className={style.header}>
        <select
          value={currentDate.getMonth()}
          onChange={(e) =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), e.target.value, 1)
            )
          }
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {format(new Date(currentDate.getFullYear(), i), "MMMM")}
            </option>
          ))}
        </select>
        <select
          value={currentDate.getFullYear()}
          onChange={(e) =>
            setCurrentDate(new Date(e.target.value, currentDate.getMonth(), 1))
          }
        >
          {Array.from({ length: 20 }, (_, i) => (
            <option key={i} value={currentDate.getFullYear() - 10 + i}>
              {currentDate.getFullYear() - 10 + i}
            </option>
          ))}
        </select>
        <span className={style.todayDate}>Сегодня: {today}</span>
      </div>
      <div className={style.weekdays}>
        {["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"].map((day) => (
          <div key={day} className={style.weekday}>
            {day}
          </div>
        ))}
      </div>
      <div className={style.days}>
        {allDays.map((date, index) => {
          if (!date) {
            return (
              <div
                key={index}
                className={`${style.day} ${style.emptyDay}`}
              ></div>
            );
          }

          const formattedDate = format(date, "yyyy-MM-dd");
          const noteCount = notes[formattedDate]
            ? notes[formattedDate].length
            : 0;
          const hasNotes = noteCount > 0;
          const isTodayFlag = isToday(date);

          return (
            <div
              key={date}
              className={`${style.day} ${hasNotes ? style.withNotes : ""} ${
                isTodayFlag ? style.today : ""
              }`}
              onClick={() => handleDayClick(date)}
            >
              <p>{format(date, "d")}</p>
              <div className={style.weekdayName}>{format(date, "EEEE")}</div>
              <p className={style.noteCount}>{noteCount} заметок</p>
            </div>
          );
        })}
      </div>
      <div className={style.noteSection}>
        <div className={style.noteAdd}>
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Добавить заметку..."
            className={style.noteInput}
          />
          {errorMessage && (
            <div className={style.errorMessage}>{errorMessage}</div>
          )}
          <button onClick={handleSaveNote}>Сохранить</button>
        </div>

        {selectedDate && (
          <div className={style.notesDisplay}>
            <h3>Заметки на {format(new Date(selectedDate), "dd.MM.yyyy")}</h3>
            {notes[selectedDate] && notes[selectedDate].length > 0 ? (
              notes[selectedDate].map((note, index) => (
                <div key={index} className={style.noteDisplay}>
                  {note}
                  <button
                    onClick={() => handleDeleteNote(selectedDate, index)}
                    className={style.deleteButton}
                  >
                    Удалить
                  </button>
                </div>
              ))
            ) : (
              <div>Нет заметок</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
