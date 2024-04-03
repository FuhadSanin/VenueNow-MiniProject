import React, { useEffect } from "react"
import { Button, Table } from "react-bootstrap"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import slotService from "../../Services/service.js"

const Admin = ({ retrieveSlots, pendingSlots }) => {
  useEffect(() => {
    retrieveSlots()
  }, [retrieveSlots])
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
              <tr key={slot.id}>
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
    </div>
  )
}

export default Admin
