import React, { useEffect } from "react"
import { Button, Table } from "react-bootstrap"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import slotService from "../../Services/service.js"
import moment from "moment"

const Admin = ({ retrieveSlots, pendingSlots }) => {
  const [showModal, setShowModal] = React.useState(false)
  const [slot, setSlot] = React.useState({})
  useEffect(() => {
    retrieveSlots()
  }, [retrieveSlots])
  const handleRowClick = slot => {
    setShowModal(true)
    setSlot(slot)
  }
  const handleApprove = async id => {
    try {
      await slotService.updateSlotStatus(id, "approved")
      toast.success("Slot approved successfully")
    } catch (error) {
      console.log(error)
    }
  }
  const handleReject = async id => {
    try {
      await slotService.updateSlotStatus(id, "rejected")
      toast.success("Slot rejected successfully")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {pendingSlots.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Si No.</th>
              <th scope="col">Forum</th>
              <th scope="col">Title</th>
              <th scope="col">Approve</th>
              <th scope="col">Reject</th>
            </tr>
          </thead>
          <tbody>
            {pendingSlots.map((slot, index) => (
              <tr key={slot.id} onClick={() => handleRowClick(slot)}>
                <th scope="row">{index + 1}</th>
                <td>{slot.username}</td>
                <td>{slot.title}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleApprove(slot._id)}
                  >
                    Approve
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleReject(slot._id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No pending slots</div>
      )}
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
            zIndex: 1000, // Ensure it appears above other elements
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <img
                  src=""
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
                  {slot.username}
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
                      <td className="fw-bold">{slot.title}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Date:</td>
                      <td className="text-muted">
                        {moment(slot.start).format("D MMM, ddd")}
                      </td>
                    </tr>

                    <tr>
                      <td className="fw-bold capitalise">Venue:</td>
                      <td className="text-muted">{slot.venue}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Start Time:</td>
                      <td className="text-muted">
                        {moment(slot.start).format("HH:mm")}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">End Time:</td>
                      <td className="text-muted">
                        {moment(slot.end).format("HH:mm")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <Button
                  variant="success"
                  onClick={() => handleApprove(slot._id)}
                >
                  Approve
                </Button>
                <Button variant="danger" onClick={() => handleReject(slot._id)}>
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
