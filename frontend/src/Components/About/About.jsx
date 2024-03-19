import React, { useState, useEffect } from "react"
import "./About.css"
import { Link, useNavigate, Routes, Route } from "react-router-dom"
import { toast } from "react-toastify"
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai"
import { IoReorderThreeOutline } from "react-icons/io5"
import { BiNotepad } from "react-icons/bi"
import { SlCalender } from "react-icons/sl"
import { PiCalendarCheckFill } from "react-icons/pi"
import { IoMdAdd } from "react-icons/io"
import CalendarInterface from "../Calendar/Calendar-Interface"
import SignUp from "../SignUp/SignUp"
import { ieee, iedc, nss, arc, logo } from "../../Assets"

const LOCAL_STORAGE_KEY = "loginuser"

function About() {
  const navigate = useNavigate()
  const [showNav, setShowNav] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)

  const [authenticated, setAuthenticated] = useState(false)
  const [loginuser, setLoginUser] = useState(null)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleNavbar = () => {
    setShowNav(!showNav)
    const bodypd = document.getElementById("body-pd")
    const headerpd = document.getElementById("header")
    if (bodypd && headerpd) {
      bodypd.classList.toggle("body-pd")
      headerpd.classList.toggle("body-pd")
    }
  }

  const setActiveLink = e => {
    const links = document.querySelectorAll(".nav_link")
    links.forEach(link => link.classList.remove("active"))
    e.target.classList.add("active")
  }

  useEffect(() => {
    const storedLoginUser = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedLoginUser) {
      setLoginUser(JSON.parse(storedLoginUser))
    } else {
      setLoginUser(null)
    }
  }, [loginuser])

  useEffect(() => {
    if (loginuser !== null) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loginuser))
    }
  }, [loginuser])

  const handleSignOut = () => {
    const shouldSignOut = window.confirm("Are you sure you want to sign out?")
    if (shouldSignOut) {
      toast.success("You have been signed out successfully!")
      setLoginUser(null)
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      navigate("/sign")
    } else {
      toast.info("Sign out canceled.")
    }
  }

  return (
    <div id="body-pd">
      <header className="header" id="header">
        <div className="header_toggle" onClick={toggleNavbar}>
          <IoReorderThreeOutline />
        </div>
        {loginuser ? (
          <p onClick={handleSignOut}>Logout, {loginuser}</p>
        ) : (
          <Link to={"/sign"}>Sign In to book events</Link>
        )}
        <div className="header_img">
          <img src={logo} alt="" />
        </div>
      </header>
      <div className={`l-navbar ${showNav ? "show" : ""}`} id="nav-bar">
        <nav className="nav">
          <div>
            <a href="#" className="nav_link">
              <PiCalendarCheckFill />
              <span className="nav_logo-name">Venue Now</span>
            </a>
            <div className="nav_list">
              <Link to={"/sign"} className="nav_link" onClick={setActiveLink}>
                <IoMdAdd />
                <span className="nav_logo-name">Add an Event</span>
              </Link>
              <a
                className="nav_link"
                onClick={toggleCollapse}
                aria-expanded={!isCollapsed}
                aria-controls="collapseExample"
              >
                <BiNotepad />
                <span className="nav_name">Instructions</span>
              </a>
              <a
                className={`collapse ${isCollapsed ? "" : "show"}`}
                id="collapseExample"
              >
                <div className="card card-body">
                  <span>
                    1.The calendar on the sidebar exhibits the events booked for
                    a specific day and time.
                  </span>

                  <br />
                  <span>
                    2.Click day button to view events and timings for that day.
                  </span>

                  <br />
                  <span>
                    3.Selecting the "Agenda" option provides access to all
                    bookings.
                  </span>

                  <br />
                  <span>
                    4.Login is available only for student and staff
                    coordinators.
                  </span>
                </div>
              </a>
              <Link to={"/"} className="nav_link" onClick={setActiveLink}>
                <SlCalender />
                <span className="nav_name">Calendar</span>
              </Link>
              <Link to={"/"} className="nav_link" onClick={setActiveLink}>
                <img src={ieee} width={30} height={30} />
                <span className="nav_name">IEEE</span>
              </Link>
              <Link to={"/"} className="nav_link" onClick={setActiveLink}>
                <img src={iedc} width={30} height={30} />
                <span className="nav_name">IEDC</span>
              </Link>
              <Link to={"/"} className="nav_link" onClick={setActiveLink}>
                <img src={nss} width={30} height={25} />
                <span className="nav_name">NSS</span>
              </Link>
              <Link to={"/"} className="nav_link" onClick={setActiveLink}>
                <img src={arc} width={30} height={30} />
                <span className="nav_name">ARC</span>
              </Link>
            </div>
          </div>
          {loginuser ? (
            <a href="#" className="nav_link" onClick={handleSignOut}>
              <AiOutlineLogout />
              <span className="nav_name">SignOut</span>
            </a>
          ) : (
            <Link to={"/sign"} className="nav_link">
              <AiOutlineUser />
              <span className="nav_name">SignUp</span>
            </Link>
          )}
        </nav>
      </div>
      <div className="calendar-body">
        <Routes>
          <Route exact path="/" element={<CalendarInterface />} />
          <Route
            path="/sign"
            element={
              <SignUp
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                setLoginUser={setLoginUser}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default About
