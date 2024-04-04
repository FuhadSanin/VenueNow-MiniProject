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
import ProfilePage from "../ProfilePage/ProfilePage"
import slotService from "../../Services/service"
import { RiAdminLine } from "react-icons/ri"
import {
  arcProfile,
  ieeeProfile,
  iedcProfile,
  nssProfile,
} from "../../Constants/constants"
import Dropdown from "react-bootstrap/Dropdown"
import Admin from "../Admin/Admin"
import ForumAdmin from "../Admin/ForumAdmin"
import Welcome from "../Welcome/Welcome.jsx"
import { LuUser } from "react-icons/lu"
import { RiHome2Line } from "react-icons/ri"

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
  const [slots, setSlots] = useState([])
  const [pendingSlots, setPendingSlots] = useState([])
  const [approvedSlots, setApprovedSlots] = useState([])
  const [rejectedSlots, setRejectedSlots] = useState([])

  const [iedcEvents, setIedcEvents] = useState([])
  const [ieeeEvents, setIeeeEvents] = useState([])
  const [nssEvents, setnssEvents] = useState([])
  const [arcEvents, setarcEvents] = useState([])

  const notificationCount = 3

  useEffect(() => {
    retrieveSlots()
  }, [])

  const retrieveSlots = () => {
    slotService
      .getAllSlots()
      .then(response => {
        const slotsData = response.data.slots
        setSlots(slotsData)

        const pendingSlotsData = response.data.slots.filter(
          slot => slot.status === "pending"
        )
        setPendingSlots(pendingSlotsData)
        const rejectedSlotsData = response.data.slots.filter(
          slot => slot.status === "rejected"
        )
        setRejectedSlots(rejectedSlotsData)

        const approvedSlots = response.data.slots.filter(
          slot => slot.status === "approved"
        )
        const iedcEventsData = approvedSlots.filter(
          slot => slot.username === "iedc"
        )
        const ieeeEventsData = approvedSlots.filter(
          slot => slot.username === "ieee"
        )
        const nssEventsData = approvedSlots.filter(
          slot => slot.username === "nss"
        )
        const arcEventsData = approvedSlots.filter(
          slot => slot.username === "arc"
        )
        setIedcEvents(iedcEventsData)
        setIeeeEvents(ieeeEventsData)
        setnssEvents(nssEventsData)
        setarcEvents(arcEventsData)
      })
      .catch(error => {
        console.log(error)
      })
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

  const setActiveLink = index => {
    const links = document.querySelectorAll(".nav_link")
    links.forEach((link, i) => {
      if (i === index) {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
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

  console.log(loginuser)

  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => {
    console.log("success")
    setIsOpen(!isOpen)
  }

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
          <Dropdown
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                background: "transparent",
                color: "black",
                border: "none",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              {notificationCount > 0 && (
                <>
                  <LuUser style={{ marginLeft: "5px" }} />
                  <div
                    style={{
                      marginLeft: "5px",
                      backgroundColor: "red",
                      borderRadius: "50%",
                      width: "15px",
                      height: "15px",
                      color: "white",
                      fontSize: "10px",
                      position: "relative",
                      top: "-8px",
                      left: "-12px",
                    }}
                  >
                    {notificationCount}
                  </div>
                </>
              )}
              <span className="fw-bold" style={{ textTransform: "uppercase" }}>
                {loginuser}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {loginuser &&
                (loginuser === "admin" ? (
                  <Link to={"/admin"}>
                    <Dropdown.Item href="#/action-1">Dashboard</Dropdown.Item>
                  </Link>
                ) : (
                  <Link to={"/forum_admin"}>
                    <Dropdown.Item href="#/action-1">Dashboard</Dropdown.Item>
                  </Link>
                ))}

              <Dropdown.Item href="#/action-2" onClick={handleSignOut}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link
            to={"/sign"}
            style={{
              width: "70px",
              height: "30px",
              border: "1px solid gray",
              borderRadius: "8px",
              background: "transparent",
              color: "black",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Sign in
          </Link>
        )}
      </header>
      <div className={`l-navbar ${showNav ? "show" : ""}`} id="nav-bar">
        <nav className="nav">
          <div>
            <a href="#" className="nav_link">
              <PiCalendarCheckFill />
              <span className="nav_logo-name">Venue Now</span>
            </a>
            <div className="nav_list">
              <Link
                to={"/"}
                className="nav_link"
                onClick={() => setActiveLink(1)} // Pass index or identifier
              >
                <RiHome2Line />

                <span className="nav_name">Home</span>
              </Link>
              <Link
                to={"/calender"}
                className="nav_link"
                onClick={() => setActiveLink(2)} // Pass index or identifier
              >
                <SlCalender />
                <span className="nav_name">Calendar</span>
              </Link>
              <Link
                to={"/ieee"}
                className="nav_link"
                onClick={() => setActiveLink(3)} // Pass index or identifier
              >
                <img src={ieee} width={30} height={30} />
                <span className="nav_name">IEEE</span>
              </Link>
              <Link
                to={"/iedc"}
                className="nav_link"
                onClick={() => setActiveLink(4)} // Pass index or identifier
              >
                <img src={iedc} width={30} height={30} />
                <span className="nav_name">IEDC</span>
              </Link>
              <Link
                to={"/nss"}
                className="nav_link"
                onClick={() => setActiveLink(5)} // Pass index or identifier
              >
                <img src={nss} width={30} height={25} />
                <span className="nav_name">NSS</span>
              </Link>
              <Link
                to={"/arc"}
                className="nav_link"
                onClick={() => setActiveLink(6)} // Pass index or identifier
              >
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
          <Route path="/" element={<Welcome />} />
          <Route
            exact
            path="/calender"
            element={<CalendarInterface loginuser={loginuser} />}
          />
          <Route
            path="/ieee"
            element={<ProfilePage profile={ieeeProfile} events={ieeeEvents} />}
          />
          <Route
            path="/iedc"
            element={<ProfilePage profile={iedcProfile} events={iedcEvents} />}
          />
          <Route
            path="/nss"
            element={<ProfilePage profile={nssProfile} events={nssEvents} />}
          />
          <Route
            path="/arc"
            element={<ProfilePage profile={arcProfile} events={arcEvents} />}
          />
          <Route
            path="/admin"
            element={
              <Admin
                retrieveSlots={retrieveSlots}
                pendingSlots={pendingSlots}
              />
            }
          />
          <Route
            path="/forum_admin"
            element={
              <ForumAdmin
                retrieveSlots={retrieveSlots}
                slots={slots}
                loginuser={loginuser}
              />
            }
          />
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
