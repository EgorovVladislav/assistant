import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import style from "./HomePage.module.scss";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function HomePage() {
  const userId = localStorage.getItem("userId") || "defaultUser   ";

  const [taskData, setTaskData] = useState({ labels: [], counts: [] });
  const [noteData, setNoteData] = useState({ labels: [], counts: [] });

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`)) || [];
    const completedTasks =
      JSON.parse(localStorage.getItem(`completedTasks_${userId}`)) || [];

    setTaskData({
      labels: ["Всего задач", "Выполненные задачи"],
      counts: [tasks.length, completedTasks.length],
    });

    const notes = JSON.parse(localStorage.getItem(`notes_${userId}`)) || {};
    const noteLabels = Object.keys(notes);
    const noteCounts = noteLabels.map((date) => notes[date].length);

    setNoteData({
      labels: noteLabels,
      counts: noteCounts,
    });
  }, [userId]);

  const taskChartData = {
    labels: taskData.labels,
    datasets: [
      {
        label: "Количество задач",
        data: taskData.counts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const noteChartData = {
    labels: noteData.labels,
    datasets: [
      {
        label: "Количество заметок",
        data: noteData.counts,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, 
        },
      },
    },
  };

  return (
    <div className={style.homePage}>
      <h1>Главная страница</h1>
      <div className={style.homeContainer}>
        <div className={style.chartContainer}>
          <h2>График задач</h2>
          <Line data={taskChartData} options={options} />
        </div>

        <div className={style.chartContainer}>
          <h2>График заметок</h2>
          <Line data={noteChartData} options={options} />
        </div>
      </div>
    </div>
  );
}
