import React, { useState, useEffect } from "react"
import slotService from "../../Services/service.js"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "./index.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import cec from "../../Assets/cec.png"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const localizer = momentLocalizer(moment)

const CalendarInterface = () => {
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectEvent, setSelectEvent] = useState(null)
  const [eventInfo, setEventInfo] = useState({
    eventTitle: "",
    venue: "",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    retrieveSlots()
  }, [])

  const retrieveSlots = () => {
    slotService
      .getAllSlots()
      .then(response => {
        const modifiedSlots = response.data.slots.map(slot => ({
          ...slot,
          start: moment(slot.start).toDate(),
          end: moment(slot.end).toDate(),
        }))
        setEvents(modifiedSlots)
        console.log(modifiedSlots)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSelectSlot = slotInfo => {
    setShowModal(true)
    setSelectedDate(slotInfo.start)
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
      selectedDate &&
      eventInfo.venue &&
      eventInfo.startTime &&
      eventInfo.endTime
    ) {
      const startDateTime = moment(selectedDate)
        .set({
          hour: parseInt(eventInfo.startTime.split(":")[0]),
          minute: parseInt(eventInfo.startTime.split(":")[1]),
        })
        .toDate()
      const endDateTime = moment(selectedDate)
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
          eventTitle: eventInfo.eventTitle,
          startDate: startDateTime,
          endDate: endDateTime,
          venue: eventInfo.venue,
        }
        console.log(newEvent)
        if (
          newEvent.eventTitle &&
          newEvent.startDate &&
          newEvent.endDate &&
          newEvent.venue
        ) {
          const response = await slotService.createSlot(newEvent)
          toast.success("Event has been Added successfully!")
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
      console.log(events)
    }
  }

  const deleteEvents = () => {
    if (selectEvent) {
      const confirmation = window.confirm(
        "Are you sure you want to delete this event?"
      )
      if (confirmation) {
        slotService
          .deleteSlot(selectEvent._id)
          .then(response => {
            setEvents(response.data.slots)
            setShowModal(false)
            setEventInfo({
              eventTitle: "",
              venue: "",
              startTime: "",
              endTime: "",
            })
            toast.success("Event has been deleted successfully!")
          })
          .catch(error => {
            console.log(error)
            toast.error("Error occurred while deleting the event.")
          })
      }
    }
  }
  const components = {
    event: props => {
      return (
        <div
          style={{
            background: "#AAA0D9",
            color: "black",
            height: "100%",
            width: "100%",
            display: "flex",
          }}
        >
          <img src={cec} alt={props.event.title} width={30} height={30} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ margin: "0" }}>
              {moment(props.event.start).format("HH:mm")} -{" "}
              {moment(props.event.end).format("HH:mm")}
            </p>
            <h6 style={{ margin: "0" }}>
              {props.event.title} - {props.event.eventTitle}
            </h6>
            <p style={{ margin: "0" }}>{props.event.venue}</p>
          </div>
        </div>
      )
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

      {showModal && (
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
                <h5 className="modal-title">
                  {selectEvent ? "Edit Event" : "Add Event"}
                </h5>
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
                  onChange={e =>
                    setEventInfo({ ...eventInfo, eventTitle: e.target.value })
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
                  value={eventInfo.startTime}
                  onChange={e =>
                    setEventInfo({ ...eventInfo, startTime: e.target.value })
                  }
                />
                <label htmlFor="endTime" className="form-label">
                  End Time:
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="endTime"
                  value={eventInfo.endTime}
                  onChange={e =>
                    setEventInfo({ ...eventInfo, endTime: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                {selectEvent && (
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={deleteEvents}
                  >
                    Delete Events
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
      )}
    </div>
  )
}

export default CalendarInterface
