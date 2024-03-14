import React from "react"
import CalendarInterface from "./Components/Calendar/Calendar-Interface.jsx"
function App() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div style={{ height: "100vh", width: "75%" }}>
        <CalendarInterface />
      </div>
      <div
        style={{
          height: "100vh",
          width: "25%",
          backgroundColor: "#F8F8F2",
          color: "whitesmoke",
        }}
      >
        <div className="content"></div>
        Description
      </div>
    </div>
  )
}

export default App
