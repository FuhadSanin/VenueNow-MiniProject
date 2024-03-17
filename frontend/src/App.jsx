import React from "react"
import CalendarInterface from "./Components/Calendar/Calendar-Interface.jsx"
import Description from "./Components/About/About.jsx"
import { Routes, Route } from "react-router-dom"
import SignUp from "./Components/SignUp/SignUp.jsx"

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "75%",
        }}
      >
        <Routes>
          <Route exact path="/" element={<CalendarInterface />} />
          <Route path="/sign" element={<SignUp />} />
        </Routes>
      </div>
      <div style={{ width: "25%" }}>
        <Description />
      </div>
    </div>
  )
}

export default App
