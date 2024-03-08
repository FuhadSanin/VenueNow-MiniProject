import React from "react"
import CalendarInterface from "./Components/Calendar-Interface"

const App = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div style={{ height: "100vh", width: "70%" }}>
        <CalendarInterface />
      </div>
      <div
        style={{
          height: "100vh",
          width: "30%",
          backgroundColor: "black",
          color: "whitesmoke",
        }}
      >
        Description
      </div>
    </div>
  )
}

export default App
