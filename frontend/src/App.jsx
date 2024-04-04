import React from "react";
import CalendarInterface from "./Components/Calendar/Calendar-Interface.jsx";
import About from "./Components/About/About.jsx";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp.jsx";
import Welcome from "./Components/Welcome/Welcome.jsx";

function App() {
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100vh",
    //     width: "100vw",
    //   }}
    // >
    //   <div style={{ width: "25%" }}>
    <div style={{ width: "100%", height: "100vh" }}>
      <About />
    </div>
    //   </div>
    //   <div
    //     style={{
    //       width: "75%",
    //     }}
    //   >
    //     <Routes>
    //       <Route exact path="/" element={<CalendarInterface />} />
    //       <Route path="/sign" element={<SignUp />} />
    //     </Routes>
    //   </div>
    // </div>
  );
}

export default App;
