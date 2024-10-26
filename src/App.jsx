import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationLogin from "./RegistrationLogin/RegistrationLogin";
import Home from "./Home/Home";
import style from "./App.module.scss";

function App() {
  return (
    <div className={style.container}>
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationLogin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
