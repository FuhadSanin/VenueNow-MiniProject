import React, { useState, useEffect } from "react"
import About from "./Components/About/About.jsx"
import BarLoader from "react-spinners/BarLoader"
import "./App.css"
import { nav_log } from "./Assets/index.js"

function App() {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  return (
    <div>
      {loading ? (
        <div class="App">
          <img src={nav_log} alt="" />
          <p className="text-warning text-white">VenuNow</p>
          <BarLoader
            color={"#FFFFFF"}
            loading={loading}
            size={30}
            height={5}
            width={150}
          />
        </div>
      ) : (
        <About />
      )}
    </div>
  )
}

export default App
