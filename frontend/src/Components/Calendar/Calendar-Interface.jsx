import React, { useState, useEffect } from "react"
import slotService from "../../Services/service.js"
import { useNavigate } from "react-router-dom"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "./index.css"
import { toast } from "react-toastify"
import "react-big-calendar/lib/css/react-big-calendar.css"
import cec from "../../Assets/cec.png"
import { ieee, iedc, nss, arc } from "../../Assets/index.js"
import {
  arcProfile,
  ieeeProfile,
  iedcProfile,
  nssProfile,
} from "../../Constants/constants"
const localizer = momentLocalizer(moment)

const CalendarInterface = ({ loginuser }) => {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [forumData, setForumData] = useState()
  const [selectedStartDate, setselectedStartDate] = useState(null)
  const [selectEvent, setSelectEvent] = useState(null)
  const [eventInfo, setEventInfo] = useState({
    eventTitle: "",
    venue: "",
    startTime: "",
    endTime: "",
  })

  useEffect(() => {
    retrieveSlots()
  }, [])

  const retrieveSlots = () => {
    slotService
      .getAllSlots()
      .then(response => {
        const eventsData = response.data.slots
          .filter(slot => slot.status === "approved")
          .map(slot => ({
            ...slot,
            start: moment(slot.start).toDate(),
            end: moment(slot.end).toDate(),
          }))
        setEvents(eventsData)
      })
      .catch(console.error)
  }
  const handleSelectSlot = slotInfo => {
    if (!loginuser) {
      toast.error("Only logged in users can add events.")
      navigate("/sign")
      return
    }
    const selectedDate = new Date(slotInfo.start)
    const today = new Date()
    if (selectedDate <= today) {
      toast.error("You cannot add events to past dates.")
      return
    }
    setShowModal(true)
    setselectedStartDate(slotInfo.start)
    setSelectEvent(null)
  }

  const handleSelectedEvent = event => {
    setShowModal(true)
    setSelectEvent(event)
    setEventInfo({
      eventTitle: event.title,
      venue: event.venue,
      startTime: moment(event.start).format("HH:mm"),
      endTime: moment(event.end).format("HH:mm"),
    })
  }
  const saveEvent = async () => {
    if (
      eventInfo.eventTitle &&
      selectedStartDate &&
      eventInfo.venue &&
      eventInfo.startTime &&
      eventInfo.endTime
    ) {
      console.log(eventInfo.startTime)
      const startDateTime = moment(selectedStartDate)
        .set({
          hour: parseInt(eventInfo.startTime.split(":")[0]),
          minute: parseInt(eventInfo.startTime.split(":")[1]),
        })
        .toDate()
      const endDateTime = moment(selectedStartDate)
        .set({
          hour: parseInt(eventInfo.endTime.split(":")[0]),
          minute: parseInt(eventInfo.endTime.split(":")[1]),
        })
        .toDate()

      // Check for clash
      const hasClash = events.some(event => {
        const eventStartTime = moment(event.start)
        const eventEndTime = moment(event.end)
        return (
          event.venue === eventInfo.venue &&
          ((eventStartTime.isBefore(startDateTime) &&
            eventEndTime.isAfter(startDateTime)) ||
            (eventStartTime.isBefore(endDateTime) &&
              eventEndTime.isAfter(endDateTime)) ||
            (eventStartTime.isSameOrAfter(startDateTime) &&
              eventEndTime.isSameOrBefore(endDateTime)))
        )
      })

      if (hasClash) {
        toast.error(
          "There is a clash with another event in the same hall at the same time."
        )
        return
      }

      if (selectEvent) {
        const updatedEvent = {
          ...selectEvent,
          title: eventInfo.eventTitle,
          venue: eventInfo.venue,
          start: startDateTime,
          end: endDateTime,
        }
        const updatedEvents = events.map(event =>
          event === selectEvent ? updatedEvent : event
        )
        setEvents(updatedEvents)
      } else {
        const newEvent = {
          username: loginuser,
          eventTitle: eventInfo.eventTitle,
          startDate: startDateTime,
          endDate: endDateTime,
          venue: eventInfo.venue,
        }
        if (
          newEvent.username &&
          newEvent.eventTitle &&
          newEvent.startDate &&
          newEvent.endDate &&
          newEvent.venue
        ) {
          const response = await slotService.createSlot(newEvent)
          toast.success(
            "Event Request have been succesfully send to Principal!"
          )
          retrieveSlots()
        } else {
          console.log("error")
        }
      }
      setShowModal(false)
      setEventInfo({
        eventTitle: "",
        venue: "",
        startTime: "",
        endTime: "",
      })
      navigate("/forum_admin")
    }
  }

  const deleteEvent = async () => {
    if (selectEvent) {
      const confirmation = window.confirm(
        "Are you sure you want to delete this event?"
      )
      if (confirmation) {
        try {
          await slotService.deleteSlot(selectEvent._id)
          setEvents(events.filter(event => event !== selectEvent))
          toast.success("Event has been deleted successfully!")
          setShowModal(false)
          setEventInfo({
            eventTitle: "",
            venue: "",
            startTime: "",
            endTime: "",
          })
        } catch (error) {
          console.log(error)
          toast.error("Error occurred while deleting the event.")
        }
      }
    }
  }
  const components = {
    month: {
      event: props => {
        const forum = props?.event?.username
        let eventIcon
        switch (forum) {
          case "ieee":
            eventIcon = ieee
            break
          case "nss":
            eventIcon = nss
            break
          case "iedc":
            eventIcon = iedc
            break
          default:
            eventIcon = cec
        }
        return (
          <div className="eventContainer">
            <div className={`eventType1 ${forum}`}></div>
            <div className={`eventType2 ${forum}`}>
              <img
                style={{ marginRight: "5px" }}
                src={eventIcon}
                alt=""
                width={20}
                height={20}
              />
              {props.title}
            </div>
          </div>
        )
      },
    },
  }
  return (
    <div style={{ height: "700px" }}>
      <Calendar
        localizer={localizer}
        components={components}
        views={["month", "day", "agenda"]}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectedEvent}
        max={moment("2023-03-18T19:00:00").toDate()}
        min={moment("2023-03-18T09:00:00").toDate()}
      />
      {showModal &&
        (loginuser ? (
          !selectEvent ? (
            <div
              className="modal"
              style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Event</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => {
                        setShowModal(false)
                        setEventInfo({
                          eventTitle: "",
                          venue: "",
                          startTime: "",
                          endTime: "",
                        })
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <label htmlFor="eventTitle" className="form-label">
                      Event Title:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eventTitle"
                      value={eventInfo.eventTitle}
                      required
                      onChange={e =>
                        setEventInfo({
                          ...eventInfo,
                          eventTitle: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="venue" className="form-label">
                      Venue:
                    </label>
                    <select
                      className="form-select"
                      id="venue"
                      value={eventInfo.venue}
                      onChange={e =>
                        setEventInfo({ ...eventInfo, venue: e.target.value })
                      }
                      required
                    >
                      <option value="">Select Venue</option>
                      <option value="open auditorium">Open Auditorium</option>
                      <option value="ac auditorium">AC Auditorium</option>
                      <option value="seminar hall">Seminar Hall</option>
                    </select>
                    <label htmlFor="startTime" className="form-label">
                      Start Time:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="startTime"
                      required
                      value={eventInfo.startTime}
                      onChange={e =>
                        setEventInfo({
                          ...eventInfo,
                          startTime: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="endTime" className="form-label">
                      End Time:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="endTime"
                      required
                      value={eventInfo.endTime}
                      onChange={e =>
                        setEventInfo({ ...eventInfo, endTime: e.target.value })
                      }
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={saveEvent}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : selectEvent && loginuser === selectEvent.username ? (
            <div
              className="modal"
              style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Event</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => {
                        setShowModal(false)
                        setEventInfo({
                          eventTitle: "",
                          venue: "",
                          startTime: "",
                          endTime: "",
                        })
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <label htmlFor="eventTitle" className="form-label">
                      Event Title:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eventTitle"
                      value={eventInfo.eventTitle}
                      required
                      onChange={e =>
                        setEventInfo({
                          ...eventInfo,
                          eventTitle: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="venue" className="form-label">
                      Venue:
                    </label>
                    <select
                      className="form-select"
                      id="venue"
                      value={eventInfo.venue}
                      onChange={e =>
                        setEventInfo({ ...eventInfo, venue: e.target.value })
                      }
                      required
                    >
                      <option value="">Select Venue</option>
                      <option value="open auditorium">Open Auditorium</option>
                      <option value="ac auditorium">AC Auditorium</option>
                      <option value="seminar hall">Seminar Hall</option>
                    </select>
                    <label htmlFor="startTime" className="form-label">
                      Start Time:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="startTime"
                      required
                      value={eventInfo.startTime}
                      onChange={e =>
                        setEventInfo({
                          ...eventInfo,
                          startTime: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="endTime" className="form-label">
                      End Time:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="endTime"
                      required
                      value={eventInfo.endTime}
                      onChange={e =>
                        setEventInfo({
                          ...eventInfo,
                          endTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="modal-footer">
                    {selectEvent && (
                      <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={deleteEvent}
                      >
                        Delete Event
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={saveEvent}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="modal"
              style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000, // Ensure it appears above other elements
              }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <img
                      src={selectEvent.username}
                      alt="Logo"
                      style={{
                        width: "100px",
                        height: "auto", // Maintain aspect ratio
                        marginRight: "10px", // Add spacing between logo and heading
                      }}
                    />
                    <h5
                      className="modal-title"
                      style={{
                        margin: 0, // Remove default margin
                        fontSize: "24px", // Adjust font size as needed
                        textTransform: "uppercase ",
                      }}
                    >
                      {selectEvent.username}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td className="fw-bold">Event Title:</td>
                          <td className="fw-bold">{selectEvent.title}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Date:</td>
                          <td className="text-muted">
                            {moment(selectEvent.start).format("D MMM, ddd")}
                          </td>
                        </tr>

                        <tr>
                          <td className="fw-bold capitalise">Venue:</td>
                          <td className="text-muted">{selectEvent.venue}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Start Time:</td>
                          <td className="text-muted">
                            {moment(selectEvent.start).format("HH:mm")}
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-bold">End Time:</td>
                          <td className="text-muted">
                            {moment(selectEvent.end).format("HH:mm")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-success">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div
            className="modal"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1000, // Ensure it appears above other elements
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <img
                    src={arc}
                    alt="Logo"
                    style={{
                      width: "100px", // Adjust the width as needed
                      height: "auto", // Maintain aspect ratio
                      marginRight: "10px", // Add spacing between logo and heading
                    }}
                  />
                  <h5
                    className="modal-title"
                    style={{
                      margin: 0, // Remove default margin
                      fontSize: "24px", // Adjust font size as needed
                      textTransform: "uppercase ",
                    }}
                  >
                    {selectEvent.username}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Event Title:</td>
                        <td className="fw-bold">{selectEvent.title}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Date:</td>
                        <td className="text-muted">
                          {moment(selectEvent.start).format("D MMM, ddd")}
                        </td>
                      </tr>

                      <tr>
                        <td className="fw-bold capitalise">Venue:</td>
                        <td className="text-muted">{selectEvent.venue}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Start Time:</td>
                        <td className="text-muted">
                          {moment(selectEvent.start).format("HH:mm")}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">End Time:</td>
                        <td className="text-muted">
                          {moment(selectEvent.end).format("HH:mm")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-success">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default CalendarInterface
