import React, { useState, useEffect } from "react";
import "./About.css";
import { Link, useNavigate, Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { IoReorderThreeOutline } from "react-icons/io5";
import { BiNotepad } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { PiCalendarCheckFill } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import CalendarInterface from "../Calendar/Calendar-Interface";
import SignUp from "../SignUp/SignUp";
import { ieee, iedc, nss, arc, logo } from "../../Assets";
import ProfilePage from "../ProfilePage/ProfilePage";
import slotService from "../../Services/service";
import {
  arcProfile,
  ieeeProfile,
  iedcProfile,
  nssProfile,
} from "../../Constants/constants";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import DropdownButton from "react-bootstrap/DropdownButton";

const LOCAL_STORAGE_KEY = "loginuser";

function About() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [authenticated, setAuthenticated] = useState(false);
  const [loginuser, setLoginUser] = useState(null);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [iedcEvents, setIedcEvents] = useState([]);
  const [ieeeEvents, setIeeeEvents] = useState([]);
  const [nssEvents, setnssEvents] = useState([]);
  const [arcEvents, setarcEvents] = useState([]);

  useEffect(() => {
    retrieveSlots();
  }, []);

  const retrieveSlots = () => {
    slotService
      .getAllSlots()
      .then((response) => {
        const slots = response.data.slots;
        console.log(slots);

        const iedcEventsData = slots.filter((slot) => slot.username === "iedc");
        const ieeeEventsData = slots.filter((slot) => slot.username === "ieee");
        const nssEventsData = slots.filter((slot) => slot.username === "nss");
        const arcEventsData = slots.filter((slot) => slot.username === "arc");

        setIedcEvents(iedcEventsData);
        setIeeeEvents(ieeeEventsData);
        setnssEvents(nssEventsData);
        setarcEvents(arcEventsData);
        console.log(ieeeEventsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const toggleNavbar = () => {
    setShowNav(!showNav);
    const bodypd = document.getElementById("body-pd");
    const headerpd = document.getElementById("header");
    if (bodypd && headerpd) {
      bodypd.classList.toggle("body-pd");
      headerpd.classList.toggle("body-pd");
    }
  };

  const setActiveLink = (index) => {
    const links = document.querySelectorAll(".nav_link");
    links.forEach((link, i) => {
      if (i === index) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  useEffect(() => {
    const storedLoginUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedLoginUser) {
      setLoginUser(JSON.parse(storedLoginUser));
    } else {
      setLoginUser(null);
    }
  }, [loginuser]);

  useEffect(() => {
    if (loginuser !== null) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loginuser));
    }
  }, [loginuser]);

  console.log(loginuser);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    console.log("success");
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    const shouldSignOut = window.confirm("Are you sure you want to sign out?");
    if (shouldSignOut) {
      toast.success("You have been signed out successfully!");
      setLoginUser(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      navigate("/sign");
    } else {
      toast.info("Sign out canceled.");
    }
  };

  return (
    <div id="body-pd">
      <header className="header" id="header">
        <div className="header_toggle" onClick={toggleNavbar}>
          <IoReorderThreeOutline />
        </div>
        {loginuser ? (
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                background: "transparent",
                color: "black",
                border: "none",
              }}
            >
              {loginuser}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">dashboard</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={handleSignOut}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <div>Sign in</div>
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
              <Link to={"/sign"} className="nav_link">
                <IoMdAdd />
                <span className="nav_logo-name">Add an Event</span>
              </Link>

              <Link
                to={"/"}
                className="nav_link"
                onClick={() => setActiveLink(3)} // Pass index or identifier
              >
                <SlCalender />
                <span className="nav_name">Calendar</span>
              </Link>
              <Link
                to={"/ieee"}
                className="nav_link"
                onClick={() => setActiveLink(4)} // Pass index or identifier
              >
                <img src={ieee} width={30} height={30} />
                <span className="nav_name">IEEE</span>
              </Link>
              <Link
                to={"/iedc"}
                className="nav_link"
                onClick={() => setActiveLink(5)} // Pass index or identifier
              >
                <img src={iedc} width={30} height={30} />
                <span className="nav_name">IEDC</span>
              </Link>
              <Link
                to={"/nss"}
                className="nav_link"
                onClick={() => setActiveLink(6)} // Pass index or identifier
              >
                <img src={nss} width={30} height={25} />
                <span className="nav_name">NSS</span>
              </Link>
              <Link
                to={"/arc"}
                className="nav_link"
                onClick={() => setActiveLink(7)} // Pass index or identifier
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
          <Route
            exact
            path="/"
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
  );
}

export default About;
